import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { HistoryInformation } from "../../store/store";
import styled from "styled-components/native";
import StyledText from "../UI/StyledText";

const Spinner = styled.ActivityIndicator``;

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const ScoresChart: React.FC<{ history: HistoryInformation[] }> = ({
  history,
}) => {
  const [data, setData] = useState<{ labels: string[]; datasets: any }>({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const tempHistory = history.slice(history.length - 10);
    const tempDatasets = tempHistory.map(
      (tempHistory: HistoryInformation) => tempHistory.score
    );
    const finalDatasets = [{ data: [...tempDatasets] }];
    setData({
      ...data,
      datasets: finalDatasets,
    });
  }, []);

  return data.datasets[0].data.length > 0 ? (
    <LineChart
      width={Dimensions.get("window").width * 0.95}
      height={220}
      data={data}
      chartConfig={{
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      }}
      bezier
    />
  ) : (
    <Spinner size={30} color="white" />
  );
};

export default ScoresChart;
