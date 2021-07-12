import { createSelector } from "reselect";
import { Store } from "../store";

export const songsInformationSelector = (state: Store) => state.songs;

export const songsSelector = createSelector(
  songsInformationSelector,
  (songsInfo) => songsInfo.songs
);

export const songsLoadingSelector = createSelector(
  songsInformationSelector,
  (songsInfo) => songsInfo.loading
);
