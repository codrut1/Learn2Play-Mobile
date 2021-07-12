import { createSelector } from "reselect";
import { Store } from "../store";

export const challengesInformationSelector = (state: Store) => state.challenges;

export const challengeRequestsSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.challengeRequests
);

export const challengesSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.challenges
);

export const currentChallengeSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.currentChallenge
);

export const loadingSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.loading
);

export const uploadingRecordingSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.uploadingRecording
);

export const latestScoreSelector = createSelector(
  challengesInformationSelector,
  (challengesInfo) => challengesInfo.latestScore
);
