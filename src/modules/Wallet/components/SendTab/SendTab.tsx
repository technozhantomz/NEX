import counterpart from "counterpart";
import Link from "next/link";

import { AssetsTable } from "..";

import * as Styled from "./SendTab.styled";
import { SendForm } from "./components";

type Props = {
  assetSymbol?: string;
};

export const SendTab = ({ assetSymbol }: Props): JSX.Element => {
  return (
    <Styled.SendTabWrapper>
      <Styled.SendFormWrapper>
        <Styled.HeaderWrapper>
          <Styled.Header>
            {counterpart.translate(`pages.wallet.send_assets`)}
          </Styled.Header>
          <Styled.ClearForm>
            <Link href="/wallet?tab=send">
              <a>{counterpart.translate(`pages.wallet.clear_form`)}</a>
            </Link>
          </Styled.ClearForm>
        </Styled.HeaderWrapper>
        <SendForm assetSymbol={assetSymbol} />
      </Styled.SendFormWrapper>
      <AssetsTable
        className="no-margin"
        filterAsset={assetSymbol}
        actionType="send_select"
        title={counterpart.translate(`pages.wallet.available_assets`)}
      />
    </Styled.SendTabWrapper>
  );
};
