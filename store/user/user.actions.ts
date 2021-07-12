import { Action } from "redux";
import { ActionWithPayload, UserInformation } from "../store";
import {
  LOGIN_GET_USER_INFO,
  REGISTER_USER,
  SET_USER_INFORMATION,
  SET_ERROR,
  LOG_OUT,
  LOGIN_AUTOMATICALLY,
  CHANGE_PROFILE_PICTURE,
} from "./user.constants";

export const getUserInformation = (
  email: string,
  password: string
): ActionWithPayload<{ email: string; password: string }> => ({
  type: LOGIN_GET_USER_INFO,
  payload: {
    email,
    password,
  },
});

export const registerUser = (
  email: string,
  username: string,
  password: string,
  confirmPassword: string
): ActionWithPayload<{
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}> => ({
  type: REGISTER_USER,
  payload: {
    email,
    username,
    password,
    confirmPassword,
  },
});

export const setUser = (
  userInfo: UserInformation
): ActionWithPayload<{ userInfo: UserInformation }> => ({
  type: SET_USER_INFORMATION,
  payload: {
    userInfo,
  },
});

export const setError = (
  message: string
): ActionWithPayload<{ message: string }> => ({
  type: SET_ERROR,
  payload: {
    message,
  },
});

export const logoutUser = (): Action => ({
  type: LOG_OUT,
});

export const loginAutomatically = (
  token: string
): ActionWithPayload<{ token: string }> => ({
  type: LOGIN_AUTOMATICALLY,
  payload: {
    token,
  },
});

export const changeProfilePicture = (
  id: number,
  username: string,
  email: string,
  profilePic: string
): ActionWithPayload<{
  id: number;
  username: string;
  email: string;
  profilePic: string;
}> => ({
  type: CHANGE_PROFILE_PICTURE,
  payload: { id, username, email, profilePic },
});
