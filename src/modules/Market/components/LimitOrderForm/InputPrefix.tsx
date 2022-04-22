import BitcoinCashIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinCashIcon.svg";
import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import BitsharesIcon from "../../../../ui/src/icons/Cryptocurrencies/BitsharesIcon.svg";
import DefaultIcon from "../../../../ui/src/icons/Cryptocurrencies/DefaultIcon.svg";
import EthereumIcon from "../../../../ui/src/icons/Cryptocurrencies/EthereumIcon.svg";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";
import TetherIcon from "../../../../ui/src/icons/Cryptocurrencies/TetherIcon.svg";
import USDIcon from "../../../../ui/src/icons/Cryptocurrencies/USDIcon.svg";

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
    HIVE: <HIVEIcon height="30" width="30" />,
    HBD: <HIVEIcon height="30" width="30" />,
    ETH: <EthereumIcon height="30" width="30" />,
    BTS: <BitsharesIcon height="30" width="30" />,
    USDT: <TetherIcon height="30" width="30" />,
    Default: <DefaultIcon height="30" width="30" />,
    USD: <USDIcon height="30" width="30" />,
    BCH: <BitcoinCashIcon height="30" width="30" />,
  };

  return (
    <>
      <Styled.InputPrefixContainer>
        <Styled.InputPrefixIconContainer>
          {icons[inputSymbol] !== undefined
            ? icons[inputSymbol]
            : icons["Default"]}
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
