import { Button, DataTableHeader, styled } from "../../../../ui/src";

export const BalanceInfoContainer = styled.div`
  margin-top: 20px;
`;

export const BalanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const WalletButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`;

export const Balance = styled.span`
  font-size: 20px;
`;

export const BalanceLabel = styled.span`
  font-size: 16px;
`;

export const WalletButton = styled(Button)`
  width: 48%;
`;

export const AssetHeader = styled(DataTableHeader)`
  font-weight: bold;
`;
