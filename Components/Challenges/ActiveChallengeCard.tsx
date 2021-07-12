import React from "react";
import styled from "styled-components/native";
import { ChallengeFullDetails } from "../../store/store";
import StyledText from "../UI/StyledText";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/core";

const dateIcon = <MaterialIcons name="date-range" color="white" size={18} />;
const skullIcon = <FontAwesome5 name="skull" color="salmon" size={18} />;

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 130px;
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
  width: 250px;
  height: 100%;
  padding: 4px;
`;

const CenteredRow = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30px;
  width: 100%;
`;

const FoeNameWrapper = styled.View`
  margin-left: 4px;
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

const ActiveChallengeCard: React.FC<{
  challenge: ChallengeFullDetails;
  userId: number;
}> = ({ challenge, userId }) => {
  const navigate = useNavigation();

  return (
    <Container
      onPress={() =>
        navigate.navigate("ChallengeFull", {
          challengeId: challenge.id,
          songCover: challenge.songCover,
          userId,
        })
      }
    >
      <ImageContainer>
        <SongImage source={{ uri: challenge.songCover }} />
      </ImageContainer>
      <InformationContainer>
        <StyledText
          color="white"
          fontSize={18}
          fontWeight={700}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {challenge.songTitle}
        </StyledText>
        <StyledText
          color="white"
          fontSize={18}
          fontWeight={700}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {challenge.sectionTitle}
        </StyledText>
        <CenteredRow>
          {dateIcon}
          <StyledText
            color="white"
            fontSize={18}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Ends: {new Date(challenge.finishDate).getUTCDate()}{" "}
            {months[new Date(challenge.finishDate).getMonth()]}
          </StyledText>
        </CenteredRow>
        <CenteredRow>
          {skullIcon}
          <FoeNameWrapper>
            <StyledText
              color="salmon"
              fontSize={18}
              fontWeight={700}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {userId === challenge.challenged.id
                ? challenge.challenger.username
                : challenge.challenged.username}
            </StyledText>
          </FoeNameWrapper>
        </CenteredRow>
      </InformationContainer>
    </Container>
  );
};

export default ActiveChallengeCard;
