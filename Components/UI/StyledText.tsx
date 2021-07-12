import React from "react";
import styled from "styled-components/native";

const Text = styled.Text<{
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
}>`
  color: ${({ color }) => (color ? color : "black")};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : "Roboto")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "400")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "16")}px;
`;

const StyledText: React.FC<{
  children?: React.ReactNode;
  color?: string;
  fontFamily?: string;
  fontWeight?: number;
  fontSize?: number;
  numberOfLines?: number;
  ellipsizeMode?: string;
}> = ({
  children,
  color,
  fontSize,
  fontWeight,
  fontFamily,
  numberOfLines,
  ellipsizeMode,
}) => {
  return (
    <Text
      color={color}
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
};

export default StyledText;
