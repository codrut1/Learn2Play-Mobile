import { Action } from "redux";
import { ActionWithPayload, SongInformation } from "../store";
import {
  GET_USER_SONGS,
  SET_SONGS,
  ADD_NEW_SONG,
  POST_SONG,
  DELETE_SONG,
} from "./songs.constants";

export const getUserSongs = (): Action => ({
  type: GET_USER_SONGS,
});

export const setUserSongs = (
  songs: SongInformation[]
): ActionWithPayload<{ songs: SongInformation[] }> => ({
  type: SET_SONGS,
  payload: {
    songs,
  },
});

export const postSong = (
  title: string,
  artist: string,
  album: string,
  coverImage: string,
  userId: number
): ActionWithPayload<{
  title: string;
  artist: string;
  album: string;
  coverImage: string;
  userId: number;
}> => ({
  type: POST_SONG,
  payload: {
    title,
    album,
    artist,
    coverImage,
    userId,
  },
});

export const setNewSong = (
  song: SongInformation
): ActionWithPayload<{ song: SongInformation }> => ({
  type: ADD_NEW_SONG,
  payload: {
    song,
  },
});

export const deleteSong = (id: number): ActionWithPayload<{ id: number }> => ({
  type: DELETE_SONG,
  payload: {
    id,
  },
});
