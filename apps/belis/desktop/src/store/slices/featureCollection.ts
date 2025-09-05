import { featuresFilter } from "@carma-appframeworks/belis";
import { createSlice } from "@reduxjs/toolkit";

export const MODES = {
  OBJECTS: "OBJECTS",
  TASKLISTS: "TASKLISTS",
  PROTOCOLS: "PROTOCOLS",
};

const featureCollectionSlice = createSlice({
  name: "featureCollection",
  initialState: {
    features: [] as any,
    selectedFeature: null as any,
    mode: MODES.OBJECTS,
    filter: featuresFilter,
    done: true,
    inFocusMode: false,
  },
  reducers: {
    setFeatureCollection: (state, action) => {
      state.features = action.payload;
    },
    setSelectedFeature: (state, action) => {
      const pickedId = action.payload.id;
      state.features = state.features.map((f) => ({
        ...f,
        selected: f.id === pickedId,
      }));
      state.selectedFeature = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setDone: (state, action) => {
      state.done = action.payload;
    },
    setFocusModeActive: (state, action) => {
      state.inFocusMode = action.payload;
    },
  },
});

export default featureCollectionSlice;

export const {
  setFeatureCollection,
  setSelectedFeature,
  setFilter,
  setDone,
  setFocusModeActive,
} = featureCollectionSlice.actions;

export const getFeatureCollection = (state) => {
  return state.featureCollection.features;
};

export const getSelectedFeature = (state) => {
  return state.featureCollection.selectedFeature;
};

export const getFilter = (state) => state.featureCollection.filter;
export const getDone = (state) => state.featureCollection.done;
export const isInFocusMode = (state) => state.featureCollection.inFocusMode;
