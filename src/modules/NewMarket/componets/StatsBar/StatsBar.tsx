import { PairNameAndMarketStats } from "../../../../common/types";

import * as Styles from "./StatsBar.styled";

type Props = {
  stats: PairNameAndMarketStats;
};

export const StatsBar = ({ stats }: Props): JSX.Element => {
  return (
    <Styles.StatsBar>
      <div>price {stats.marketPairStats.latest} </div>
      <div>ask</div>
      <div>bid</div>
      <div>change {stats.marketPairStats.percentChange} </div>
      <div>high</div>
      <div>low</div>
      <div>volume {stats.marketPairStats.volume}</div>
    </Styles.StatsBar>
  );
};
