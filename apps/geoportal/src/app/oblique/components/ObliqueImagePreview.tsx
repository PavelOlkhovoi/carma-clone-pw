import {
  useEffect,
  useState,
  useRef,
  type RefObject,
  type FC,
  type CSSProperties,
} from "react";
import { type Viewer, PerspectiveFrustum } from "cesium";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLink,
  faFileArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip, Radio, type RadioChangeEvent } from "antd";

import { useCesiumContext } from "@carma-mapping/engines/cesium";
import { ControlButtonStyler } from "@carma-mapping/map-controls-layout";
import { PREVIEW_IMAGE_BASE_SCALE_FACTOR } from "../config";
import type { ObliqueImagePreviewStyle } from "../types";
import {
  type BlendMode,
  PreviewImage,
} from "./ObliqueImagePreview.PreviewImage";
import { Backdrop } from "./ObliqueImagePreview.Backdrop";
import { ContactMailButton } from "@carma-appframeworks/portals";
import { ObliqueDirectionControlsCompact } from "./ObliqueDirectionControls.Compact";
import type { CardinalDirectionEnum } from "../utils/orientationUtils";

interface ObliqueImagePreviewProps {
  src: string;
  srcHQ?: string; // high quality image
  srcOriginal?: string; // original image, likely not available
  imageId: string;
  isVisible: boolean;
  isDebugMode?: boolean;
  onOpenImageLink?: () => void;
  onDirectDownload?: () => void;
  onClose?: () => void;
  // When true, only the image element should fade out (overlay stays visible)
  dimImage?: boolean;
  // Called when current active image source has finished loading
  onImageLoaded?: () => void;
  // Incremented by parent when fly-to animation completes; gates showing next image
  flyCompletionTick?: number;
  // Called once next image has been swapped into current buffer
  onSwapComplete?: () => void;
  interiorOrientationOffsets?: {
    xOffset: number;
    yOffset: number;
  };
  style?: ObliqueImagePreviewStyle;
  // Base brightness for backdrop filter to brighten the 3D mesh
  brightnessBase?: number;
  // Base contrast for backdrop filter after movement settles
  contrastBase?: number;
  // Base saturation for backdrop filter
  saturationBase?: number;
  // Show compact direction controls between download and report
  showCompactDirectionControls?: boolean;
  // Direction controls inputs (optional)
  rotateCamera?: (clockwise: boolean) => void;
  rotateToDirection?: (d: CardinalDirectionEnum) => void;
  activeDirection?: CardinalDirectionEnum;
  siblingCallbacks?: Partial<Record<CardinalDirectionEnum, () => void>>;
  isDirectionLoading?: boolean;
  // When true, allow preloading the next buffer image
  preloadNextEnabled?: boolean;
}

type ImageQuality = "REGULAR" | "HQ" | "BEST";

// Note: backdrop dimming hole logic removed per latest requirement.

const getViewerSyncedSize = (viewerRef: RefObject<Viewer>) => {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1024;
  const vh = typeof window !== "undefined" ? window.innerHeight : 768;
  const viewer = viewerRef.current;
  const rawDim = viewer
    ? Math.max(viewer.canvas.width, viewer.canvas.height)
    : 0;
  const dim = rawDim > 0 ? rawDim : Math.max(vw, vh, 1);
  const frustum = viewer?.scene?.camera?.frustum;

  if (frustum instanceof PerspectiveFrustum) {
    const fovFactor = Math.tan(frustum.fov / 2);
    return Math.max(1, dim / fovFactor);
  }
  console.warn("Unsupported frustum type");

  return Math.max(1, dim);
};

const defaultStyle: ObliqueImagePreviewStyle = {
  backdropColor: "rgba(0, 0, 0, 0.13)",
  border: "2px solid rgba(255, 255, 255, 0.9)",
  boxShadow: "0 0 50px rgba(255, 255, 255, 0.8)",
};

const ControlsContainerStyle: CSSProperties = {
  position: "absolute",
  bottom: "50px",
  width: "100%",
  maxWidth: "800px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "10px",
  zIndex: 1300,
  pointerEvents: "auto",
};

