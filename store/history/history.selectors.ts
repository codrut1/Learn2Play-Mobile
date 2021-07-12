import { createSelector } from "reselect";
import { Store } from "../store";

export const historyInformationSelector = (state: Store) => state.history;

export const historySelector = createSelector(
  historyInformationSelector,
  (historyInfo) => historyInfo.history
);

export const historyLoadingSelector = createSelector(
  historyInformationSelector,
  (historyInfo) => historyInfo.loading
);

export const bestScoreSelector = createSelector(
  historyInformationSelector,
  (historyInfo) => historyInfo.bestScore
);
