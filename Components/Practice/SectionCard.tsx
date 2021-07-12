import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import { SectionInformation } from "../../store/store";
import StyledText from "../UI/StyledText";
import Ionicons from "react-native-vector-icons/Ionicons";

const musicalNoteIcon = (
  <Ionicons name="musical-note" size={30} color="white" />
);

const Container = styled.TouchableOpacity`
  padding: 8px;
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.View`
  width: 50%;
`;

const DifficultyWrapper = styled.View`
  width: 50%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const NoteWrapper = styled.View``;

const SectionCard: React.FC<{
  section: SectionInformation;
  backgroundColor: string;
}> = ({ section, backgroundColor }) => {
  const navigate = useNavigation();

  const difficultyLevel = [];
  switch (section.difficulty) {
    case "Easy":
      difficultyLevel.push(1);
      break;
    case "Medium":
      difficultyLevel.push(1);
      difficultyLevel.push(2);
      break;
    case "Hard":
      difficultyLevel.push(1);
      difficultyLevel.push(2);
      difficultyLevel.push(3);
      break;
  }

  return (
    <Container
      onPress={() =>
        navigate.navigate("Section", {
          sectionInfo: section,
          backgroundColor,
        })
      }
    >
      <TitleWrapper>
        <StyledText
          color="white"
          fontWeight={700}
          fontSize={20}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {section.title}
        </StyledText>
      </TitleWrapper>
      <DifficultyWrapper>
        {difficultyLevel.map((id: number) => (
          <NoteWrapper key={id}>{musicalNoteIcon}</NoteWrapper>
        ))}
      </DifficultyWrapper>
    </Container>
  );
};

export default SectionCard;
