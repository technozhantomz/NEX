import React from "react";

import { BITCOIN_ASSET_SYMBOL } from "../../../../api/params";
import { WithdrawForm } from "../../../../common/components";

import * as Styled from "./WithdrawTab.styled";

export const WithdrawTab = (): JSX.Element => {
  return (
    <Styled.WithdrawContainer>
      <WithdrawForm asset={BITCOIN_ASSET_SYMBOL} />
    </Styled.WithdrawContainer>
  );
};
