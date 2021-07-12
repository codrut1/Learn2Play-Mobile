import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const graduationCapIcon = (
  <FontAwesome5 name="graduation-cap" color="white" size={30} />
);

const noteIcon = <Entypo name="note" color="white" size={20} />;
const scoreboardIcon = (
  <MaterialCommunityIcons name="scoreboard" color="white" size={20} />
);
const swordCrossIcon = (
  <MaterialCommunityIcons name="sword-cross" color="white" size={20} />
);

import { usernameSelector } from "../../store/user/user.selectors";
import {
  getChallengeRequestsByUser,
  getAllChallenges,
} from "../../store/challenges/challenges.actions";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TutorialContainer = styled.View`
  width: 97%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

const LeftmostContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const TutorialTextWrapper = styled.View`
  margin-left: 8px;
`;

const TipRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 8px 0;
`;

const Homescreen = () => {
  const username = useSelector(usernameSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChallengeRequestsByUser());
    dispatch(getAllChallenges());
  }, []);

  return (
    <Container>
      <LinearGradient
        colors={["#6f5656", "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          padding: 8,
        }}
      >
        <StyledText color="white" fontSize={36} fontWeight={700}>
          Welcome, {username}
        </StyledText>
        <Center>
          <TutorialContainer>
            <LeftmostContainer>
              {graduationCapIcon}
              <TutorialTextWrapper>
                <StyledText color="white" fontSize={30} fontWeight={700}>
                  Tutorial
                </StyledText>
              </TutorialTextWrapper>
            </LeftmostContainer>
            <TipRow>
              {noteIcon}
              <StyledText color="white" fontSize={20}>
                Use the "Practice" screen to upload your favourite songs and
                learn them section by section!
              </StyledText>
            </TipRow>
            <TipRow>
              {scoreboardIcon}
              <StyledText color="white" fontSize={20}>
                Get a score each time you record yourself playing the part! The
                LOWER the score, the more you improve!
              </StyledText>
            </TipRow>
            <TipRow>
              {swordCrossIcon}
              <StyledText color="white" fontSize={20}>
                Challenge other users to help each other improve your skills!
              </StyledText>
            </TipRow>
          </TutorialContainer>
        </Center>
      </LinearGradient>
    </Container>
  );
};

export default Homescreen;
