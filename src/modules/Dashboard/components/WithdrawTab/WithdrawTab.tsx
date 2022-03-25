import React from "react";

import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";

import * as Styled from "./WithdrawTab.styled";

export const WithdrawTab = (): JSX.Element => {
  return (
    <Styled.WithdrawContainer>
      <Styled.WithdrawForm>
        <LogoSelectOption />
        <Styled.WithdrawLabel>Withdrawal Address</Styled.WithdrawLabel>
        <Styled.WithdrawFormItem name="withdrawalAddress" hasFeedback>
          <Styled.WithdrawFormInput />
        </Styled.WithdrawFormItem>
        <Styled.Button type="primary" htmlType="submit">
          Log in
        </Styled.Button>
      </Styled.WithdrawForm>
    </Styled.WithdrawContainer>
  );
};
