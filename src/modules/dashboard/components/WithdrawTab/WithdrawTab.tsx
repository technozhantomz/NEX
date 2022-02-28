import React from "react";

import { DashboardButton } from "../../../../common/components/DashboardButton/DashboardButton";
import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";
import BitcoinIcon from "../DepositTab/icons/BitcoinIcon.svg";

import * as Styled from "./WithdrawTab.styled";

export const WithdrawTab = (): JSX.Element => {
  return (
    <Styled.WithdrawContainer>
      <Styled.WithdrawForm>
        <LogoSelectOption
          balance="3.0917"
          token={<BitcoinIcon width="30px" height="30px" />}
          amountCol={true}
        />
        <Styled.WithdrawLabel>Withdrawal Address</Styled.WithdrawLabel>
        <Styled.WithdrawFormItem name="withdrawalAddress" hasFeedback>
          <Styled.WithdrawFormInput />
        </Styled.WithdrawFormItem>
        <DashboardButton label="Log in" />
      </Styled.WithdrawForm>
    </Styled.WithdrawContainer>
  );
};
