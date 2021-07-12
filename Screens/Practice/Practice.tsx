import React, { useEffect } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import SongsList from "../../Components/Practice/SongsList";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { getUserSongs } from "../../store/songs/songs.actions";
import {
  songsSelector,
  songsLoadingSelector,
} from "../../store/songs/songs.selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const AddSongButton = styled.TouchableOpacity`
  width: 133px;
  height: 45px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  padding-right: 10px;
`;

const MessageContainer = styled.View`
  margin-top: 250px;
  width: 100%;
  align-items: center;
`;

const plusIcon = <Ionicons name="add" size={30} color="white" />;

const Practice = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const songs = useSelector(songsSelector);
  const songsLoading = useSelector(songsLoadingSelector);

  useEffect(() => {
    dispatch(getUserSongs());
  }, []);

  let songsList = (
    <SkeletonPlaceholder backgroundColor="#6f5656" speed={100}>
      <SkeletonPlaceholder.Item width={400} height={100} marginTop={16} />
      <SkeletonPlaceholder.Item width={400} height={100} marginTop={16} />
      <SkeletonPlaceholder.Item width={400} height={100} marginTop={16} />
    </SkeletonPlaceholder>
  );
  if (!songsLoading) {
    songsList =
      songs === undefined || !songs.length ? (
        <MessageContainer>
          <StyledText color="white" fontSize={24} fontWeight={700}>
            Looks like you don't have any songs yet.
          </StyledText>
        </MessageContainer>
      ) : (
        <SongsList songs={songs} />
      );
  }

  return (
    <Container>
      <LinearGradient
        colors={["#6f5656", "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          padding: 8,
        }}
      >
        <Scroll showsVerticalScrollIndicator={false}>
          <StyledText fontSize={36} color="white" fontWeight={700}>
            Practice
          </StyledText>
          <AddSongButton onPress={() => navigate.push("AddSong")}>
            {plusIcon}
            <StyledText color="white" fontWeight={700} fontSize={20}>
              Add Song
            </StyledText>
          </AddSongButton>
          {songsList}
        </Scroll>
      </LinearGradient>
    </Container>
  );
};

export default Practice;
