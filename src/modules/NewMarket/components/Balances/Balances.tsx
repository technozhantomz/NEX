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
      <Styled.AssetHeader>
        {counterpart.translate(`pages.wallet.assets`)}
      </Styled.AssetHeader>
      <Styled.WalletButtonsContainer>
        <Styled.WalletButton type="primary">
          {counterpart.translate(`buttons.deposit`)}
        </Styled.WalletButton>
        <Styled.WalletButton type="primary">
          {counterpart.translate(`buttons.withdraw`)}
        </Styled.WalletButton>
      </Styled.WalletButtonsContainer>
      <Styled.BalanceInfoContainer>
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
      </Styled.BalanceInfoContainer>
    </>
  );
}
