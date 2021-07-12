import React from "react";
import styled from "styled-components/native";
import Modal from "react-native-modal";
import StyledText from "../UI/StyledText";

const Container = styled.View`
  width: 90%;
  height: 40%;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const CloseModal = styled.TouchableOpacity`
  width: 80%;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ContentView = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.View``;

const Indicator = styled.ActivityIndicator``;

const ScoreModal: React.FC<{
  isUploading: boolean;
  score: number;
  percentDifference?: number;
  isVisible: boolean;
  closeModal: () => void;
  loadingColor: string;
}> = ({
  isUploading,
  score,
  percentDifference,
  isVisible,
  closeModal,
  loadingColor,
}) => {
  let scoreText = (
    <ContentView>
      <StyledText color="white" fontWeight={700} fontSize={24}>
        Score: {score}
      </StyledText>
      {percentDifference ? (
        <Wrapper>
          <StyledText
            color={percentDifference >= 0 ? "green" : "red"}
            fontSize={18}
            fontWeight={700}
          >
            {percentDifference < 0
              ? `You did ${percentDifference}% worse.`
              : `You did ${percentDifference}% better.`}
          </StyledText>
          <StyledText
            color={percentDifference >= 0 ? "green" : "red"}
            fontSize={18}
            fontWeight={700}
          >
            {percentDifference < 0 ? `Keep trying!` : `Good job!`}
          </StyledText>
        </Wrapper>
      ) : null}
    </ContentView>
  );

  let loading = (
    <ContentView>
      <Indicator size="large" color={loadingColor} />
      <StyledText color="white" fontSize={24} fontWeight={700}>
        Calculating...
      </StyledText>
    </ContentView>
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      style={{ alignItems: "center" }}
    >
      <Container>
        <StyledText color="white">
          {isUploading ? loading : scoreText}
        </StyledText>
        <CloseModal onPress={closeModal}>
          <StyledText fontSize={24} fontWeight={700} color="black">
            CLOSE
          </StyledText>
        </CloseModal>
      </Container>
    </Modal>
  );
};

export default ScoreModal;
