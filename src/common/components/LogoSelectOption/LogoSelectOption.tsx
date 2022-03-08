import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import React from "react";

import { defaultToken } from "../../../api/params/networkparams";
import BitcoinIcon from "../../../ui/src/icons/BitcoinIcon.svg";
import PPYIcon from "../../../ui/src/icons/PPYIcon.svg";

import * as Styled from "./LogoSelectOption.style";

type LogoSelectionProps = {
  onChange?:
    | ((
        value: unknown,
        option:
          | DefaultOptionType
          | BaseOptionType
          | (DefaultOptionType | BaseOptionType)[]
      ) => void)
    | undefined;
  defaultValue?: string;
  hideDefultToken?: boolean;
};

export const LogoSelectOption = (props: LogoSelectionProps): JSX.Element => {
  return (
    <Styled.SelectContainer
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      bordered={false}
    >
      <Styled.SelectOptionContainer value="BTC">
        <Styled.OptionsDiv>
          <Styled.IconDiv>
            <BitcoinIcon width="30px" height="30px" />
          </Styled.IconDiv>
          <Styled.NamePara>BTC</Styled.NamePara>
        </Styled.OptionsDiv>
      </Styled.SelectOptionContainer>
      {props.hideDefultToken ? (
        ""
      ) : (
        <Styled.SelectOptionContainer value={defaultToken}>
          <Styled.OptionsDiv>
            <Styled.IconDiv>
              <PPYIcon width="30px" height="30px" />
            </Styled.IconDiv>
            <Styled.NamePara>{defaultToken}</Styled.NamePara>
          </Styled.OptionsDiv>
        </Styled.SelectOptionContainer>
      )}
    </Styled.SelectContainer>
  );
};
