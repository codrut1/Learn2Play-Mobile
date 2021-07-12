import { all } from "redux-saga/effects";
import userSaga from "./user/user.saga";
import songsSaga from "./songs/songs.saga";
import sectionsSaga from "./sections/sections.saga";
import historySaga from "./history/history.saga";
import challengesSaga from "./challenges/challenges.saga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    songsSaga(),
    sectionsSaga(),
    historySaga(),
    challengesSaga(),
  ]);
}
