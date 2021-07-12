import React, { useEffect } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import ChallengeRequestListAvailable from "../../Components/Challenges/ChallengeRequestListAvailable";
import ActiveChallengesList from "../../Components/Challenges/ActiveChallengesList";
import PastChallengesList from "../../Components/Challenges/PastChallengesList";

import {
  challengeRequestsSelector,
  challengesSelector,
} from "../../store/challenges/challenges.selectors";
import { idSelector } from "../../store/user/user.selectors";
import {
  ChallengeFullDetails,
  ChallengeRequestModified,
} from "../../store/store";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const WarningTextWrapper = styled.View`
  margin-top: 16px;
`;

const Challenges = () => {
  const userId = useSelector(idSelector);
  const challengeRequests = useSelector(challengeRequestsSelector);
  const challenges = useSelector(challengesSelector);

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
        <Scroll showsVerticalScrollIndicator={false}>
          <StyledText fontSize={36} color="white" fontWeight={700}>
            Challenges
          </StyledText>
          <StyledText fontSize={24} color="white" fontWeight={700}>
            Available challenge requests
          </StyledText>
          <Center>
            {challengeRequests.filter(
              (req: ChallengeRequestModified) =>
                req.owner !== userId &&
                challenges.find(
                  (ch: ChallengeFullDetails) =>
                    ch.sectionId === req.section &&
                    (ch.challenged.id === userId || ch.challenger.id === userId)
                ) === undefined
            ).length > 0 ? (
              <ChallengeRequestListAvailable
                challengeRequests={challengeRequests.filter(
                  (req: ChallengeRequestModified) =>
                    req.owner !== userId &&
                    challenges.find(
                      (ch: ChallengeFullDetails) =>
                        ch.sectionId === req.section &&
                        (ch.challenged.id === userId ||
                          ch.challenger.id === userId)
                    ) === undefined
                )}
                userId={userId}
              />
            ) : (
              <WarningTextWrapper>
                <StyledText color="salmon" fontSize={20} fontWeight={700}>
                  There are no available challenge requests
                </StyledText>
              </WarningTextWrapper>
            )}
          </Center>
          <StyledText fontSize={24} color="white" fontWeight={700}>
            Active challenges
          </StyledText>
          <Center>
            {challenges.find(
              (challenge: ChallengeFullDetails) =>
                (challenge.challenger.id === userId ||
                  challenge.challenged.id === userId) &&
                !challenge.isFinished
            ) !== undefined ? (
              <ActiveChallengesList
                userId={userId}
                challenges={challenges.filter(
                  (challenge: ChallengeFullDetails) =>
                    (challenge.challenged.id === userId ||
                      challenge.challenger.id === userId) &&
                    !challenge.isFinished
                )}
              />
            ) : (
              <WarningTextWrapper>
                <StyledText color="salmon" fontSize={20} fontWeight={700}>
                  You don't have any active challenges
                </StyledText>
              </WarningTextWrapper>
            )}
          </Center>
          <StyledText fontSize={24} color="white" fontWeight={700}>
            Past challenges
          </StyledText>
          <Center>
            {challenges.find(
              (challenge: ChallengeFullDetails) =>
                (challenge.challenger.id === userId ||
                  challenge.challenged.id === userId) &&
                challenge.isFinished
            ) !== undefined ? (
              <PastChallengesList
                userId={userId}
                challenges={challenges.filter(
                  (challenge: ChallengeFullDetails) =>
                    (challenge.challenged.id === userId ||
                      challenge.challenger.id === userId) &&
                    challenge.isFinished
                )}
              />
            ) : (
              <WarningTextWrapper>
                <StyledText color="salmon" fontSize={20} fontWeight={700}>
                  You don't have any active challenges
                </StyledText>
              </WarningTextWrapper>
            )}
          </Center>
        </Scroll>
      </LinearGradient>
    </Container>
  );
};

export default Challenges;
