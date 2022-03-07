import BitcoinIcon from "../../../../ui/src/icons/BitcoinIcon.svg";
import PPYIcon from "../../../../ui/src/icons/PPYIcon.svg";

import * as Styled from "./AssetTitle.styled";

type Props = {
  symbol: string;
};

const AssetTitle = ({ symbol }: Props): JSX.Element => {
  const icons: {
    [symbol: string]: JSX.Element;
  } = {
    BTC: <BitcoinIcon height="30" width="30" />,
    TEST: <PPYIcon height="30" width="30" />,
    PPY: <PPYIcon height="30" width="30" />,
    HIVE: <PPYIcon height="30" width="30" />,
  };
  const AssetNames: {
    [symbol: string]: string;
  } = {
    BTC: "Bitcoin",
    TEST: "Peerplays",
    PPY: "Peerplays",
    HIVE: "Hive",
  };

  return (
    <Styled.AssetTitle
      avatar={icons[symbol]}
      title={
        <>
          {AssetNames[symbol]} <span className="asset-symbol">{symbol}</span>
        </>
      }
    />
  );
};

export default AssetTitle;
