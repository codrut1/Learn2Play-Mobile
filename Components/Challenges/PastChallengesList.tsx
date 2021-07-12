import React from "react";
import styled from "styled-components/native";
import { ChallengeFullDetails } from "../../store/store";

import PastChallengeCard from "./PastChallengeCard";

const Container = styled.View`
  width: 100%;
`;

const PastChallengeCardWrapper = styled.View`
  margin: 6px 0;
`;

const PastChallengesList: React.FC<{
  challenges: ChallengeFullDetails[];
  userId: number;
}> = ({ challenges, userId }) => {
  return (
    <Container>
      {challenges.map((challenge: ChallengeFullDetails) => (
        <PastChallengeCardWrapper key={challenge.id}>
          <PastChallengeCard challenge={challenge} userId={userId} />
        </PastChallengeCardWrapper>
      ))}
    </Container>
  );
};

export default PastChallengesList;
