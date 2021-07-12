import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { colorsFromUrl } from "react-native-dominant-color";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useDispatch, useSelector } from "react-redux";

import { getChallengeById } from "../../store/challenges/challenges.actions";
import {
  currentChallengeSelector,
  loadingSelector,
} from "../../store/challenges/challenges.selectors";
import { LogBox } from "react-native";

const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;
const plusIcon = <Ionicons name="add" size={30} color="black" />;

const Container = styled.View`
  flex: 1;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  padding: 8px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.TouchableOpacity``;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const CoverImage = styled.Image`
  margin-top: 32px;
  width: 150px;
  height: 150px;
`;

const TextWrapper = styled.View`
  margin-top: 16px;
`;

const SmallerTextWrapper = styled.View`
  margin-top: 4px;
`;

const ContenderInformationContainer = styled.View`
  width: 95%;
  height: 130px;
  background-color: #242424;
  margin-top: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ChallengerPersonalInfoContainer = styled.View`
  width: 30%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;

const ChallengeProgressInfoContainer = styled.View`
  width: 70%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  padding: 4px;
`;

const ChallengeProgressUpperContainer = styled.View`
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 4px;
`;

const ChallengeProgressLowerContainer = styled.View`
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

const StatContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const VersusTextWrapper = styled.View`
  margin-top: 8px;
`;

const AddAttemptButton = styled.TouchableOpacity`
  width: 150px;
  height: 45px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding-right: 10px;
  margin-top: 16px;
  margin-bottom: 10px;
`;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

LogBox.ignoreLogs(["source.uri"]);

