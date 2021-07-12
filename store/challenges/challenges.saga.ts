import { takeEvery, put } from "redux-saga/effects";
import {
  ActionWithPayload,
  ChallengeRequest,
  ChallengeRequestModified,
  ChallengeFullDetails,
} from "../store";
import {
  GET_CHALLENGE_REQUESTS_BY_USER,
  POST_CHALLENGE_REQUEST,
  DELETE_CHALLENGE_REQUEST,
  GET_CHALLENGES,
  POST_CHALLENGE,
  GET_CHALLENGE_BY_ID,
  UPLOAD_CHALLENGE_RECORDING,
} from "./challenges.constants";
import {
  setChallengeRequests,
  setChallenges,
  setCurrentChallenge,
  uploadChallengeRecordingFinished,
} from "./challenges.actions";
import axios from "../../axios";
import moment from "moment";

function* getChallengeRequests() {
  const challengeRequests: ChallengeRequestModified[] = yield axios
    .get("/challenges/requests")
    .then((res) =>
      res.data.map((req: any) => ({
        id: req.id,
        owner: req.owner.id,
        section: req.section.id,
        songTitle: req.section.song.title,
        sectionTitle: req.section.title,
        songImage: req.section.song.cover,
        dateCreated: req.dateCreated,
      }))
    )
    .catch((e) => console.warn(e));

  yield put(setChallengeRequests(challengeRequests));
}

function* postChallengeRequest(
  action: ActionWithPayload<{ ownerId: number; sectionId: number }>
) {
  const data = {
    owner: action.payload.ownerId,
    section: action.payload.sectionId,
  };

  yield axios.post("/challenges/requests", data).catch((e) => console.warn(e));

  const challengeRequests: ChallengeRequestModified[] = yield axios
    .get("/challenges/requests")
    .then((res) =>
      res.data.map((req: any) => ({
        id: req.id,
        owner: req.owner.id,
        section: req.section.id,
        songTitle: req.section.song.title,
        sectionTitle: req.section.title,
        songImage: req.section.song.cover,
        dateCreated: req.dateCreated,
      }))
    )
    .catch((e) => console.warn(e));

  yield put(setChallengeRequests(challengeRequests));
}

function* deleteChallengeRequest(
  action: ActionWithPayload<{ challengeRequestId: number }>
) {
  yield axios
    .delete(`/challenges/requests/${action.payload.challengeRequestId}`)
    .catch((e) => console.warn(e));
}

function* getChallenges() {
  const challenges: ChallengeFullDetails[] = yield axios
    .get("/challenges/")
    .then((res) =>
      res.data.map((challenge: any) => ({
        id: challenge.id,
        isFinished: challenge.is_finished,
        challengerBestScore: challenge.challengerBestScore,
        challengedBestScore: challenge.challengedBestScore,
        challengerLastAttemptDate: challenge.challengerLastAttemptDate,
        challengedLastAttemptDate: challenge.challengedLastAttemptDate,
        challengerAttemptsNumber: challenge.challengerAttemptsNumber,
        challengedAttemptsNumber: challenge.challengedAttemptsNumber,
        finishDate: challenge.finishDate,
        challenger: {
          id: challenge.challenger.id,
          username: challenge.challenger.username,
          profilePic: challenge.challenger.profilePic,
        },
        challenged: {
          id: challenge.challenged.id,
          username: challenge.challenged.username,
          profilePic: challenge.challenged.zprofilePic,
        },
        sectionId: challenge.section.id,
        sectionTitle: challenge.section.title,
        songTitle: challenge.section.song.title,
        songArtist: challenge.section.song.artist,
        songAlbum: challenge.section.song.album,
        songCover: challenge.section.song.cover,
      }))
    )
    .catch((e) => console.warn(e));

  yield put(setChallenges(challenges));
}

function* postChallenge(
  action: ActionWithPayload<{
    challengerId: number;
    challengedId: number;
    sectionId: number;
  }>
) {
  const data = {
    challenger: action.payload.challengerId,
    challenged: action.payload.challengedId,
    section: action.payload.sectionId,
  };

  yield axios.post("/challenges/", data).catch((e) => console.warn(e));

  yield getChallenges();
}

