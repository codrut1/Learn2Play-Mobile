import { createSelector } from "reselect";
import { Store } from "../store";

export const sectionsInformationSelector = (state: Store) => state.sections;

export const sectionsSelector = createSelector(
  sectionsInformationSelector,
  (sectionsInfo) => sectionsInfo.sections
);

export const sectionsLoadingSelector = createSelector(
  sectionsInformationSelector,
  (sectionsInfo) => sectionsInfo.loading
);

export const recordingUploadingSelector = createSelector(
  sectionsInformationSelector,
  (sectionsInfo) => sectionsInfo.uploadingRecording
);

export const latestTrySelector = createSelector(
  sectionsInformationSelector,
  (sectionsInfo) => sectionsInfo.latestTry
);

export const latestTryPercentDiffSelector = createSelector(
  sectionsInformationSelector,
  (sectionsInfo) => sectionsInfo.latestTryPercentDifference
);
