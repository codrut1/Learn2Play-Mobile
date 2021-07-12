import { ActionWithPayload, SongInformation, SongState } from "../store";
import {
  SET_SONGS,
  GET_USER_SONGS,
  ADD_NEW_SONG,
  DELETE_SONG,
} from "./songs.constants";

const initialState: SongState = {
  songs: [],
  loading: false,
};

const songsReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case GET_USER_SONGS:
      return {
        ...state,
        loading: true,
      };
    case SET_SONGS:
      return {
        ...state,
        songs: (action as ActionWithPayload<{ songs: SongInformation }>).payload
          .songs,
        loading: false,
      };
    case ADD_NEW_SONG:
      return {
        ...state,
        songs: [
          ...state.songs,
          (action as ActionWithPayload<{ song: SongInformation }>).payload.song,
        ],
      };
    case DELETE_SONG:
      return {
        ...state,
        songs: state.songs.filter(
          (song: SongInformation) =>
            song.id !== (action as ActionWithPayload<{ id: number }>).payload.id
        ),
      };
    default:
      return state;
  }
};

export default songsReducer;
