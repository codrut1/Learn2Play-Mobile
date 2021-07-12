import { useNavigation } from "@react-navigation/core";
import React from "react";
import styled from "styled-components/native";
import { SongInformation } from "../../store/store";
import StyledText from "../UI/StyledText";

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.5);
  flex-direction: row;
  align-items: center;
`;

const CoverImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const SongInformationContainer = styled.View`
  padding: 8px;
  height: 100%;
  width: 71%;
  justify-content: flex-start;
`;

const AlbumWrapper = styled.View``;

const ArtistWrapper = styled.View``;

const SongCard: React.FC<{ song: SongInformation }> = ({ song }) => {
  const navigate = useNavigation();

  return (
    <Container
      onPress={() =>
        navigate.navigate("Song", {
          id: song.id,
          title: song.title,
          artist: song.artist,
          album: song.album,
          coverImage: song.cover,
        })
      }
    >
      <CoverImage source={{ uri: song.cover }} resizeMode="contain" />
      <SongInformationContainer>
        <StyledText
          color="white"
          fontWeight={700}
          fontSize={18}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {song.title}
        </StyledText>
        <AlbumWrapper>
          <StyledText color="white" numberOfLines={1} ellipsizeMode="tail">
            {song.album}
          </StyledText>
        </AlbumWrapper>
        <ArtistWrapper>
          <StyledText
            color="white"
            numberOfLines={1}
            ellipsizeMode="tail"
            fontWeight={700}
          >
            {song.artist}
          </StyledText>
        </ArtistWrapper>
      </SongInformationContainer>
    </Container>
  );
};

export default SongCard;
