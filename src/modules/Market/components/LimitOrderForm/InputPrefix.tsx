import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import PPYIcon from "../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";

import * as Styled from "./InputPrefix.styled";

type Props = {
  inputSymbol: string;
  quoteSymbol: string;
  baseSymbol?: string;
  constLabel: string;
};

export function InputPrefix({
  inputSymbol,
  constLabel,
  baseSymbol,
  quoteSymbol,
}: Props): JSX.Element {
  const icons: {
    [inputSymbol: string]: JSX.Element;
  } = {
    BTC: <BitcoinIcon height="30" width="30" />,
    TEST: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
  };
  return (
    <>
      <Styled.InputPrefixContainer>
        <Styled.InputPrefixIconContainer>
          {icons[inputSymbol]}
        </Styled.InputPrefixIconContainer>
        <Styled.InputPrefixConstLabel>
          {constLabel}
        </Styled.InputPrefixConstLabel>
        <Styled.InputPrefixAssetLabel>
          {baseSymbol ? `${baseSymbol} / ${quoteSymbol}` : `${quoteSymbol}`}
        </Styled.InputPrefixAssetLabel>
      </Styled.InputPrefixContainer>
    </>
  );
}
