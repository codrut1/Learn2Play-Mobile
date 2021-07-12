import React from "react";
import styled from "styled-components/native";
import { ChallengeRequestModified } from "../../store/store";
import StyledText from "../UI/StyledText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";

import { deleteChallengeRequest } from "../../store/challenges/challenges.actions";

const dateIcon = <MaterialIcons name="date-range" color="white" size={18} />;
const closeIcon = <MaterialIcons name="close" color="white" size={30} />;

const Container = styled.View`
  width: 100%;
  height: 100px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.3);
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SongImage = styled.Image`
  width: 75px;
  height: 75px;
`;

const ImageContainer = styled.View`
  width: 80px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const InformationContainer = styled.View`
  width: 200px;
  height: 100%;
  padding: 4px;
`;

const CenteredRow = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: 100%;
`;

const IconContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.TouchableOpacity``;

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

const ChallengeRequestCard: React.FC<{ request: ChallengeRequestModified }> = ({
  request,
}) => {
  const dispatch = useDispatch();

  const onDeleteChallengeRequestPressed = () => {
    dispatch(deleteChallengeRequest(request.id));
  };

  return (
    <Container>
      <ImageContainer>
        <SongImage source={{ uri: request.songImage }} />
      </ImageContainer>
      <InformationContainer>
        <StyledText
          color="white"
          fontSize={18}
          fontWeight={700}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {request.songTitle}
        </StyledText>
        <StyledText
          color="white"
          fontSize={18}
          fontWeight={700}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {request.sectionTitle}
        </StyledText>
        <CenteredRow>
          {dateIcon}
          <StyledText
            color="white"
            fontSize={18}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {new Date(request.dateCreated).getUTCDate()}{" "}
            {months[new Date(request.dateCreated).getMonth()]}
          </StyledText>
        </CenteredRow>
      </InformationContainer>
      <IconContainer>
        <IconWrapper onPress={onDeleteChallengeRequestPressed}>
          {closeIcon}
        </IconWrapper>
      </IconContainer>
    </Container>
  );
};

export default ChallengeRequestCard;
