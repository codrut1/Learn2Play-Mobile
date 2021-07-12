import React from "react";
import styled from "styled-components/native";
import { ChallengeRequestModified } from "../../store/store";

import ChallengeRequestAvailableCard from "./ChallengeRequestAvailableCard";

const Container = styled.View`
  width: 100%;
`;

const ChallengeRequestAvailableCardWrapper = styled.View`
  margin: 6px 0;
`;

const ChallengeRequestAvailableList: React.FC<{
  challengeRequests: ChallengeRequestModified[];
  userId: number;
}> = ({ challengeRequests, userId }) => {
  return (
    <Container>
      {challengeRequests.map((request: ChallengeRequestModified) => (
        <ChallengeRequestAvailableCardWrapper key={request.id}>
          <ChallengeRequestAvailableCard request={request} userId={userId} />
        </ChallengeRequestAvailableCardWrapper>
      ))}
    </Container>
  );
};

export default ChallengeRequestAvailableList;
