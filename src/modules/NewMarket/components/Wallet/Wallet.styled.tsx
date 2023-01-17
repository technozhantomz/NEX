import { Button, styled } from "../../../../ui/src";

export const AssetHeader = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
`;
export const WalletButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const WalletButton = styled(Button)`
  width: 48%;
`;

export const BalanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Balance = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

export const BalanceLabel = styled.span`
  font-size: 14px;
  font-weight: 300;
`;
