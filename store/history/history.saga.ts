import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, HistoryInformation } from "../store";
import { GET_HISTORY_BY_SECTION } from "./history.constants";
import { setHistory } from "./history.actions";
import axios from "../../axios";

function* getHistoryBySection(
  action: ActionWithPayload<{ sectionId: number }>
) {
  const history: HistoryInformation[] = yield axios
    .get(`/history/${action.payload.sectionId}`)
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  const bestScore: HistoryInformation = yield axios
    .get(`/history/${action.payload.sectionId}/best`)
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  yield put(setHistory(history, bestScore));
}

export default function* historySaga() {
  yield takeEvery(GET_HISTORY_BY_SECTION, getHistoryBySection);
}
