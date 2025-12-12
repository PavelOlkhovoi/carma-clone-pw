/**
 * Shared Vite configuration for handling submodule imports
 * This configuration externalizes packages that exist in submodules but not in the main workspace
 */

export const submoduleExternals = [
  "@carma/math",
  "@carma-mapping/carma-map-api",
];

export const submoduleRollupOptions = {
  external: submoduleExternals,
  onwarn(warning: any, warn: any) {
    // Suppress warnings from submodule files
    if (
      warning.id?.includes("wuppertal-collab-submodule") ||
      warning.id?.includes("pecher-collab-submodule")
    ) {
      return;
    }
    warn(warning);
  },
};
