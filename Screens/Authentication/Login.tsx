import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getUserInformation,
  loginAutomatically,
} from "../../store/user/user.actions";
import {
  errorSelector,
  isLoadingSelector,
} from "../../store/user/user.selectors";

const LoginContainer = styled.View`
  width: 80%;
  height: 65%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 16px;
  color: white;
`;

const OuterContainer = styled.View`
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const Background = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SubtitleText = styled.Text`
  font-size: 32px;
  color: black;
  font-weight: 700;
  margin-bottom: 32px;
`;

const SubmitButton = styled.TouchableOpacity<{ isDisabled?: boolean }>`
  width: 80%;
  height: 50px;
  background-color: ${({ isDisabled }) =>
    isDisabled === true ? "rgba(0, 0, 0, 0.5)" : "black"};
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const SubmitText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: 700;
`;

const Centered = styled.View`
  width: 100%;
  align-items: center;
`;

const Input = styled.TextInput`
  height: 40px;
  padding-left: 6px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.7);
`;

const RegisterContainer = styled.TouchableOpacity`
  margin-top: 16px;
`;

const RegisterText = styled.Text`
  font-size: 16px;
  font-weight: 400;
`;

const ErrorMessageContainer = styled.View``;

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [emailIsTouched, setEmailIsTouched] = useState<boolean>(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [signUpIsDisabled, setSignUpIsDisabled] = useState<boolean>(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);
  const loginError = useSelector(errorSelector);

  const onEmailChangedHandler = (text: string) => {
    setEmail(text);
    setEmailIsTouched(true);
  };

  const onPasswordChangedHandler = (text: string) => {
    setPassword(text);
    setPasswordIsTouched(true);
  };

  const onSubmitButtonPressed = () => {
    dispatch(getUserInformation(email, password));
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          dispatch(loginAutomatically(token));
        }
      } catch (e) {
        console.warn(e);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (emailIsTouched) {
      if (email.trim().length > 0) {
        setEmailError("");
      } else {
        setEmailError("Email must not be empty");
      }
    }

    if (passwordIsTouched) {
      if (password.trim().length > 0) {
        setPasswordError("");
      } else {
        setPasswordError("Password must not be empty");
      }
    }

    if (
      emailIsTouched &&
      passwordIsTouched &&
      emailError === "" &&
      passwordError === ""
    ) {
      setSignUpIsDisabled(false);
      setErrorMessage("");
    } else {
      setSignUpIsDisabled(true);
      if (emailError !== "") {
        setErrorMessage(emailError);
      } else if (passwordError !== "") {
        setErrorMessage(passwordError);
      }
    }
  }, [
    email,
    password,
    emailIsTouched,
    passwordIsTouched,
    emailError,
    passwordError,
  ]);

  useEffect(() => {
    setErrorMessage(loginError);
  }, [loginError]);

  return (
    <Background
      source={{
        uri:
          "https://i.pinimg.com/originals/d1/c6/03/d1c6035dcbcb9e349f39a58f717f9c65.jpg",
      }}
    >
      <OuterContainer>
        <StyledText
          fontSize={48}
          color="rgba(255, 255, 255, 0.9)"
          fontWeight={700}
        >
          Learn2Play
        </StyledText>
        <LoginContainer>
          <SubtitleText>Login</SubtitleText>
          <Input
            onChangeText={(text: string) => onEmailChangedHandler(text)}
            placeholder="Email"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={email}
            keyboardType="email-address"
          />
          <Input
            onChangeText={(text: string) => onPasswordChangedHandler(text)}
            placeholder="Password"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={password}
            secureTextEntry
          />
          <Centered>
            {errorMessage !== "" && (
              <ErrorMessageContainer>
                <StyledText color="red" fontSize={12}>
                  {errorMessage}
                </StyledText>
              </ErrorMessageContainer>
            )}
            <SubmitButton
              disabled={signUpIsDisabled}
              isDisabled={signUpIsDisabled}
              onPress={onSubmitButtonPressed}
            >
              <SubmitText>{!isLoading ? "SUBMIT" : "LOADING..."}</SubmitText>
            </SubmitButton>
            <RegisterContainer onPress={() => navigation.navigate("Register")}>
              <RegisterText>No account? Register now!</RegisterText>
            </RegisterContainer>
          </Centered>
        </LoginContainer>
      </OuterContainer>
    </Background>
  );
};

export default Login;
