import { takeEvery, put } from "redux-saga/effects";
import {
  ActionWithPayload,
  SectionInformation,
  HistoryInformation,
} from "../store";
import {
  POST_SECTION,
  GET_SECTIONS_BY_SONG,
  DELETE_SECTION,
  UPLOAD_SECTION,
} from "./sections.constants";
import {
  addNewSection,
  setSections,
  finishUploading,
} from "./sections.actions";
import axios from "../../axios";

function* getSectionsBySong(action: ActionWithPayload<{ songId: number }>) {
  const sections: SectionInformation[] = yield axios
    .get(`/songs/sections/${action.payload.songId}`)
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  yield put(setSections(sections));
}

function* postNewSection(
  action: ActionWithPayload<{
    title: string;
    audioFile: any;
    difficulty: string;
    songId: number;
  }>
) {
  let data = new FormData();
  data.append("audioFile", action.payload.audioFile);
  data.append("title", action.payload.title);
  data.append("difficulty", action.payload.difficulty);
  data.append("song", action.payload.songId);

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  const res: SectionInformation = yield axios
    .post("/songs/sections/upload", data, {
      headers: headers,
    })
    .then((res) => res.data)
    .catch((e) => console.warn(e.message));

  yield put(addNewSection(res));
}

function* deleteSection(action: ActionWithPayload<{ id: number }>) {
  axios
    .delete(`/songs/sections/delete/${action.payload.id}`)
    .catch((e) => console.warn(e));
}

function* uploadRecording(
  action: ActionWithPayload<{ id: number; recording: any }>
) {
  let data = new FormData();
  const recording = {
    uri: `file://${action.payload.recording}`,
    type: "audio/x-wav",
    name: `${action.payload.id}`,
  };

  const headers = {
    "Content-Type": "multipart/form-data",
  };

  data.append("audioFile", recording);
  data.append("id", action.payload.id);

  const latestTry: HistoryInformation = yield axios
    .post("/songs/sections/recording", data, {
      headers: headers,
    })
    .then((latestTry) => latestTry.data)
    .catch((e) => console.warn(e));

  const bestTry: HistoryInformation = yield axios
    .get(`/history/${action.payload.id}/best`)
    .then((bestTry) => bestTry.data)
    .catch((e) => console.warn(e));

  const percentDifference = (
    100 -
    (latestTry.score * 100) / bestTry.score
  ).toFixed(2);
  yield put(finishUploading(latestTry, percentDifference));
}

export default function* sectionsSaga() {
  yield takeEvery(POST_SECTION, postNewSection);
  yield takeEvery(GET_SECTIONS_BY_SONG, getSectionsBySong);
  yield takeEvery(DELETE_SECTION, deleteSection);
  yield takeEvery(UPLOAD_SECTION, uploadRecording);
}
