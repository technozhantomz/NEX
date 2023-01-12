// import counterpart from "counterpart";

import { DownOutlined } from "../../../../ui/src";
import BitcoinCashIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinCashIcon.svg";
import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import BitsharesIcon from "../../../../ui/src/icons/Cryptocurrencies/BitsharesIcon.svg";
import DefaultIcon from "../../../../ui/src/icons/Cryptocurrencies/DefaultIcon.svg";
import EOSIcon from "../../../../ui/src/icons/Cryptocurrencies/EOSIcon.svg";
import EthereumIcon from "../../../../ui/src/icons/Cryptocurrencies/EthereumIcon.svg";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";
import TetherIcon from "../../../../ui/src/icons/Cryptocurrencies/TetherIcon.svg";
import USDIcon from "../../../../ui/src/icons/Cryptocurrencies/USDIcon.svg";

import * as Styled from "./PairSelect.styled";

type Props = {
  currentPair: string;
  handleClickOnPair: () => void;
};

export const PairSelect = ({
  handleClickOnPair,
  currentPair,
}: Props): JSX.Element => {
  const pairArray = currentPair.split("_");
  const icons: {
    [symbol: string]: JSX.Element;
  } = {
    PEOS: <EOSIcon height="30" width="30" />,
    EOS: <EOSIcon height="30" width="30" />,
    PBTC: <BitcoinIcon height="30" width="30" />,
    BTC: <BitcoinIcon height="30" width="30" />,
    TEST: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
    HIVE: <HIVEIcon height="30" width="30" />,
    HBD: <HIVEIcon height="30" width="30" />,
    PETH: <EthereumIcon height="30" width="30" />,
    ETH: <EthereumIcon height="30" width="30" />,
    BTS: <BitsharesIcon height="30" width="30" />,
    USDT: <TetherIcon height="30" width="30" />,
    Default: <DefaultIcon height="30" width="30" />,
    USD: <USDIcon height="30" width="30" />,
    BCH: <BitcoinCashIcon height="30" width="30" />,
  };

  return (
    <Styled.PairSelectContainer>
      <Styled.PairButtonRow>
        <Styled.PairButton onClick={handleClickOnPair}>
          <Styled.IconContainer>
            {icons[pairArray[0]] !== undefined
              ? icons[pairArray[0]]
              : icons["Default"]}
          </Styled.IconContainer>
          <Styled.Pair>{currentPair.split("_").join("/")}</Styled.Pair>
          <DownOutlined />
        </Styled.PairButton>
      </Styled.PairButtonRow>
    </Styled.PairSelectContainer>
  );
};
