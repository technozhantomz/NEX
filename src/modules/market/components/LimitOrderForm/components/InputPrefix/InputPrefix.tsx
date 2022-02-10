import * as Styled from "./InputPrefix.styled";
import BitcoinIcon from "./icons/BitcoinIcon.svg";
import HiveIcon from "./icons/HiveIcon.svg";
import PPYIcon from "./icons/PPYIcon.svg";

type Props = {
  inputSymbol: string;
  quoteSymbol?: string;
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
    HIVE: <HiveIcon height="30" width="30" />,
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
          {baseSymbol && quoteSymbol
            ? `${baseSymbol} / ${quoteSymbol}`
            : `${inputSymbol}`}
        </Styled.InputPrefixAssetLabel>
      </Styled.InputPrefixContainer>
    </>
  );
}
