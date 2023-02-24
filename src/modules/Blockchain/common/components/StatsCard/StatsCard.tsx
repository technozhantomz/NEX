import { ScriptableContext } from "chart.js";
import counterpart from "counterpart";
import { Line } from "react-chartjs-2";

import { useAssetsContext } from "../../../../../common/providers";

import * as Styled from "./StatsCard.styled";

type Props = {
  isRewardCard?: boolean;
  isTimeCard?: boolean;
  statsData?: number[];
  noData: boolean;
  title: string;
  data: string | JSX.Element;
};

export const StatsCard = ({
  isRewardCard = false,
  isTimeCard = false,
  statsData,
  noData,
  title,
  data,
}: Props): JSX.Element => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const labels = statsData?.map((_stat, index) => `${index}`);
  const chartData = () => {
    return {
      labels,
      datasets: [
        {
          pointRadius: 0,
          fill: true,
          label: "",
          data: statsData,
          borderWidth: 1,
          borderColor: "#FF6CB3",
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 35);
            gradient.addColorStop(0, "#FF6CB3");
            gradient.addColorStop(1, "#ffffff");
            return gradient;
          },
        },
      ],
    };
  };

  const { defaultAsset } = useAssetsContext();

  return (
    <Styled.StatsCard className={noData ? "no-data stats-card" : "stats-card"}>
      <Styled.StatsCardHeading>{title}</Styled.StatsCardHeading>
      <Styled.StatsCardValue>
        {noData ? counterpart.translate(`pages.blocks.no_data`) : data}
        {isTimeCard && !noData ? <span> seconds</span> : ""}
        {isRewardCard && !noData ? <span> {defaultAsset?.symbol}</span> : ""}
      </Styled.StatsCardValue>
      {statsData != undefined ? (
        <Line options={options} data={chartData()} width={200} height={30} />
      ) : (
        ""
      )}
    </Styled.StatsCard>
  );
};
