import React from "react";

import BitcoinIcon from "../../../ui/src/icons/BitcoinIcon.svg";
import PPYIcon from "../../../ui/src/icons/PPYIcon.svg";

import * as Styled from "./LogoSelectOption.style";

type LogoSelectionProps = {
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export const LogoSelectOption = (props: LogoSelectionProps): JSX.Element => {
  return (
    <Styled.SelectContainer {...props} bordered={false}>
      <Styled.SelectOptionContainer value="0">
        <Styled.OptionsDiv>
          <Styled.IconDiv>Select Token</Styled.IconDiv>
        </Styled.OptionsDiv>
      </Styled.SelectOptionContainer>
      <Styled.SelectOptionContainer value="BTC">
        <Styled.OptionsDiv>
          <Styled.IconDiv>
            <BitcoinIcon width="30px" height="30px" />
          </Styled.IconDiv>
          <Styled.NamePara>BTC</Styled.NamePara>
        </Styled.OptionsDiv>
      </Styled.SelectOptionContainer>
      <Styled.SelectOptionContainer value="PPY">
        <Styled.OptionsDiv>
          <Styled.IconDiv>
            <PPYIcon width="30px" height="30px" />
          </Styled.IconDiv>
          <Styled.NamePara>PPY</Styled.NamePara>
        </Styled.OptionsDiv>
      </Styled.SelectOptionContainer>
    </Styled.SelectContainer>
  );
};
