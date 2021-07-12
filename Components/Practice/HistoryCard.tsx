import React from "react";
import styled from "styled-components/native";
import { HistoryInformation } from "../../store/store";
import StyledText from "../UI/StyledText";

const Container = styled.View`
  width: 100%;
  height: 70px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
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

const HistoryCard: React.FC<{ attempt: HistoryInformation }> = ({
  attempt,
}) => {
  return (
    <Container>
      <StyledText color="white" fontWeight={700} fontSize={24}>
        Score: {attempt.score}
      </StyledText>
      <StyledText color="white" fontSize={20}>
        on {new Date(attempt.date).getUTCDate()}{" "}
        {months[new Date(attempt.date).getMonth()]} at{" "}
        {new Date(attempt.date).getHours()}:
        {new Date(attempt.date).getMinutes()}
      </StyledText>
    </Container>
  );
};

export default HistoryCard;