function* getChallengeById(action: ActionWithPayload<{ id: number }>) {
  const challenge: ChallengeFullDetails = yield axios
    .get(`/challenges/${action.payload.id}`)
    .then((res) => ({
      id: res.data.id,
      isFinished: res.data.is_finished,
      challengerBestScore: res.data.challengerBestScore.toFixed(2),
      challengedBestScore: res.data.challengedBestScore.toFixed(2),
      challengerLastAttemptDate: res.data.challengerLastAttemptDate,
      challengedLastAttemptDate: res.data.challengedLastAttemptDate,
      challengerAttemptsNumber: res.data.challengerAttemptsNumber,
      challengedAttemptsNumber: res.data.challengedAttemptsNumber,
      finishDate: res.data.finishDate,
      challenger: {
        id: res.data.challenger.id,
        username: res.data.challenger.username,
        profilePic: res.data.challenger.profilePic,
      },
      challenged: {
        id: res.data.challenged.id,
        username: res.data.challenged.username,
        profilePic: res.data.challenged.profilePic,
      },
      sectionId: res.data.section.id,
      sectionTitle: res.data.section.title,
      songTitle: res.data.section.song.title,
      songArtist: res.data.section.song.artist,
      songAlbum: res.data.section.song.album,
      songCover: res.data.section.song.cover,
    }))
    .catch((e) => console.warn(e));

  yield put(setCurrentChallenge(challenge));
}

function* uploadChallengeRecording(
  action: ActionWithPayload<{
    id: number;
    recording: any;
    isChallenger: boolean;
    challengerAttempts: number;
    challengedAttempts: number;
    challengeId: number;
    challengerBestScore: number;
    challengedBestScore: number;
    challengerId: number;
    challengedId: number;
  }>
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

  const score: number = yield axios
    .post("/challenges/upload", data, {
      headers,
    })
    .then((res) => res.data.score)
    .catch((e) => console.warn(e));

  let challengeData = {};

  if (action.payload.isChallenger) {
    let bestScore = score;
    if (action.payload.challengerBestScore < score) {
      bestScore = action.payload.challengerBestScore;
    }
    challengeData = {
      challengerAttemptsNumber: action.payload.challengerAttempts + 1,
      challengerLastAttemptDate: moment().toISOString(),
      challengerBestScore: bestScore,
      challenger: action.payload.challengerId,
      challenged: action.payload.challengedId,
      section: action.payload.id,
    };
  } else {
    let bestScore = score;
    if (action.payload.challengedBestScore < score) {
      bestScore = action.payload.challengedBestScore;
    }
    challengeData = {
      challengedAttemptsNumber: action.payload.challengedAttempts + 1,
      challengedLastAttemptDate: moment().toISOString(),
      challengedBestScore: bestScore,
      challenger: action.payload.challengerId,
      challenged: action.payload.challengedId,
      section: action.payload.id,
    };
  }

  yield axios
    .put(`/challenges/${action.payload.challengeId}`, challengeData)
    .then((res) => res.data)
    .catch((e) => console.warn(e));

  const challenge: ChallengeFullDetails = yield axios
    .get(`/challenges/${action.payload.challengeId}`)
    .then((res) => ({
      id: res.data.id,
      isFinished: res.data.is_finished,
      challengerBestScore: res.data.challengerBestScore.toFixed(2),
      challengedBestScore: res.data.challengedBestScore.toFixed(2),
      challengerLastAttemptDate: res.data.challengerLastAttemptDate,
      challengedLastAttemptDate: res.data.challengedLastAttemptDate,
      challengerAttemptsNumber: res.data.challengerAttemptsNumber,
      challengedAttemptsNumber: res.data.challengedAttemptsNumber,
      finishDate: res.data.finishDate,
      challenger: {
        id: res.data.challenger.id,
        username: res.data.challenger.username,
        profilePic: res.data.challenger.profilePic,
      },
      challenged: {
        id: res.data.challenged.id,
        username: res.data.challenged.username,
        profilePic: res.data.challenged.profilePic,
      },
      sectionId: res.data.section.id,
      sectionTitle: res.data.section.title,
      songTitle: res.data.section.song.title,
      songArtist: res.data.section.song.artist,
      songAlbum: res.data.section.song.album,
      songCover: res.data.section.song.cover,
    }))
    .catch((e) => console.warn(e));

  yield put(uploadChallengeRecordingFinished(score, challenge));
}

export default function* challengesSaga() {
  yield takeEvery(GET_CHALLENGE_REQUESTS_BY_USER, getChallengeRequests);
  yield takeEvery(POST_CHALLENGE_REQUEST, postChallengeRequest);
  yield takeEvery(DELETE_CHALLENGE_REQUEST, deleteChallengeRequest);
  yield takeEvery(GET_CHALLENGES, getChallenges);
  yield takeEvery(POST_CHALLENGE, postChallenge);
  yield takeEvery(GET_CHALLENGE_BY_ID, getChallengeById);
  yield takeEvery(UPLOAD_CHALLENGE_RECORDING, uploadChallengeRecording);
}
