import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from "react-native-image-picker";
import { postSong } from "../../store/songs/songs.actions";
import { idSelector } from "../../store/user/user.selectors";
import { useDispatch, useSelector } from "react-redux";

const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

const TitleContainer = styled.View`
  margin-right: 105px;
`;

const FormContainer = styled.View`
  margin-top: 32px;
  width: 80%;
  height: 75%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 16px;
  color: white;
`;

const Input = styled.TextInput`
  height: 40px;
  padding-left: 6px;
  margin-bottom: 24px;
  color: rgba(0, 0, 0, 0.7);
`;

const CoverImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const CoverImageArea = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const UploadImageButton = styled.TouchableOpacity`
  width: 50%;
  height: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
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

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const BackButtonContainer = styled.TouchableOpacity``;

const AddSong = () => {
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const [album, setAlbum] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>(
    "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
  );
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState<boolean>(
    true
  );

  const dispatch = useDispatch();
  const navigate = useNavigation();
  const userId = useSelector(idSelector);

  const onSubmitPressed = () => {
    dispatch(postSong(title, artist, album, coverImage, userId));
    navigate.goBack();
  };

  const onChooseImage = () => {
    const options: ImageLibraryOptions = { mediaType: "photo" };
    try {
      launchImageLibrary(options, (res) => {
        setCoverImage(res.uri!);
        if (res.didCancel) {
          setCoverImage(
            "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"
          );
        }
      });
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    if (artist !== "" && album !== "" && title !== "") {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  }, [artist, album, title]);

  return (
    <Container>
      <LinearGradient
        colors={["#6f5656", "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Header>
          <BackButtonContainer onPress={navigate.goBack}>
            {backArrowIcon}
          </BackButtonContainer>
          <TitleContainer>
            <StyledText fontSize={24} color="white" fontWeight={700}>
              Add a song
            </StyledText>
          </TitleContainer>
        </Header>
        <FormContainer>
          <Input
            placeholder="Title"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={title}
            onChangeText={(value: string) => setTitle(value)}
          />
          <Input
            placeholder="Artist"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={artist}
            onChangeText={(value: string) => setArtist(value)}
          />
          <Input
            placeholder="Album"
            underlineColorAndroid="black"
            selectionColor="color: rgba(0, 0, 0, 0.9);"
            value={album}
            onChangeText={(value: string) => setAlbum(value)}
          />
          <StyledText color="#C7C7CD" fontSize={14}>
            Cover image:
          </StyledText>
          <CoverImageArea>
            <CoverImage
              source={{
                uri: coverImage,
              }}
              resizeMode="contain"
            />
            <UploadImageButton onPress={onChooseImage}>
              <StyledText color="white" fontSize={24} fontWeight={700}>
                UPLOAD
              </StyledText>
            </UploadImageButton>
          </CoverImageArea>
          <Center>
            <SubmitButton
              isDisabled={submitButtonIsDisabled}
              disabled={submitButtonIsDisabled}
              onPress={onSubmitPressed}
            >
              <StyledText color="white" fontWeight={700} fontSize={24}>
                SUBMIT
              </StyledText>
            </SubmitButton>
          </Center>
        </FormContainer>
      </LinearGradient>
    </Container>
  );
};

export default AddSong;
