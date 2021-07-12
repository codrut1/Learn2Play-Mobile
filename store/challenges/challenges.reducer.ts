import {
  ActionWithPayload,
  ChallengeRequest,
  ChallengeRequestModified,
  ChallengeState,
  ChallengeFullDetails,
} from "../store";
import {
  GET_CHALLENGE_REQUESTS_BY_USER,
  SET_CHALLENGE_REQUESTS,
  SET_NEW_CHALLENGE_REQUEST,
  DELETE_CHALLENGE_REQUEST,
  GET_CHALLENGES,
  SET_CHALLENGES,
  GET_CHALLENGE_BY_ID,
  SET_CURRENT_CHALLENGE,
  UPLOAD_CHALLENGE_RECORDING_FINISHED,
  UPLOAD_CHALLENGE_RECORDING,
} from "./challenges.constants";

const initialState: ChallengeState = {
  challengeRequests: [],
  challenges: [],
  loading: false,
  currentChallenge: {
    challenged: {
      id: 0,
      profilePic: "",
      username: "",
    },
    challengedAttemptsNumber: 0,
    challengedBestScore: 0.0,
    challengedLastAttemptDate: "",
    challenger: {
      id: 0,
      profilePic: "",
      username: "",
    },
    challengerAttemptsNumber: 0,
    challengerBestScore: 0.0,
    challengerLastAttemptDate: "",
    finishDate: "",
    id: 0,
    isFinished: false,
    sectionId: 0,
    sectionTitle: "",
    songAlbum: "",
    songArtist: "",
    songCover: "",
    songTitle: "",
  },
  uploadingRecording: false,
  latestScore: 0,
};

const challengesReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_CHALLENGE_REQUESTS_BY_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_CHALLENGE_REQUESTS:
      return {
        ...state,
        challengeRequests: (action as ActionWithPayload<{
          challengeRequests: ChallengeRequest[];
        }>).payload.challengeRequests,
        loading: false,
      };
    case SET_NEW_CHALLENGE_REQUEST:
      return {
        ...state,
        challengeRequests: [
          ...state.challengeRequests,
          (action as ActionWithPayload<{
            challengeRequest: ChallengeRequestModified;
          }>).payload.challengeRequest,
        ],
      };
    case DELETE_CHALLENGE_REQUEST:
      return {
        ...state,
        challengeRequests: state.challengeRequests.filter(
          (req: ChallengeRequestModified) =>
            req.id !==
            (action as ActionWithPayload<{ challengeRequestId: number }>)
              .payload.challengeRequestId
        ),
      };
    case GET_CHALLENGES:
      return {
        ...state,
        loading: true,
      };
    case SET_CHALLENGES:
      return {
        ...state,
        loading: false,
        challenges: (action as ActionWithPayload<{
          challenges: ChallengeFullDetails[];
        }>).payload.challenges,
      };
    case GET_CHALLENGE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case SET_CURRENT_CHALLENGE:
      return {
        ...state,
        loading: false,
        currentChallenge: (action as ActionWithPayload<{
          challenge: ChallengeFullDetails;
        }>).payload.challenge,
      };
    case UPLOAD_CHALLENGE_RECORDING:
      return {
        ...state,
        uploadingRecording: true,
      };
    case UPLOAD_CHALLENGE_RECORDING_FINISHED:
      return {
        ...state,
        uploadingRecording: false,
        latestScore: (action as ActionWithPayload<{
          score: number;
          challenge: ChallengeFullDetails;
        }>).payload.score.toFixed(2),
        currentChallenge: (action as ActionWithPayload<{
          score: number;
          challenge: ChallengeFullDetails;
        }>).payload.challenge,
      };
    default:
      return state;
  }
};

export default challengesReducer;
