import counterpart from "counterpart";

import * as Styled from "./Wallet.styled";
import { useWallet } from "./hooks";

type Props = {
  currentPair: string;
};

export function Wallet({ currentPair }: Props): JSX.Element {
  const { balances } = useWallet({ currentPair });
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

      <Styled.BalanceInfo>
        <Styled.BalanceLabel>
          {currentPair.split("_")[0]}{" "}
          {counterpart.translate(`field.labels.available`)}:
        </Styled.BalanceLabel>
        <Styled.Balance>{balances.baseAmount}</Styled.Balance>
      </Styled.BalanceInfo>
      <Styled.BalanceInfo>
        <Styled.BalanceLabel>
          {currentPair.split("_")[1]}{" "}
          {counterpart.translate(`field.labels.available`)}:
        </Styled.BalanceLabel>
        <Styled.Balance>{balances.quoteAmount}</Styled.Balance>
      </Styled.BalanceInfo>
    </>
  );
}
