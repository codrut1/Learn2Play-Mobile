import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

const getData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
      instance.defaults.headers.common.Authorization = `Token ${token}`;
    }
  } catch (e) {
    console.warn(e);
  }
};

getData();

export default instance;
