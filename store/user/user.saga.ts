import { takeEvery, put } from "redux-saga/effects";
import { ActionWithPayload, UserInformation } from "../store";
import {
  REGISTER_USER,
  LOGIN_GET_USER_INFO,
  LOGIN_AUTOMATICALLY,
  CHANGE_PROFILE_PICTURE,
} from "./user.constants";
import { setUser, setError } from "./user.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../../axios";

function* registerUser(
  action: ActionWithPayload<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>
) {
  try {
    const data = {
      email: action.payload.email,
      username: action.payload.username,
      password: action.payload.password,
      password2: action.payload.confirmPassword,
    };

    const res = yield fetch("http://127.0.0.1:8000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.response === "Error") {
      if (
        res.email !== undefined &&
        res.email[0] === "user with this email already exists."
      ) {
        yield put(setError("User with this email already exists."));
      } else if (
        res.username[0] === "user with this username already exists."
      ) {
        yield put(setError("User with this username already exists."));
      }
    } else {
      const user: UserInformation = {
        id: res.id,
        email: res.email,
        username: res.username,
        token: res.token,
        error: "",
        loading: false,
        profilePic: res.profilePic,
      };
      yield put(setUser(user));
      yield AsyncStorage.setItem("token", res.token);
    }
  } catch (e) {
    console.warn(e);
  }
}

function* loginUser(
  action: ActionWithPayload<{ email: string; password: string }>
) {
  try {
    const data = {
      username: action.payload.email,
      password: action.payload.password,
    };

    const res = yield fetch("http://127.0.0.1:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (
      res.non_field_errors !== undefined &&
      res.non_field_errors[0] === "Unable to log in with provided credentials."
    ) {
      yield put(setError(res.non_field_errors[0]));
    } else {
      const token: string = res.token;
      const res2 = yield fetch(`http://127.0.0.1:8000/api/users/${token}`, {
        method: "GET",
      }).then((res) => res.json());

      const user: UserInformation = {
        id: res2.id,
        email: res2.email,
        error: "",
        loading: false,
        token,
        username: res2.username,
        profilePic: res2.profilePic,
      };
      yield put(setUser(user));
      yield AsyncStorage.setItem("token", token);
    }
  } catch (e) {
    console.warn(e);
  }
}

function* loginUserAutomatically(action: ActionWithPayload<{ token: string }>) {
  try {
    const res = yield fetch(
      `http://127.0.0.1:8000/api/users/${action.payload.token}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());

    const user: UserInformation = {
      id: res.id,
      email: res.email,
      error: "",
      loading: false,
      token: action.payload.token,
      username: res.username,
      profilePic: res.profilePic,
    };
    yield put(setUser(user));
  } catch (e) {
    console.warn(e);
  }
}

function* changeProfilePicture(
  action: ActionWithPayload<{
    id: number;
    username: string;
    email: string;
    profilePic: string;
  }>
) {
  const data = {
    id: action.payload.id,
    username: action.payload.username,
    email: action.payload.email,
    profilePic: action.payload.profilePic,
  };

  yield axios
    .put(`/users/${action.payload.id}`, data)
    .catch((e) => console.warn(e));
}

export default function* userSaga() {
  yield takeEvery(REGISTER_USER, registerUser);
  yield takeEvery(LOGIN_GET_USER_INFO, loginUser);
  yield takeEvery(LOGIN_AUTOMATICALLY, loginUserAutomatically);
  yield takeEvery(CHANGE_PROFILE_PICTURE, changeProfilePicture);
}
