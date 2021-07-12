import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ScoreModal from "../../Components/Practice/ScoreModal";
import { useNavigation } from "@react-navigation/core";
import RNFS from "react-native-fs";
import Sound from "react-native-sound";

import AudioRecord from "react-native-audio-record";
import { useDispatch, useSelector } from "react-redux";
import { PermissionsAndroid, Platform } from "react-native";

import { uploadChallengeRecording } from "../../store/challenges/challenges.actions";
import {
  uploadingRecordingSelector,
  latestScoreSelector,
} from "../../store/challenges/challenges.selectors";

const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;
const recordIcon = (
  <MaterialCommunityIcons name="record" size={40} color="black" />
);
const stopIcon = <Ionicons name="stop" size={30} color="white" />;
const playIcon = <Ionicons name="play" size={30} color="black" />;

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
  margin-right: 100px;
`;

const IconWrapper = styled.TouchableOpacity``;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const CurrentRecordingTimeContainer = styled.View`
  margin-top: 16px;
`;

const RecordButtonContainer = styled.TouchableOpacity`
  width: 150px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.8);
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

const PlayButtonContainer = styled.TouchableOpacity<{ isDisabled?: boolean }>`
  width: 150px;
  height: 60px;
  background-color: ${({ isDisabled }) =>
    isDisabled === true
      ? "rgba(255, 255, 255, 0.5)"
      : "rgba(255, 255, 255, 0.8)"};
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 30px;
  padding-right: 10px;
  margin-top: 30px;
`;

const PlaybackTitleContainer = styled.View`
  margin-top: 32px;
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
  margin-top: 165px;
`;

const AddAttempt: React.FC<{ route: any }> = ({ route }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const { bgColor, sectionId, currentChallenge, userId } = route.params;

  const uploadingRecording = useSelector(uploadingRecordingSelector);
  const latestScore = useSelector(latestScoreSelector);

  const [recorderData, setRecorderData] = useState<any>({
    audioFile: "",
    recording: false,
  });
  const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(true);
  const [scoreModalIsVisible, setScoreModalIsVisible] = useState<boolean>(
    false
  );

  useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: `${sectionId}.wav`,
    };

    requestPermission();
    AudioRecord.init(options);

    Sound.setCategory("Playback");
  }, []);

  useEffect(() => {
    if (recorderData.audioFile !== "") {
      setSubmitIsDisabled(false);
    } else {
      setSubmitIsDisabled(true);
    }
  }, [recorderData.audioFile]);

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

  const onStartRecord = async () => {
    setRecorderData({ ...recorderData, audioFile: "", recording: true });
    AudioRecord.start();
  };

  const onStopRecord = async () => {
    if (!recorderData.recording) return;
    let audioFile = await AudioRecord.stop();
    setRecorderData({ ...recorderData, audioFile, recording: false });
  };

  const onStartPlayback = () => {
    let sound = new Sound(recorderData.audioFile, "", (e) => {
      if (e) {
        console.warn(e);
        return;
      }

      console.log("loaded successfully");

      sound.play();
    });
  };

  const onSubmitPressed = async () => {
    await RNFS.moveFile(
      recorderData.audioFile,
      `${RNFS.ExternalStorageDirectoryPath}/${sectionId}.wav`
    );
    dispatch(
      uploadChallengeRecording(
        sectionId,
        `${RNFS.ExternalStorageDirectoryPath}/${sectionId}.wav`,
        currentChallenge.challenger.id === userId,
        currentChallenge.challengerAttemptsNumber,
        currentChallenge.challengedAttemptsNumber,
        currentChallenge.id,
        currentChallenge.challengerBestScore,
        currentChallenge.challengedBestScore,
        currentChallenge.challenger.id,
        currentChallenge.challenged.id
      )
    );
    setScoreModalIsVisible(true);
  };

  return (
    <Container>
      <LinearGradient
        colors={[bgColor, "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Header>
          <IconWrapper onPress={navigate.goBack}>{backArrowIcon}</IconWrapper>
          <TitleContainer>
            <StyledText fontSize={24} color="white" fontWeight={700}>
              Add Attempt
            </StyledText>
          </TitleContainer>
        </Header>
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
          <PlaybackTitleContainer>
            <StyledText color="white" fontSize={28}>
              Listen to your recording
            </StyledText>
          </PlaybackTitleContainer>
          <PlayButtonContainer
            onPress={onStartPlayback}
            isDisabled={submitIsDisabled}
            disabled={submitIsDisabled}
          >
            {playIcon}
            <StyledText color="black" fontWeight={700} fontSize={24}>
              PLAY
            </StyledText>
          </PlayButtonContainer>
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
          isUploading={uploadingRecording}
          isVisible={scoreModalIsVisible}
          score={latestScore}
          closeModal={() => setScoreModalIsVisible(false)}
          loadingColor={bgColor}
        />
      </LinearGradient>
    </Container>
  );
};

export default AddAttempt;
