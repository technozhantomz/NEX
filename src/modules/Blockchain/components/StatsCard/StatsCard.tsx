import { TinyArea } from "@ant-design/plots";

import { useAsset } from "../../../../common/hooks";

import * as Styled from "./StatsCard.styled";

type Props = {
  isRewardCard?: boolean;
  isTimeCard?: boolean;
  statsData: number[];
  noData: boolean;
  title: string;
  data: string;
};

export const StatsCard = ({
  isRewardCard = false,
  isTimeCard = false,
  statsData,
  noData,
  title,
  data,
}: Props): JSX.Element => {
  const config = {
    height: 30,
    autoFit: false,
    data: statsData,
    smooth: true,
    line: {
      color: "#FF6CB3",
    },
    areaStyle: {
      fill: "l(270) 0:#ffffff 1:#FF6CB3",
    },
  };

  const { defaultAsset } = useAsset();

  return (
    <Styled.StatsCard className={noData ? "no-data stats-card" : "stats-card"}>
      <Styled.StatsCardHeading>{title}</Styled.StatsCardHeading>
      <Styled.StatsCardValue>
        {noData ? "No Data" : data}
        {isTimeCard && !noData ? <span> seconds</span> : ""}
        {isRewardCard && !noData ? <span> {defaultAsset?.symbol}</span> : ""}
      </Styled.StatsCardValue>
      <TinyArea {...config} />
    </Styled.StatsCard>
  );
};