export const ObliqueImagePreview: FC<ObliqueImagePreviewProps> = ({
  src,
  srcHQ,
  srcOriginal,
  imageId,
  isVisible,
  isDebugMode = false,
  onOpenImageLink,
  onDirectDownload,
  onClose,
  dimImage = false,
  onImageLoaded,
  flyCompletionTick,
  onSwapComplete,
  style,
  interiorOrientationOffsets = { xOffset: 0, yOffset: 0 },
  brightnessBase = 100,
  contrastBase = 85,
  saturationBase = 100,
  showCompactDirectionControls = true,
  rotateCamera,
  rotateToDirection,
  activeDirection,
  siblingCallbacks,
  isDirectionLoading = false,
  preloadNextEnabled = false,
}) => {
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const [isVertical, setIsVertical] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const [blendMode, setBlendMode] = useState<BlendMode>("normal");
  const [currentQuality, setCurrentQuality] = useState<ImageQuality>("REGULAR");
  const [activeSource, setActiveSource] = useState(src);
  // Double buffer sources
  const [currentSrc, setCurrentSrc] = useState<string | null>(src);
  const [nextSrc, setNextSrc] = useState<string | null>(null);
  const [nextLoaded, setNextLoaded] = useState(false);
  const [canShowNext, setCanShowNext] = useState(false);
  const [showNext, setShowNext] = useState(false);
  // Merge style with defaults
  const mergedStyle = { ...defaultStyle, ...(style ?? {}) };
  const { backdropColor, border, boxShadow } = mergedStyle;

  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const { viewerRef } = useCesiumContext();

  const { xOffset, yOffset } = interiorOrientationOffsets;

  // Quality can be controlled via debug UI; default is REGULAR

  // Update activeSource when quality or src/srcHQ changes
  useEffect(() => {
    if (currentQuality === "HQ" && srcHQ) {
      setActiveSource(srcHQ);
    } else if (currentQuality === "BEST" && srcOriginal) {
      setActiveSource(srcOriginal);
    } else {
      setActiveSource(src);
    }
  }, [src, srcHQ, srcOriginal, currentQuality]);

  // On opening preview, reset buffers and gating state to avoid stale/null image
  const prevVisibleRef = useRef(false);
  useEffect(() => {
    if (isVisible && !prevVisibleRef.current) {
      if (activeSource) {
        setCurrentSrc(activeSource);
      }
      setNextSrc(null);
      setNextLoaded(false);
      setShowNext(false);
      setCanShowNext(false);
    }
    prevVisibleRef.current = isVisible;
  }, [isVisible, activeSource]);

  // If preview is shown again and image buffer was cleared, initialize from active source
  useEffect(() => {
    if (isVisible && !currentSrc && activeSource) {
      setCurrentSrc(activeSource);
    }
  }, [isVisible, currentSrc, activeSource]);

  // Backdrop filter dynamics: while moving, use base values; on static, fade down to 50
  useEffect(() => {
    if (dimImage) {
      setContrast(contrastBase);
      setSaturation(saturationBase);
      return;
    }
    const t = window.setTimeout(() => {
      setContrast(50);
      setSaturation(50);
    }, 800);
    return () => window.clearTimeout(t);
  }, [dimImage, contrastBase, saturationBase]);

  // Prepare next buffer when activeSource changes
  useEffect(() => {
    if (!activeSource) return;
    if (!currentSrc) {
      if (dimImage) {
        setNextSrc(activeSource);
        setNextLoaded(false);
      } else {
        setCurrentSrc(activeSource);
      }
      return;
    }
    if (activeSource === currentSrc) return;
    setNextSrc(activeSource);
    setNextLoaded(false);
  }, [activeSource, currentSrc, dimImage]);

  // Preload next source
  useEffect(() => {
    if (!nextSrc || !preloadNextEnabled) return;
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      setNextLoaded(true);
      if (onImageLoaded) onImageLoaded();
    };
    img.src = nextSrc;
  }, [nextSrc, onImageLoaded, preloadNextEnabled]);

  // Gate swap: show next when (a) fly completed or not dimming, and (b) next is loaded
  useEffect(() => {
    if (nextLoaded && (canShowNext || !dimImage)) {
      setShowNext(true);
    }
  }, [nextLoaded, canShowNext, dimImage]);

  // Fly completion allows showing next
  useEffect(() => {
    if (flyCompletionTick == null) return;
    setCanShowNext(true);
  }, [flyCompletionTick]);

  // Finalize swap after fade begins
  useEffect(() => {
    if (!showNext || !nextSrc) return;
    const t = setTimeout(() => {
      setCurrentSrc(nextSrc);
      setNextSrc(null);
      setNextLoaded(false);
      setShowNext(false);
      setCanShowNext(false);
      if (onSwapComplete) onSwapComplete();
    }, 16); // finalize quickly after mounting next
    return () => clearTimeout(t);
  }, [showNext, nextSrc, onSwapComplete]);

  // When a move starts (dimImage true), ensure we reset swap gating state
  useEffect(() => {
    if (!dimImage) return;
    setShowNext(false);
    setCanShowNext(false);
    // old image fades out instantly; drop it from DOM by clearing src
    setCurrentSrc(null);
  }, [dimImage]);

  // compensate for interior orientation sensor offsets
  const translateX = -50 + xOffset * 0.5 * 100;
  const translateY = -50 + yOffset * 0.5 * 100;

  const transform = `translate(${translateX}%, ${translateY}%)`;

  // Only load image for aspect ratio when visible
  useEffect(() => {
    if (isVisible && currentSrc) {
      const img = new window.Image();
      img.decoding = "async";
      img.onload = () => {
        setIsVertical(img.naturalWidth < img.naturalHeight);
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
      };
      img.src = currentSrc;
    }
  }, [isVisible, currentSrc]);

  useEffect(() => {
    if (isVisible) {
      setShouldFadeIn(false);
      const timer = setTimeout(() => setShouldFadeIn(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShouldFadeIn(false);
    }
  }, [isVisible]);

  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  const handleBlendModeChange = (e: RadioChangeEvent) => {
    setBlendMode(e.target.value as BlendMode);
  };

  const handleQualityChange = (e: RadioChangeEvent) => {
    setCurrentQuality(e.target.value as ImageQuality);
  };

  if (!isVisible) return null;

  const f = PREVIEW_IMAGE_BASE_SCALE_FACTOR;
  // seems to need no adjustment per dimension

  const widthScaleFactor = f * (isVertical ? imageAspectRatio : 1);
  const heightScaleFactor = f * (isVertical ? 1 : 1 / imageAspectRatio);

  const syncedWidth = getViewerSyncedSize(viewerRef) * widthScaleFactor;
  const syncedHeight = getViewerSyncedSize(viewerRef) * heightScaleFactor;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Backdrop
        color={backdropColor}
        contrast={contrast}
        brightness={brightnessBase}
        saturation={saturation}
        isDebug={isDebugMode}
        interactive={isVisible}
        onClick={handleBackdropClick}
      />
      <div
        className="absolute top-0 left-0 w-full h-svh"
        style={{ zIndex: 1500, pointerEvents: "none" }}
      >
        <div style={ControlsContainerStyle}>
          <Tooltip title="Bild in neuem Tab öffnen" placement="top">
            <div>
              <ControlButtonStyler onClick={onOpenImageLink} width="auto">
                <span className="flex-1 text-base px-4">
                  <FontAwesomeIcon icon={faExternalLink} className="mr-2" />
                  Bild öffnen
                </span>
              </ControlButtonStyler>
            </div>
          </Tooltip>
          <Tooltip title="Bild direkt herunterladen" placement="top">
            <div>
              <ControlButtonStyler onClick={onDirectDownload} width="auto">
                <span className="flex-1 text-base px-4">
                  <FontAwesomeIcon icon={faFileArrowDown} className="mr-2" />
                  Herunterladen
                </span>
              </ControlButtonStyler>
            </div>
          </Tooltip>
          {showCompactDirectionControls && rotateCamera && (
            <ObliqueDirectionControlsCompact
              rotateCamera={rotateCamera}
              rotateToDirection={rotateToDirection || (() => {})}
              activeDirection={activeDirection}
              isLoading={isDirectionLoading}
              siblingCallbacks={siblingCallbacks}
            />
          )}
          <ContactMailButton
            width="160px"
            emailAddress="geodatenzentrum@stadt.wuppertal.de"
            subjectPrefix="Datenschutzprüfung Luftbildschrägaufnahme"
            productName="Luftbildschrägaufnahmen"
            portalName="Wuppertaler Geodatenportal"
            imageId={imageId}
            imageUri={src}
            tooltip={{
              title: "Datenschutzprüfung Luftbildschrägaufnahme",
              placement: "top",
            }}
          />
          <Tooltip title="Vorschau schließen" placement="top">
            <div>
              <ControlButtonStyler onClick={handleBackdropClick} width="auto">
                <span className="flex-1 text-base px-4">
                  Vorschau Schließen
                </span>
              </ControlButtonStyler>
            </div>
          </Tooltip>
          {/* Force a new row for the radio groups */}
          {isDebugMode && (
            <>
              <div style={{ flexBasis: "100%", height: 0 }} />
              <Radio.Group
                value={currentQuality}
                onChange={handleQualityChange}
                optionType="button"
                buttonStyle="solid"
                size="small"
                style={{ marginLeft: "10px" }}
              >
                <Radio.Button value="REGULAR">Standard (L3)</Radio.Button>
                <Radio.Button value="HQ">HQ (L2)</Radio.Button>
                <Radio.Button value="BEST">(L1 N/A)</Radio.Button>
              </Radio.Group>
              <Radio.Group
                value={blendMode}
                onChange={handleBlendModeChange}
                optionType="button"
                buttonStyle="solid"
                size="small"
                style={{ marginLeft: "10px" }}
              >
                <Radio.Button value="normal">Normal</Radio.Button>
                <Radio.Button value="difference">Difference</Radio.Button>
                <Radio.Button value="normal50">50% Opacity</Radio.Button>
              </Radio.Group>
            </>
          )}
        </div>
      </div>
      {currentSrc && !dimImage && !showNext && (
        <PreviewImage
          src={currentSrc}
          alt={imageId ?? "Oblique Image Preview"}
          width={syncedWidth}
          height={syncedHeight}
          borderStyle={border}
          boxShadowStyle={boxShadow}
          fadeIn={shouldFadeIn}
          blendMode={blendMode}
          isDebug={isDebugMode}
          transform={transform}
        />
      )}
      {nextSrc && (
        <PreviewImage
          src={nextSrc}
          alt={imageId ?? "Oblique Image Preview (next)"}
          width={syncedWidth}
          height={syncedHeight}
          borderStyle={border}
          boxShadowStyle={boxShadow}
          fadeIn={shouldFadeIn && showNext}
          blendMode={blendMode}
          isDebug={isDebugMode}
          transform={transform}
        />
      )}
    </div>
  );
};

export default ObliqueImagePreview;
