import { Action } from "redux";
import {
  ActionWithPayload,
  HistoryInformation,
  SectionInformation,
} from "../store";
import {
  POST_SECTION,
  ADD_NEW_SECTION,
  GET_SECTIONS_BY_SONG,
  SET_SECTIONS,
  DELETE_SECTION,
  UPLOAD_SECTION,
  UPLOAD_FINISHED,
  SET_CURRENT_CHALLENGE_REQUEST,
  EDIT_SECTION,
} from "./sections.constants";

export const postSection = (
  title: string,
  audioFile: any,
  difficulty: string,
  songId: number
): ActionWithPayload<{
  title: string;
  audioFile: any;
  difficulty: string;
  songId: number;
}> => ({
  type: POST_SECTION,
  payload: {
    title,
    audioFile,
    difficulty,
    songId,
  },
});

export const addNewSection = (
  section: SectionInformation
): ActionWithPayload<{ section: SectionInformation }> => ({
  type: ADD_NEW_SECTION,
  payload: {
    section,
  },
});

export const getSectionsBySong = (
  songId: number
): ActionWithPayload<{ songId: number }> => ({
  type: GET_SECTIONS_BY_SONG,
  payload: {
    songId,
  },
});

export const setSections = (
  sections: SectionInformation[]
): ActionWithPayload<{ sections: SectionInformation[] }> => ({
  type: SET_SECTIONS,
  payload: {
    sections,
  },
});

export const deleteSection = (
  id: number
): ActionWithPayload<{ id: number }> => ({
  type: DELETE_SECTION,
  payload: {
    id,
  },
});

export const uploadSection = (
  id: number,
  recording: any
): ActionWithPayload<{ id: number; recording: any }> => ({
  type: UPLOAD_SECTION,
  payload: {
    id,
    recording,
  },
});

export const finishUploading = (
  stats: HistoryInformation,
  percentDiff: number
): ActionWithPayload<{ stats: HistoryInformation; percentDiff: number }> => ({
  type: UPLOAD_FINISHED,
  payload: {
    stats,
    percentDiff,
  },
});
