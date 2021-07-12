import { createSelector } from "reselect";
import { Store } from "../store";

export const userInformationSelector = (state: Store) => state.user;

export const idSelector = createSelector(
  userInformationSelector,
  (user) => user.id
);

export const emailSelector = createSelector(
  userInformationSelector,
  (user) => user.email
);

export const profilePicSelector = createSelector(
  userInformationSelector,
  (user) => user.profilePic
);

export const usernameSelector = createSelector(
  userInformationSelector,
  (user) => user.username
);

export const tokenSelector = createSelector(
  userInformationSelector,
  (user) => user.token
);

export const errorSelector = createSelector(
  userInformationSelector,
  (user) => user.error
);

export const isLoadingSelector = createSelector(
  userInformationSelector,
  (user) => user.loading
);
