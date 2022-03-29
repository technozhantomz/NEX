import React from "react";

import { BaseOptionType, DefaultOptionType } from "../../../ui/src";
import BitcoinIcon from "../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import HIVEIcon from "../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";
import { Asset } from "../../types";

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
  assets: Asset[];
};

export const LogoSelectOption = (props: LogoSelectionProps): JSX.Element => {
  const icons: {
    [symbol: string]: JSX.Element;
  } = {
    BTC: <BitcoinIcon height="30" width="30" />,
    TEST: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
    HIVE: <HIVEIcon height="30" width="30" />,
    HBD: <HIVEIcon height="30" width="30" />,
  };
  return (
    <Styled.SelectContainer
      onChange={props.onChange}
      defaultValue={props.defaultValue}
      bordered={false}
    >
      {props.assets.map((asset) => (
        <Styled.SelectOptionContainer value={asset.symbol}>
          <Styled.OptionDiv>
            <Styled.IconContainer>{icons[asset.symbol]}</Styled.IconContainer>
            <Styled.AssetName>{asset.symbol}</Styled.AssetName>
          </Styled.OptionDiv>
        </Styled.SelectOptionContainer>
      ))}
    </Styled.SelectContainer>
  );
};
