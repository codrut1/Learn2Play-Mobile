import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { colorsFromUrl } from "react-native-dominant-color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const editIcon = <MaterialIcons name="edit" color="white" size={25} />;

import {
  usernameSelector,
  emailSelector,
  profilePicSelector,
  idSelector,
} from "../../store/user/user.selectors";
import { challengeRequestsSelector } from "../../store/challenges/challenges.selectors";
import { changeProfilePicture } from "../../store/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ChallengeRequestList from "../../Components/Profile/ChallengeRequestsList";
import { ChallengeRequestModified } from "../../store/store";
import { logoutUser } from "../../store/user/user.actions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoContainer = styled.View`
  width: 96%;
  height: 200px;
  background-color: #242424;
  margin-top: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 125px;
  height: 125px;
  border-radius: 62.5px;
`;

const EditImageButtonContainer = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: forestgreen;
  border-radius: 20px;
  position: absolute;
  bottom: 35px;
  left: 100px;
  justify-content: center;
  align-items: center;
`;

const UserInformationContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const ChallengeRequestsTitleWrapper = styled.View`
  margin-top: 8px;
`;

const WarningTextWrapper = styled.View`
  margin-top: 16px;
`;

const LogOutButton = styled.TouchableOpacity`
  width: 50%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Profile = () => {
  const [averageColor, setAverageColor] = useState<string>("#6f5656");

  const id = useSelector(idSelector);
  const profilePic = useSelector(profilePicSelector);
  const email = useSelector(emailSelector);
  const username = useSelector(usernameSelector);
  const challengeRequests = useSelector(challengeRequestsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    colorsFromUrl(profilePic, (err: any, colors: any) => {
      if (!err) {
        setAverageColor(colors.averageColor);
      }
    });
  }, [profilePic]);

  const onLogoutButtonPressed = async () => {
    try {
      dispatch(logoutUser());
      await AsyncStorage.removeItem("token");
    } catch (e) {
      console.warn(e);
    }
  };

  const onChangeProfilePictureButtonPressed = () => {
    const options: ImageLibraryOptions = { mediaType: "photo" };
    try {
      let currentImage = profilePic;
      launchImageLibrary(options, (res) => {
        dispatch(changeProfilePicture(id, username, email, res.uri!));
        if (res.didCancel) {
          dispatch(changeProfilePicture(id, username, email, currentImage!));
        }
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <Container>
      <LinearGradient
        colors={[averageColor, "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          padding: 8,
        }}
      >
        <StyledText fontSize={36} color="white" fontWeight={700}>
          Your profile
        </StyledText>
        <Center>
          <ProfileInfoContainer elevation={5}>
            <ImageContainer>
              <ProfileImage source={{ uri: profilePic }} resizeMode="cover" />
            </ImageContainer>
            <EditImageButtonContainer
              onPress={onChangeProfilePictureButtonPressed}
            >
              {editIcon}
            </EditImageButtonContainer>
            <UserInformationContainer>
              <StyledText
                color="white"
                fontSize={20}
                fontWeight={700}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {username}
              </StyledText>
              <StyledText
                color="white"
                fontSize={18}
                fontWeight={700}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {email}
              </StyledText>
            </UserInformationContainer>
          </ProfileInfoContainer>
        </Center>
        <ChallengeRequestsTitleWrapper>
          <StyledText fontSize={28} color="white" fontWeight={700}>
            Your challenge requests
          </StyledText>
        </ChallengeRequestsTitleWrapper>
        <Center>
          {challengeRequests.filter(
            (req: ChallengeRequestModified) => req.owner === id
          ).length > 0 ? (
            <ChallengeRequestList
              challengeRequests={challengeRequests.filter(
                (req: ChallengeRequestModified) => req.owner === id
              )}
            />
          ) : (
            <WarningTextWrapper>
              <StyledText color="salmon" fontSize={20} fontWeight={700}>
                You don't have any challenge requests active
              </StyledText>
            </WarningTextWrapper>
          )}
          <LogOutButton onPress={onLogoutButtonPressed}>
            <StyledText fontSize={24} color="black" fontWeight={700}>
              LOG OUT
            </StyledText>
          </LogOutButton>
        </Center>
      </LinearGradient>
    </Container>
  );
};

export default Profile;
