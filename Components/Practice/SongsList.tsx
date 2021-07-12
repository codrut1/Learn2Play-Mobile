import React from "react";
import styled from "styled-components/native";
import { SongInformation } from "../../store/store";

import SongCard from "./SongCard";

const Container = styled.View`
  width: 100%;
`;

const SongCardWrapper = styled.View`
  margin: 16px 0;
`;

const SongsList: React.FC<{ songs: SongInformation[] }> = ({ songs }) => {
  return (
    <Container>
      {songs.map((song: SongInformation) => (
        <SongCardWrapper key={song.id}>
          <SongCard song={song} />
        </SongCardWrapper>
      ))}
    </Container>
  );
};

export default SongsList;
