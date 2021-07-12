import { ActionWithPayload } from "../store";
import {
  SET_ERROR,
  SET_USER_INFORMATION,
  REGISTER_USER,
  LOG_OUT,
  CHANGE_PROFILE_PICTURE,
} from "./user.constants";

import { UserInformation } from "../store";

const initialState: UserInformation = {
  id: 0,
  email: "",
  token: "",
  username: "",
  error: "",
  profilePic: "",
  loading: false,
};

const userReducer = (
  state = initialState,
  action: ActionWithPayload<unknown>
) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_USER_INFORMATION:
      return {
        ...state,
        loading: false,
        id: (action as ActionWithPayload<{ userInfo: UserInformation }>).payload
          .userInfo.id,
        email: (action as ActionWithPayload<{ userInfo: UserInformation }>)
          .payload.userInfo.email,
        username: (action as ActionWithPayload<{ userInfo: UserInformation }>)
          .payload.userInfo.username,
        token: (action as ActionWithPayload<{ userInfo: UserInformation }>)
          .payload.userInfo.token,
        profilePic: (action as ActionWithPayload<{ userInfo: UserInformation }>)
          .payload.userInfo.profilePic,
        error: "",
      };
    case SET_ERROR:
      return {
        ...state,
        error: (action as ActionWithPayload<{ message: string }>).payload
          .message,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        id: 0,
        email: "",
        username: "",
        token: "",
        error: "",
        loading: false,
      };
    case CHANGE_PROFILE_PICTURE:
      return {
        ...state,
        profilePic: (action as ActionWithPayload<{
          id: number;
          username: string;
          email: string;
          profilePic: string;
        }>).payload.profilePic,
      };
    default:
      return state;
  }
};

export default userReducer;
