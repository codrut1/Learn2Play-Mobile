import { Action } from "redux";
import {
  ActionWithPayload,
  ChallengeRequestModified,
  ChallengeFullDetails,
} from "../store";
import {
  GET_CHALLENGE_REQUESTS_BY_USER,
  SET_CHALLENGE_REQUESTS,
  POST_CHALLENGE_REQUEST,
  SET_NEW_CHALLENGE_REQUEST,
  DELETE_CHALLENGE_REQUEST,
  GET_CHALLENGES,
  SET_CHALLENGES,
  POST_CHALLENGE,
  GET_CHALLENGE_BY_ID,
  SET_CURRENT_CHALLENGE,
  UPLOAD_CHALLENGE_RECORDING,
  UPLOAD_CHALLENGE_RECORDING_FINISHED,
} from "./challenges.constants";

export const getChallengeRequestsByUser = (): Action => ({
  type: GET_CHALLENGE_REQUESTS_BY_USER,
});

export const setChallengeRequests = (
  challengeRequests: ChallengeRequestModified[]
): ActionWithPayload<{ challengeRequests: ChallengeRequestModified[] }> => ({
  type: SET_CHALLENGE_REQUESTS,
  payload: {
    challengeRequests, // echivalent cu challengeRequests: challengeRequests
  },
});

export const postChallengeRequest = (
  ownerId: number,
  sectionId: number
): ActionWithPayload<{ ownerId: number; sectionId: number }> => ({
  type: POST_CHALLENGE_REQUEST,
  payload: {
    ownerId,
    sectionId,
  },
});

export const setNewChallengeRequest = (
  challengeRequest: ChallengeRequestModified
): ActionWithPayload<{ challengeRequest: ChallengeRequestModified }> => ({
  type: SET_NEW_CHALLENGE_REQUEST,
  payload: {
    challengeRequest,
  },
});

export const deleteChallengeRequest = (
  challengeRequestId: number
): ActionWithPayload<{ challengeRequestId: number }> => ({
  type: DELETE_CHALLENGE_REQUEST,
  payload: {
    challengeRequestId,
  },
});

export const getAllChallenges = (): Action => ({
  type: GET_CHALLENGES,
});

export const setChallenges = (
  challenges: ChallengeFullDetails[]
): ActionWithPayload<{ challenges: ChallengeFullDetails[] }> => ({
  type: SET_CHALLENGES,
  payload: {
    challenges,
  },
});

export const postChallenge = (
  challengerId: number,
  challengedId: number,
  sectionId: number
): ActionWithPayload<{
  challengerId: number;
  challengedId: number;
  sectionId: number;
}> => ({
  type: POST_CHALLENGE,
  payload: {
    challengerId,
    challengedId,
    sectionId,
  },
});

export const getChallengeById = (
  id: number
): ActionWithPayload<{ id: number }> => ({
  type: GET_CHALLENGE_BY_ID,
  payload: {
    id,
  },
});

export const setCurrentChallenge = (
  challenge: ChallengeFullDetails
): ActionWithPayload<{ challenge: ChallengeFullDetails }> => ({
  type: SET_CURRENT_CHALLENGE,
  payload: {
    challenge,
  },
});

export const uploadChallengeRecording = (
  id: number,
  recording: any,
  isChallenger: boolean,
  challengerAttempts: number,
  challengedAttempts: number,
  challengeId: number,
  challengerBestScore: number,
  challengedBestScore: number,
  challengerId: number,
  challengedId: number
): ActionWithPayload<{
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
}> => ({
  type: UPLOAD_CHALLENGE_RECORDING,
  payload: {
    id,
    recording,
    isChallenger,
    challengedAttempts,
    challengerAttempts,
    challengeId,
    challengedBestScore,
    challengerBestScore,
    challengedId,
    challengerId,
  },
});

export const uploadChallengeRecordingFinished = (
  score: number,
  challenge: ChallengeFullDetails
): ActionWithPayload<{ score: number; challenge: ChallengeFullDetails }> => ({
  type: UPLOAD_CHALLENGE_RECORDING_FINISHED,
  payload: {
    score,
    challenge,
  },
});
