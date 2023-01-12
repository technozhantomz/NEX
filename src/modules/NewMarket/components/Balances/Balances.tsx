import counterpart from "counterpart";

import { PairAssets } from "../../../Market/types";

import * as Styled from "./Balances.styled";
import { useBalances } from "./hooks";

type Props = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  activePair: string;
};

export function Balances({
  selectedAssets,
  loadingSelectedPair,
  activePair,
}: Props): JSX.Element {
  const { balance } = useBalances(selectedAssets, loadingSelectedPair);
  return (
    <>
      <Styled.BalanceInfo>
        <Styled.BalanceLabel>
          {activePair.split("_")[0]}{" "}
          {counterpart.translate(`field.labels.available`)}
        </Styled.BalanceLabel>
        <Styled.Balance>{balance.userQuoteAssetAmount}</Styled.Balance>
      </Styled.BalanceInfo>
      <Styled.BalanceInfo>
        <Styled.BalanceLabel>
          {activePair.split("_")[1]}{" "}
          {counterpart.translate(`field.labels.available`)}
        </Styled.BalanceLabel>
        <Styled.Balance>{balance.userBaseAssetAmount}</Styled.Balance>
      </Styled.BalanceInfo>
    </>
  );
}
