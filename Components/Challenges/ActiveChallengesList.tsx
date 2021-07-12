import React from "react";
import styled from "styled-components/native";
import { ChallengeFullDetails } from "../../store/store";

import ActiveChallengeCard from "./ActiveChallengeCard";

const Container = styled.View`
  width: 100%;
`;

const ActiveChallengeCardWrapper = styled.View`
  margin: 6px 0;
`;

const ActiveChallengesList: React.FC<{
  challenges: ChallengeFullDetails[];
  userId: number;
}> = ({ challenges, userId }) => {
  return (
    <Container>
      {challenges.map((challenge: ChallengeFullDetails) => (
        <ActiveChallengeCardWrapper key={challenge.id}>
          <ActiveChallengeCard challenge={challenge} userId={userId} />
        </ActiveChallengeCardWrapper>
      ))}
    </Container>
  );
};

export default ActiveChallengesList;
