import React from "react";
import styled from "styled-components/native";
import { SectionInformation } from "../../store/store";

import SectionCard from "./SectionCard";

const Container = styled.View`
  width: 95%;
`;

const SectionCardWrapper = styled.View`
  margin: 12px 0;
`;

const SectionsList: React.FC<{
  sections: SectionInformation[];
  backgroundColor: string;
}> = ({ sections, backgroundColor }) => {
  return (
    <Container>
      {sections.map((section: SectionInformation) => (
        <SectionCardWrapper key={section.id}>
          <SectionCard section={section} backgroundColor={backgroundColor} />
        </SectionCardWrapper>
      ))}
    </Container>
  );
};

export default SectionsList;
