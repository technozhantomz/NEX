import React from "react";

import { BITCOIN_ASSET_SYMBOL } from "../../../../api/params";

import * as Styled from "./WithdrawTab.styled";
import { WithdrawForm } from "./components";

export const WithdrawTab = (): JSX.Element => {
  return (
    <Styled.WithdrawContainer>
      <WithdrawForm asset={BITCOIN_ASSET_SYMBOL} />
    </Styled.WithdrawContainer>
  );
};