const ChallengeFull: React.FC<{ route: any }> = ({ route }) => {
  const [dominantColor, setDominantColor] = useState<string>("#6f5656");
  const [currentLeader, setCurrentLeader] = useState<string>("Tie");

  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { challengeId, songCover, userId } = route.params;

  const currentChallenge = useSelector(currentChallengeSelector);
  const isLoading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(getChallengeById(challengeId));
    colorsFromUrl(songCover, (err: any, colors: any) => {
      if (!err) {
        setDominantColor(colors.averageColor);
      }
    });
  }, []);

  useEffect(() => {
    if (
      currentChallenge.challengerBestScore <
      currentChallenge.challengedBestScore
    ) {
      setCurrentLeader(currentChallenge.challenger.username);
    } else if (
      currentChallenge.challengerBestScore >
      currentChallenge.challengedBestScore
    ) {
      setCurrentLeader(currentChallenge.challenged.username);
    } else {
      setCurrentLeader("Tie");
    }
  }, [currentChallenge]);

  return (
    <Container>
      <LinearGradient
        colors={[dominantColor, "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Header>
          <IconWrapper onPress={navigate.goBack}>{backArrowIcon}</IconWrapper>
        </Header>
        {isLoading ? (
          <StyledText color="white">Loading...</StyledText>
        ) : (
          <Scroll showsVerticalScrollIndicator={false}>
            <Center>
              <CoverImage source={{ uri: currentChallenge.songCover }} />
              <TextWrapper>
                <StyledText color="white" fontSize={24} fontWeight={700}>
                  {currentChallenge.songTitle}
                </StyledText>
              </TextWrapper>
              <TextWrapper>
                <StyledText color="white" fontSize={14}>
                  Song by {currentChallenge.songArtist} on{" "}
                  {currentChallenge.songAlbum}
                </StyledText>
              </TextWrapper>
              <SmallerTextWrapper>
                <StyledText color="white" fontSize={24} fontWeight={700}>
                  {currentChallenge.sectionTitle}
                </StyledText>
              </SmallerTextWrapper>
              <SmallerTextWrapper>
                <StyledText color="white" fontSize={24} fontWeight={700}>
                  Ends on {new Date(currentChallenge.finishDate).getUTCDate()}{" "}
                  {months[new Date(currentChallenge.finishDate).getMonth()]} at{" "}
                  {new Date(currentChallenge.finishDate).getHours()}:
                  {new Date(currentChallenge.finishDate).getMinutes()}
                </StyledText>
              </SmallerTextWrapper>
              <AddAttemptButton
                onPress={() =>
                  navigate.navigate("AddAttempt", {
                    bgColor: dominantColor,
                    sectionId: currentChallenge.sectionId,
                    currentChallenge: currentChallenge,
                    userId,
                  })
                }
              >
                {plusIcon}
                <StyledText color="black" fontWeight={700} fontSize={20}>
                  Add Attempt
                </StyledText>
              </AddAttemptButton>
              <ContenderInformationContainer elevation={5}>
                <ChallengerPersonalInfoContainer>
                  <ProfileImage
                    source={{ uri: currentChallenge.challenger.profilePic }}
                    resizeMode="cover"
                  />
                  <StyledText
                    color={
                      currentChallenge.challenger.id === userId
                        ? "forestgreen"
                        : "salmon"
                    }
                    fontSize={18}
                    fontWeight={700}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {currentChallenge.challenger.username}
                  </StyledText>
                </ChallengerPersonalInfoContainer>
                <ChallengeProgressInfoContainer>
                  <ChallengeProgressUpperContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Best score
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {currentChallenge.challengerBestScore}
                      </StyledText>
                    </StatContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Attempts
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {currentChallenge.challengerAttemptsNumber}
                      </StyledText>
                    </StatContainer>
                  </ChallengeProgressUpperContainer>
                  <ChallengeProgressLowerContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Last Attempt Date
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {new Date(
                          currentChallenge.challengerLastAttemptDate
                        ).getUTCDate()}{" "}
                        {
                          months[
                            new Date(
                              currentChallenge.challengerLastAttemptDate
                            ).getMonth()
                          ]
                        }{" "}
                        at{" "}
                        {new Date(
                          currentChallenge.challengerLastAttemptDate
                        ).getHours()}
                        :
                        {new Date(
                          currentChallenge.challengerLastAttemptDate
                        ).getMinutes()}
                      </StyledText>
                    </StatContainer>
                  </ChallengeProgressLowerContainer>
                </ChallengeProgressInfoContainer>
              </ContenderInformationContainer>
              <VersusTextWrapper>
                <StyledText color="white" fontWeight={700} fontSize={30}>
                  VS
                </StyledText>
              </VersusTextWrapper>
              <ContenderInformationContainer elevation={5}>
                <ChallengerPersonalInfoContainer>
                  <ProfileImage
                    source={{ uri: currentChallenge.challenged.profilePic }}
                    resizeMode="cover"
                  />
                  <StyledText
                    color={
                      currentChallenge.challenged.id === userId
                        ? "forestgreen"
                        : "salmon"
                    }
                    fontSize={18}
                    fontWeight={700}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {currentChallenge.challenged.username}
                  </StyledText>
                </ChallengerPersonalInfoContainer>
                <ChallengeProgressInfoContainer>
                  <ChallengeProgressUpperContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Best score
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {currentChallenge.challengedBestScore}
                      </StyledText>
                    </StatContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Attempts
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {currentChallenge.challengedAttemptsNumber}
                      </StyledText>
                    </StatContainer>
                  </ChallengeProgressUpperContainer>
                  <ChallengeProgressLowerContainer>
                    <StatContainer>
                      <StyledText color="white" fontSize={16} fontWeight={700}>
                        Last Attempt Date
                      </StyledText>
                      <StyledText color="white" fontSize={16}>
                        {new Date(
                          currentChallenge.challengedLastAttemptDate
                        ).getUTCDate()}{" "}
                        {
                          months[
                            new Date(
                              currentChallenge.challengedLastAttemptDate
                            ).getMonth()
                          ]
                        }{" "}
                        at{" "}
                        {new Date(
                          currentChallenge.challengedLastAttemptDate
                        ).getHours()}
                        :
                        {new Date(
                          currentChallenge.challengedLastAttemptDate
                        ).getMinutes()}
                      </StyledText>
                    </StatContainer>
                  </ChallengeProgressLowerContainer>
                </ChallengeProgressInfoContainer>
              </ContenderInformationContainer>
              <TextWrapper>
                <StyledText color="white" fontSize={30} fontWeight={700}>
                  {currentLeader === "Tie"
                    ? "No one is leading"
                    : `Leader: ${currentLeader}`}
                </StyledText>
              </TextWrapper>
            </Center>
          </Scroll>
        )}
      </LinearGradient>
    </Container>
  );
};

export default ChallengeFull;
