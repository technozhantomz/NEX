import counterpart from "counterpart";

import { AssetsTable } from "..";

import * as Styled from "./SendTab.styled";

type Props = {
  assetSymbol?: string;
};

export const SendTab = ({ assetSymbol }: Props): JSX.Element => {
  return (
    <Styled.SendTabWrapper>
      <AssetsTable
        className="no-margin"
        fillterAsset={assetSymbol}
        actionType="send_select"
        title={counterpart.translate(`pages.wallet.available_assets`)}
      />
    </Styled.SendTabWrapper>
  );
};
