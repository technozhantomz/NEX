import React from "react";

import * as Styled from "./DepositTab.styled";
import { GenerateKey } from "./components/GenerateKey/GenerateKey";
import { KeyIsGenerated } from "./components/KeyIsGenerated/KeyIsGenerated";

export const DepositTab = (): JSX.Element => {
  const isKeyGenerated = false;

  return (
    <Styled.DepositFormContainer>
      {isKeyGenerated ? <KeyIsGenerated /> : <GenerateKey />}
    </Styled.DepositFormContainer>
  );
};
