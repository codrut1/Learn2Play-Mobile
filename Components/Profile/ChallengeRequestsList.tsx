import React from "react";
import styled from "styled-components/native";
import { ChallengeRequestModified } from "../../store/store";

import ChallengeRequestCard from "./ChallengeRequestCard";

const Container = styled.ScrollView`
  width: 100%;
  height: 230px;
`;

const ChallengeRequestCardWrapper = styled.View`
  margin: 6px 0;
`;

const ChallengeRequestList: React.FC<{
  challengeRequests: ChallengeRequestModified[];
}> = ({ challengeRequests }) => {
  return (
    <Container showsVerticalScrollIndicator={false}>
      {challengeRequests.map((request: ChallengeRequestModified) => (
        <ChallengeRequestCardWrapper key={request.id}>
          <ChallengeRequestCard request={request} />
        </ChallengeRequestCardWrapper>
      ))}
    </Container>
  );
};

export default ChallengeRequestList;
