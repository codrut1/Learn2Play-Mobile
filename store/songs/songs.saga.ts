import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, SongInformation } from "../store";
import { GET_USER_SONGS, POST_SONG, DELETE_SONG } from "./songs.constants";
import { setUserSongs, setNewSong } from "./songs.actions";
import axios from "../../axios";

function* getUserSongs() {
  const songs: SongInformation[] = yield axios
    .get("/songs/")
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  yield put(setUserSongs(songs));
}

function* postNewSong(
  action: ActionWithPayload<{
    title: string;
    artist: string;
    album: string;
    coverImage: string;
    userId: string;
  }>
) {
  const payload = {
    title: action.payload.title,
    artist: action.payload.artist,
    album: action.payload.album,
    cover: action.payload.coverImage,
    user: action.payload.userId,
  };

  const newSong: SongInformation = yield axios
    .post("/songs/", payload)
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  yield put(setNewSong(newSong));
}

function* deleteSong(action: ActionWithPayload<{ id: number }>) {
  axios.delete(`/songs/${action.payload.id}`).catch((e) => console.warn(e));
}

export default function* songsSaga() {
  yield takeEvery(GET_USER_SONGS, getUserSongs);
  yield takeEvery(POST_SONG, postNewSong);
  yield takeEvery(DELETE_SONG, deleteSong);
}
