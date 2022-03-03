import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import React from "react";

import * as Styled from "./LogoSelectOption.style";

type LogoSelectionProps = {
  balance: string;
  token: React.ReactNode;
  amountCol: boolean;
  onChange?:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
};

export const LogoSelectOption = ({
  balance,
  token,
  amountCol,
  onChange,
}: LogoSelectionProps): JSX.Element => {
  return (
    <Styled.FormContainer>
      <Styled.Row>
        <Styled.SelectOptionCol span={amountCol ? 11 : 23}>
          <Styled.SelectContainer
            defaultValue="0"
            bordered={false}
            onChange={onChange}
          >
            <Styled.SelectOptionContainer value="0">
              <Styled.OptionsDiv>
                <Styled.IconDiv>Select Token</Styled.IconDiv>
              </Styled.OptionsDiv>
            </Styled.SelectOptionContainer>
            <Styled.SelectOptionContainer value="bitcoin">
              <Styled.OptionsDiv>
                <Styled.IconDiv>{token}</Styled.IconDiv>
                <Styled.NamePara>BTC</Styled.NamePara>
              </Styled.OptionsDiv>
            </Styled.SelectOptionContainer>
          </Styled.SelectContainer>
        </Styled.SelectOptionCol>
        {amountCol && (
          <Styled.AmountCol span={12}>
            <Styled.BalancePara>
              {balance} <br />{" "}
              <Styled.BalanceFooterPara>~$ 2,239.57</Styled.BalanceFooterPara>
            </Styled.BalancePara>
          </Styled.AmountCol>
        )}
      </Styled.Row>
    </Styled.FormContainer>
  );
};
