import React, { useEffect } from "react";
import styled from "styled-components/native";
import StyledText from "../../Components/UI/StyledText";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ScoresChart from "../../Components/Practice/ScoresChart";
import HistoryList from "../../Components/Practice/HistoryList";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import { getHistoryBySection } from "../../store/history/history.actions";
import {
  historySelector,
  historyLoadingSelector,
  bestScoreSelector,
} from "../../store/history/history.selectors";
const backArrowIcon = <Ionicons name="arrow-back" size={30} color="white" />;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px;
`;

const IconWrapper = styled.TouchableOpacity``;

const LeftContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  padding: 8px;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;

const BestScoreContainer = styled.View`
  width: 95%;
  height: 120px;
  padding: 8px;
  margin-top: 16px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
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

const History: React.FC<{ route: any }> = ({ route }) => {
  const { sectionInfo, backgroundColor } = route.params;
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const history = useSelector(historySelector);
  const historyLoading = useSelector(historyLoadingSelector);
  const bestScore = useSelector(bestScoreSelector);

  useEffect(() => {
    dispatch(getHistoryBySection(sectionInfo.id));
  }, []);

  let historyPage = (
    <SkeletonPlaceholder backgroundColor="#6f5656" speed={100}>
      <SkeletonPlaceholder.Item width={325} height={120} marginTop={48} />
      <SkeletonPlaceholder.Item width={325} height={220} marginTop={32} />
      <SkeletonPlaceholder.Item width={325} height={100} marginTop={16} />
      <SkeletonPlaceholder.Item width={325} height={100} marginTop={16} />
    </SkeletonPlaceholder>
  );

  if (!historyLoading) {
    historyPage = (
      <Scroll showsVerticalScrollIndicator={false}>
        <LeftContainer>
          <StyledText color="white" fontSize={30} fontWeight={700}>
            History
          </StyledText>
        </LeftContainer>
        {bestScore.score !== null ? (
          <Center>
            <BestScoreContainer>
              <StyledText color="white" fontSize={24} fontWeight={700}>
                Your best score
              </StyledText>
              <StyledText color="green" fontSize={28} fontWeight={700}>
                {bestScore.score} points
              </StyledText>
              <StyledText color="white" fontSize={20}>
                on {new Date(bestScore.date).getUTCDate()}{" "}
                {months[new Date(bestScore.date).getMonth()]} at{" "}
                {new Date(bestScore.date).getHours()}:
                {new Date(bestScore.date).getMinutes()}
              </StyledText>
            </BestScoreContainer>
          </Center>
        ) : (
          <LeftContainer>
            <StyledText color="salmon" fontSize={24} fontWeight={700}>
              You have no attempts on this section
            </StyledText>
          </LeftContainer>
        )}
        <LeftContainer>
          <StyledText color="white" fontSize={30} fontWeight={700}>
            Past attempts
          </StyledText>
        </LeftContainer>
        {history.length > 0 ? (
          <ScoresChart history={history} />
        ) : (
          <Center>
            <StyledText color="white" fontSize={20} fontWeight={700}>
              No data to display.
            </StyledText>
          </Center>
        )}
        <Center>
          <HistoryList history={history.slice(history.length - 6)} />
        </Center>
      </Scroll>
    );
  }

  return (
    <Container>
      <LinearGradient
        colors={[backgroundColor, "#000000"]}
        locations={[0, 0.5]}
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Header>
          <IconWrapper onPress={navigate.goBack}>{backArrowIcon}</IconWrapper>
        </Header>
        {historyPage}
      </LinearGradient>
    </Container>
  );
};

export default History;
