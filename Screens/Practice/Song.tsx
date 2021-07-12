import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { colorsFromUrl } from "react-native-dominant-color";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;
const trashIcon = <Ionicons name="trash-outline" size={30} color="white" />;
const plusIcon = <Ionicons name="add" size={30} color="black" />;

import { deleteSong } from "../../store/songs/songs.actions";
import { getSectionsBySong } from "../../store/sections/sections.actions";
import {
  sectionsSelector,
  sectionsLoadingSelector,
} from "../../store/sections/sections.selectors";
import { useDispatch, useSelector } from "react-redux";
import SectionList from "../../Components/Practice/SectionList";

const Container = styled.View`
  flex: 1;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const Header = styled.View`
  padding: 8px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
`;

const CoverImage = styled.Image`
  margin-top: 32px;
  width: 150px;
  height: 150px;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const TextWrapper = styled.View`
  margin-top: 16px;
`;

const IconWrapper = styled.TouchableOpacity``;

const AddSectionButton = styled.TouchableOpacity`
  width: 150px;
  height: 45px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding-right: 10px;
  margin-top: 16px;
`;

const MessageContainer = styled.View`
  margin-top: 250px;
  width: 100%;
  align-items: center;
`;

const Song: React.FC<{ route: any }> = ({ route }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { id, title, artist, album, coverImage } = route.params;

  const [dominantColor, setDominantColor] = useState<string>("#6f5656");

  const sections = useSelector(sectionsSelector);
  const sectionsLoading = useSelector(sectionsLoadingSelector);

  useEffect(() => {
    dispatch(getSectionsBySong(id));
    colorsFromUrl(coverImage, (err: any, colors: any) => {
      if (!err) {
        setDominantColor(colors.averageColor);
      }
    });
  }, []);

  let sectionsList = (
    <SkeletonPlaceholder backgroundColor="#6f5656" speed={100}>
      <SkeletonPlaceholder.Item width={300} height={70} marginTop={12} />
      <SkeletonPlaceholder.Item width={300} height={70} marginTop={12} />
      <SkeletonPlaceholder.Item width={300} height={70} marginTop={12} />
    </SkeletonPlaceholder>
  );
  if (!sectionsLoading) {
    sectionsList = !sections.length ? (
      <MessageContainer>
        <StyledText color="white" fontSize={24} fontWeight={700}>
          Looks like you don't have any sections yet.
        </StyledText>
      </MessageContainer>
    ) : (
      <SectionList sections={sections} backgroundColor={dominantColor} />
    );
  }

  const onDeleteButtonPressed = () => {
    dispatch(deleteSong(id));
    navigate.goBack();
  };

  return (
    <Container>
      <LinearGradient
        colors={[dominantColor, "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Header>
          <IconWrapper onPress={navigate.goBack}>{backArrowIcon}</IconWrapper>
          <IconWrapper onPress={onDeleteButtonPressed}>{trashIcon}</IconWrapper>
        </Header>
        <Scroll showsVerticalScrollIndicator={false}>
          <Center>
            <CoverImage source={{ uri: coverImage }} />
            <TextWrapper>
              <StyledText color="white" fontSize={24} fontWeight={700}>
                {title}
              </StyledText>
            </TextWrapper>
            <TextWrapper>
              <StyledText color="white" fontSize={14}>
                Song by {artist} on {album}
              </StyledText>
            </TextWrapper>
            <AddSectionButton
              onPress={() =>
                navigate.navigate("AddSection", {
                  backgroundColor: dominantColor,
                  id,
                })
              }
            >
              {plusIcon}
              <StyledText color="black" fontWeight={700} fontSize={20}>
                Add Section
              </StyledText>
            </AddSectionButton>
            {sectionsList}
          </Center>
        </Scroll>
      </LinearGradient>
    </Container>
  );
};

export default Song;
