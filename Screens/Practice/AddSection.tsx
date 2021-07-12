import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import DocumentPicker from "react-native-document-picker";
import { ButtonGroup } from "react-native-elements";
import { useDispatch } from "react-redux";

import { postSection } from "../../store/sections/sections.actions";
import { idSelector } from "../../store/user/user.selectors";

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
  margin-right: 95px;
`;

const BackButtonContainer = styled.TouchableOpacity``;

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
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.7);
`;

const UploadFileButton = styled.TouchableOpacity`
  width: 50%;
  height: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const MarginWrapper = styled.View<{ marginTop?: number }>`
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}` : "8")}px;
`;

const SubmitButton = styled.TouchableOpacity<{ isDisabled?: boolean }>`
  width: 80%;
  height: 50px;
  background-color: ${({ isDisabled }) =>
    isDisabled === true ? "rgba(0, 0, 0, 0.5)" : "black"};
  justify-content: center;
  align-items: center;
  margin-top: 170px;
`;

const AddSection: React.FC<{ route: any }> = ({ route }) => {
  const { backgroundColor, id } = route.params;

  const [title, setTitle] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(0);
  const [audioFile, setAudioFile] = useState<any>();
  const [fileType, setFileType] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState<boolean>(
    true
  );

  const buttons = ["Easy", "Medium", "Hard"];

  const navigate = useNavigation();
  const dispatch = useDispatch();

  const onSubmitSectionPressed = () => {
    dispatch(postSection(title, audioFile, buttons[difficulty], id));
    navigate.goBack();
  };

  useEffect(() => {
    if (title !== "" && fileName !== "") {
      setSubmitButtonIsDisabled(false);
    } else {
      setSubmitButtonIsDisabled(true);
    }
  }, [title, fileName]);

  const onPickFilePressed = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res);
      setAudioFile(res);
      setFileType(res.type);
      setFileName(res.name);
    } catch (e) {
      if (DocumentPicker.isCancel(e)) {
        console.log(e);
      } else {
        console.warn(e);
      }
    }
  };

  return (
    <Container>
      <LinearGradient
        colors={[backgroundColor, "#000000"]}
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
              Add a section
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
          <StyledText fontSize={17} fontWeight={700}>
            Select difficulty:
          </StyledText>
          <Center>
            <ButtonGroup
              onPress={(selectedIndex: number) => setDifficulty(selectedIndex)}
              selectedIndex={difficulty}
              buttons={buttons}
              containerStyle={{
                width: "100%",
                backgroundColor: "black",
                borderRadius: 0,
              }}
              selectedButtonStyle={{ backgroundColor: "lightgray" }}
              textStyle={{ color: "white", fontWeight: "700" }}
            />
          </Center>
          <MarginWrapper marginTop={16}>
            <StyledText fontSize={17} fontWeight={700}>
              Choose audio file to upload:
            </StyledText>
            <UploadFileButton onPress={onPickFilePressed}>
              <StyledText color="white" fontSize={19} fontWeight={700}>
                SELECT FILE
              </StyledText>
            </UploadFileButton>
            <StyledText fontSize={18}>
              {fileName ? `Selected file "${fileName}".` : "No file selected."}
            </StyledText>
          </MarginWrapper>
          <Center>
            <SubmitButton
              isDisabled={submitButtonIsDisabled}
              disabled={submitButtonIsDisabled}
              onPress={onSubmitSectionPressed}
            >
              <StyledText fontSize={24} fontWeight={700} color="white">
                SUBMIT
              </StyledText>
            </SubmitButton>
          </Center>
        </FormContainer>
      </LinearGradient>
    </Container>
  );
};

export default AddSection;
