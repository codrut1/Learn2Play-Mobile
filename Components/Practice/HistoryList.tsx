import React from "react";
import styled from "styled-components/native";
import { HistoryInformation } from "../../store/store";

import HistoryCard from "./HistoryCard";

const Container = styled.View`
  width: 95%;
`;

const HistoryCardWrapper = styled.View`
  margin: 12px 0;
`;

const HistoryList: React.FC<{ history: HistoryInformation[] }> = ({
  history,
}) => {
  return (
    <Container>
      {history.map((attempt: HistoryInformation) => (
        <HistoryCardWrapper key={attempt.id}>
          <HistoryCard attempt={attempt} />
        </HistoryCardWrapper>
      ))}
    </Container>
  );
};

export default HistoryList;
