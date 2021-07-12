import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScoreModal from "../../Components/Practice/ScoreModal";
import { useNavigation } from "@react-navigation/core";

import AudioRecord from "react-native-audio-record";

import {
  deleteSection,
  uploadSection,
} from "../../store/sections/sections.actions";
import {
  latestTryPercentDiffSelector,
  latestTrySelector,
  recordingUploadingSelector,
} from "../../store/sections/sections.selectors";
import { challengeRequestsSelector } from "../../store/challenges/challenges.selectors";
import { idSelector } from "../../store/user/user.selectors";
import { postChallengeRequest } from "../../store/challenges/challenges.actions";
import { useDispatch, useSelector } from "react-redux";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import { ChallengeRequestModified } from "../../store/store";

const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;
const trashIcon = <Ionicons name="trash-outline" size={30} color="white" />;
const historyIcon = <FontAwesome5 name="history" size={24} color="white" />;
const recordIcon = (
  <MaterialCommunityIcons name="record" size={40} color="black" />
);
const stopIcon = <Ionicons name="stop" size={30} color="white" />;

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

const LeftContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: 8px;
`;

const CurrentRecordingTimeContainer = styled.View`
  margin-top: 16px;
`;

const RecordButtonContainer = styled.TouchableOpacity`
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.5);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  padding-right: 10px;
  margin-top: 30px;
`;

const StopButtonContainer = styled.TouchableOpacity`
  width: 150px;
  height: 60px;
  background-color: rgba(255, 0, 0, 0.4);
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  padding-right: 10px;
  margin-top: 20px;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const SubmitButton = styled.TouchableOpacity<{ isDisabled?: boolean }>`
  width: 80%;
  height: 50px;
  background-color: ${({ isDisabled }) =>
    isDisabled === true
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(255, 255, 255, 0.8)"};
  justify-content: center;
  align-items: center;
  margin-top: 180px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.TouchableOpacity``;

const CreateChallengeButton = styled.TouchableOpacity`
  width: 150px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

const Section: React.FC<{ route: any }> = ({ route }) => {
  const { sectionInfo, backgroundColor } = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const latestTry = useSelector(latestTrySelector);
  const percentDifference = useSelector(latestTryPercentDiffSelector);
  const recordingUploading = useSelector(recordingUploadingSelector);
  const userId = useSelector(idSelector);
  const challengeRequests = useSelector(challengeRequestsSelector);

  const [recorderData, setRecorderData] = useState<any>({
    audioFile: "",
    recording: false,
  });
  const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(true);
  const [scoreModalIsVisible, setScoreModalIsVisible] = useState<boolean>(
    false
  );
  const [hasChallenge, setHasChallenge] = useState<boolean>(false);

  useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: `${sectionInfo.id}.wav`,
    };

    requestPermission();
    AudioRecord.init(options);
  }, []);

  useEffect(() => {
    if (recorderData.audioFile !== "") {
      setSubmitIsDisabled(false);
    } else {
      setSubmitIsDisabled(true);
    }
  }, [recorderData.audioFile]);

  useEffect(() => {
    if (
      challengeRequests.find(
        (req: ChallengeRequestModified) =>
          req.section === sectionInfo.id && req.owner === userId
      ) !== undefined
    ) {
      setHasChallenge(true);
    } else {
      setHasChallenge(false);
    }
  }, [challengeRequests]);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log("write external storage", grants);
        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.READ_EXTERNAL_STORAGE"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.RECORD_AUDIO"] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions granted");
        } else {
          console.log("All required permissions not granted");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  const onDeleteButtonPressed = () => {
    dispatch(deleteSection(sectionInfo.id));
    navigate.goBack();
  };

  const onStartRecord = async () => {
    setRecorderData({ ...recorderData, audioFile: "", recording: true });
    AudioRecord.start();
  };

  const onStopRecord = async () => {
    if (!recorderData.recording) return;
    let audioFile = await AudioRecord.stop();
    setRecorderData({ ...recorderData, audioFile, recording: false });
  };

  const onSubmitPressed = async () => {
    await RNFS.moveFile(
      recorderData.audioFile,
      `${RNFS.ExternalStorageDirectoryPath}/${sectionInfo.id}.wav`
    );
    dispatch(
      uploadSection(
        sectionInfo.id,
        `${RNFS.ExternalStorageDirectoryPath}/${sectionInfo.id}.wav`
      )
    );
    setScoreModalIsVisible(true);
  };

  const onCreateChallengePressed = () => {
    dispatch(postChallengeRequest(userId, sectionInfo.id));
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
          <IconWrapper onPress={navigate.goBack}>{backArrowIcon}</IconWrapper>
          <IconWrapper onPress={onDeleteButtonPressed}>{trashIcon}</IconWrapper>
        </Header>
        <LeftContainer>
          <TitleContainer>
            <StyledText color="white" fontSize={30} fontWeight={700}>
              {sectionInfo.title}
            </StyledText>
          </TitleContainer>
          <StyledText color="white" fontSize={20}>
            Difficulty: {sectionInfo.difficulty}
          </StyledText>
          <TitleContainer>
            {historyIcon}
            <IconWrapper
              onPress={() =>
                navigate.navigate("History", {
                  sectionInfo,
                  backgroundColor,
                })
              }
            >
              <StyledText color="white" fontWeight={700} fontSize={24}>
                {` See history`}
              </StyledText>
            </IconWrapper>
          </TitleContainer>
          {!hasChallenge ? (
            <CreateChallengeButton onPress={onCreateChallengePressed}>
              <StyledText fontSize={15} fontWeight={700} color="black">
                CREATE CHALLENGE
              </StyledText>
            </CreateChallengeButton>
          ) : (
            <StyledText fontSize={20} fontWeight={700} color="forestgreen">
              CHALLENGE REQUEST ACTIVE
            </StyledText>
          )}
        </LeftContainer>
        <Center>
          <CurrentRecordingTimeContainer>
            <StyledText color="white" fontSize={28}>
              {recorderData.recording ? "Recording" : "Press record to begin"}
            </StyledText>
          </CurrentRecordingTimeContainer>
          <RecordButtonContainer onPress={onStartRecord}>
            {recordIcon}
            <StyledText color="black" fontWeight={700} fontSize={24}>
              RECORD
            </StyledText>
          </RecordButtonContainer>
          <StopButtonContainer onPress={onStopRecord}>
            {stopIcon}
            <StyledText color="white" fontWeight={700} fontSize={24}>
              STOP
            </StyledText>
          </StopButtonContainer>
          <SubmitButton
            isDisabled={submitIsDisabled}
            disabled={submitIsDisabled}
            onPress={onSubmitPressed}
          >
            <StyledText fontSize={24} fontWeight={700} color="black">
              SUBMIT
            </StyledText>
          </SubmitButton>
        </Center>
        <ScoreModal
          isUploading={recordingUploading}
          isVisible={scoreModalIsVisible}
          percentDifference={percentDifference}
          score={latestTry.score}
          closeModal={() => setScoreModalIsVisible(false)}
          loadingColor={backgroundColor}
        />
      </LinearGradient>
    </Container>
  );
};

export default Section;
