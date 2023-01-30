import * as Styled from "./OrderForm.styled";
import { useOrderForm } from "./hooks";

type Props = {
  isBuyForm: boolean;
};
export function OrderForm({ isBuyForm }: Props): JSX.Element {
  const { balance } = useOrderForm({ isBuyForm });
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
