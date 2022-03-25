import React from "react";

import { WithdrawForm } from "../../../../common/components";

import * as Styled from "./WithdrawTab.styled";

export const WithdrawTab = (): JSX.Element => {
  return (
    <Styled.WithdrawContainer>
      <WithdrawForm withAssetSelector={true} asset={"BTC"} />
    </Styled.WithdrawContainer>
  );
};
