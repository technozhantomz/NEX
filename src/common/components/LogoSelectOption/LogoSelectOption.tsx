import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import React from "react";

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
  forWithraw?: boolean;
};

export const LogoSelectOption = (props: LogoSelectionProps): JSX.Element => {
  return (
    <Styled.SelectContainer {...props} bordered={false}>
      <Styled.SelectOptionContainer value="BTC">
        <Styled.OptionsDiv>
          <Styled.IconDiv>
            <BitcoinIcon width="30px" height="30px" />
          </Styled.IconDiv>
          <Styled.NamePara>BTC</Styled.NamePara>
        </Styled.OptionsDiv>
      </Styled.SelectOptionContainer>
      {!props.forWithraw ? (
        <Styled.SelectOptionContainer value="PPY">
          <Styled.OptionsDiv>
            <Styled.IconDiv>
              <PPYIcon width="30px" height="30px" />
            </Styled.IconDiv>
            <Styled.NamePara>PPY</Styled.NamePara>
          </Styled.OptionsDiv>
        </Styled.SelectOptionContainer>
      ) : (
        ""
      )}
    </Styled.SelectContainer>
  );
};
