import BitcoinIcon from "../../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import DefaultIcon from "../../../../ui/src/icons/Cryptocurrencies/DefaultIcon.svg";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import PPYIcon from "../../../../ui/src/icons/Cryptocurrencies/PPYIcon.svg";

import * as Styled from "./AssetTitle.styled";

type Props = {
  symbol: string;
};

export const AssetTitle = ({ symbol }: Props): JSX.Element => {
  const icons: {
    [symbol: string]: JSX.Element;
  } = {
    BTC: <BitcoinIcon height="30" width="30" />,
    TEST: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
    HIVE: <HIVEIcon height="30" width="30" />,
    HBD: <HIVEIcon height="30" width="30" />,
    Default: <DefaultIcon height="30" width="30" />,
  };
  const AssetNames: {
    [symbol: string]: string;
  } = {
    BTC: "Bitcoin",
    TEST: "Peerplays",
    PPY: "Peerplays",
    HIVE: "Hive",
    HBD: "HBD",
  };

  return (
    <Styled.AssetTitle
      avatar={icons[symbol] !== undefined ? icons[symbol] : icons["Default"]}
      title={
        <>
          {AssetNames[symbol]} <span className="asset-symbol">{symbol}</span>
        </>
      }
    />
  );
};
