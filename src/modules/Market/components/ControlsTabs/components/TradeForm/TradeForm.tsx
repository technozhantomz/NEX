import * as Styled from "./TradeForm.styled";
import { useTradeForm } from "./hooks";

type Props = {
  isBuyForm: boolean;
};
export function TradeForm({ isBuyForm }: Props): JSX.Element {
  const { balance } = useTradeForm({ isBuyForm });
  return (
    <Styled.FormContainer>
      <Styled.Form.Provider>
        <Styled.BalanceContainer>
          <Styled.WalletIcon />
          <Styled.BalanceValue>{balance}</Styled.BalanceValue>
        </Styled.BalanceContainer>
      </Styled.Form.Provider>
    </Styled.FormContainer>
  );
}
