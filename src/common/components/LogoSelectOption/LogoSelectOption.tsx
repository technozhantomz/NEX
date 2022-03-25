import React from "react";

import { BaseOptionType, DefaultOptionType } from "../../../ui/src";
import BitcoinIcon from "../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import PPYIcon from "../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";
import { useAsset } from "../../hooks";

import * as Styled from "./LogoSelectOption.styled";

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
  labelInValue?: boolean;
  defaultValue?: string;
  forWithraw?: boolean;
};

export const LogoSelectOption = (props: LogoSelectionProps): JSX.Element => {
  const { defaultAsset } = useAsset();

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
        <Styled.SelectOptionContainer value={defaultAsset?.symbol}>
          <Styled.OptionsDiv>
            <Styled.IconDiv>
              <PPYIcon width="30px" height="30px" />
            </Styled.IconDiv>
            <Styled.NamePara>{defaultAsset?.symbol}</Styled.NamePara>
          </Styled.OptionsDiv>
        </Styled.SelectOptionContainer>
      ) : (
        ""
      )}
    </Styled.SelectContainer>
  );
};
