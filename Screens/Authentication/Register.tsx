import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";

import { registerUser } from "../../store/user/user.actions";
import {
  isLoadingSelector,
  errorSelector,
} from "../../store/user/user.selectors";

const RegisterContainer = styled.View`
  width: 80%;
  height: 65%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 16px;
  color: white;
`;

const WrappingContainer = styled.View`
  margin-bottom: 16px;
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

const Input = styled.TextInput`
  height: 40px;
  padding-left: 6px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.7);
`;

const Centered = styled.View`
  width: 100%;
  align-items: center;
`;

const SubmitButton = styled.TouchableOpacity<{ isDisabled?: boolean }>`
  width: 80%;
  height: 50px;
  background-color: ${({ isDisabled }) =>
    isDisabled === true ? "rgba(0, 0, 0, 0.5)" : "black"};
  justify-content: center;
  align-items: center;}
  margin-top: 30px;
`;

const LoginContainer = styled.TouchableOpacity`
  margin-top: 16px;
`;

const ErrorMessageContainer = styled.View``;

let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const [emailIsTouched, setEmailIsTouched] = useState<boolean>(false);
  const [usernameIsTouched, setUsernameIsTouched] = useState<boolean>(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState<boolean>(false);
  const [
    confirmPasswordIsTouched,
    setConfirmPasswordIsTouched,
  ] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [signUpIsDisabled, setSignUpIsDisabled] = useState<boolean>(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const isLoading = useSelector(isLoadingSelector);
  const registerError = useSelector(errorSelector);

  const onEmailChangedHandler = (text: string) => {
    setEmail(text);
    setEmailIsTouched(true);
  };

  const onUsernameChangedHandler = (text: string) => {
    setUsername(text);
    setUsernameIsTouched(true);
  };

  const onPasswordChangedHandler = (text: string) => {
    setPassword(text);
    setPasswordIsTouched(true);
  };

  const onConfirmPasswordChangedHandler = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordIsTouched(true);
  };

  const onSubmitButtonPressed = () => {
    dispatch(registerUser(email, username, password, confirmPassword));
  };

  useEffect(() => {
    if (emailIsTouched) {
      if (emailRegex.test(email)) {
        setEmailError("");
      } else {
        setEmailError("Email is not valid");
      }
    }

    if (usernameIsTouched) {
      if (username.trim().length > 0) {
        setUsernameError("");
      } else {
        setUsernameError("Username must not be empty");
      }
    }

    if (passwordIsTouched) {
      if (passwordRegex.test(password)) {
        setPasswordError("");
      } else {
        setPasswordError(
          "Password must be at least 6 characters long and contain lowercase, uppercase and number"
        );
      }
    }

    if (confirmPasswordIsTouched) {
      if (confirmPassword === password) {
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError("Passwords don't match.");
      }
    }

    if (
      emailIsTouched &&
      usernameIsTouched &&
      passwordIsTouched &&
      confirmPasswordIsTouched &&
      emailError === "" &&
      usernameError === "" &&
      passwordError === "" &&
      confirmPasswordError === ""
    ) {
      setSignUpIsDisabled(false);
      setErrorMessage("");
    } else {
      setSignUpIsDisabled(true);
      if (emailError !== "") {
        setErrorMessage(emailError);
      } else if (usernameError !== "") {
        setErrorMessage(usernameError);
      } else if (passwordError !== "") {
        setErrorMessage(passwordError);
      } else if (confirmPasswordError !== "") {
        setErrorMessage(confirmPasswordError);
      }
    }
  }, [
    email,
    username,
    password,
    confirmPassword,
    emailIsTouched,
    usernameIsTouched,
    passwordIsTouched,
    confirmPasswordIsTouched,
    emailError,
    usernameError,
    passwordError,
    confirmPasswordError,
  ]);

  useEffect(() => {
    setErrorMessage(registerError);
  }, [registerError]);

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
        <RegisterContainer>
          <WrappingContainer>
            <StyledText fontSize={32} fontWeight={700}>
              Register
            </StyledText>
          </WrappingContainer>
          <Input
            onChangeText={(text: string) => onEmailChangedHandler(text)}
            placeholder="Email"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={email}
            keyboardType="email-address"
          />
          <Input
            onChangeText={(text: string) => onUsernameChangedHandler(text)}
            placeholder="Username"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={username}
          />
          <Input
            onChangeText={(text: string) => onPasswordChangedHandler(text)}
            placeholder="Password"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={password}
            secureTextEntry
          />
          <Input
            onChangeText={(text: string) =>
              onConfirmPasswordChangedHandler(text)
            }
            placeholder="Confirm Password"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={confirmPassword}
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
              onPress={onSubmitButtonPressed}
              disabled={signUpIsDisabled}
              isDisabled={signUpIsDisabled}
            >
              <StyledText fontSize={24} color="white" fontWeight={700}>
                {!isLoading ? "SUBMIT" : "LOADING..."}
              </StyledText>
            </SubmitButton>
            <LoginContainer onPress={() => navigation.navigate("Login")}>
              <StyledText>Already registered? Login now!</StyledText>
            </LoginContainer>
          </Centered>
        </RegisterContainer>
      </OuterContainer>
    </Background>
  );
};

export default Register;
