import React from "react";

import BitcoinIcon from "../../../modules/dashboard/components/DepositTab/icons/BitcoinIcon.svg";

import * as Styled from "./LogoSelectOption.style";

export const LogoSelectOption = (): JSX.Element => {
  return (
    <Styled.FormContainer>
      <Styled.Row>
        <Styled.SelectOptionCol span={12}>
          <Styled.SelectContainer defaultValue="1">
            <Styled.SelectOptionContainer value="1">
              <Styled.OptionsDiv>
                <Styled.IconDiv>
                  <BitcoinIcon width="30px" height="30px" />
                </Styled.IconDiv>
                <Styled.NamePara>BTC</Styled.NamePara>
              </Styled.OptionsDiv>
            </Styled.SelectOptionContainer>
          </Styled.SelectContainer>
        </Styled.SelectOptionCol>
        <Styled.AmountCol span={12}>
          <Styled.BalancePara>3.0917</Styled.BalancePara>
        </Styled.AmountCol>
      </Styled.Row>
    </Styled.FormContainer>
  );
};
