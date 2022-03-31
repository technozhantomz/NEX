import { TinyArea } from "@ant-design/plots";

import * as Styled from "./StatsCard.styled";

type Props = {
  isTimeCard?: boolean;
  statsData: number[];
  noData: boolean;
  title: string;
  data: string;
};

export const StatsCard = ({
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
  };

  return (
    <Styled.StatsCard className={noData ? "no-data" : ""}>
      <Styled.StatsCardHeading>{title}</Styled.StatsCardHeading>
      <Styled.StatsCardValue>
        {data}
        {isTimeCard && !noData ? <span> seconds</span> : ""}
      </Styled.StatsCardValue>
      <TinyArea {...config} />
    </Styled.StatsCard>
  );
};
