import { InfoCircleOutlined } from "@ant-design/icons";

import { CopyIcon } from "../../../../../../ui/src/icons";
import BitcoinIcon from "../../icons/BitcoinIcon.svg";

import * as Styled from "./KeyIsGenerated.styled";
import { useCopyKey } from "./hooks";
import { useKeyIsGenerated } from "./hooks/useKeyIsGenerated";

export const KeyIsGenerated = (): JSX.Element => {
  const { depositAddress } = useKeyIsGenerated();

  return (
    <>
      <Styled.KeyContainer>
        <BitcoinIcon height="30" width="30" />
        <Styled.DepositHeader>Copy your Bitcoin address</Styled.DepositHeader>
      </Styled.KeyContainer>
      <Styled.GeneratedBitcoinKey
        size="small"
        suffix={<CopyIcon onClick={() => useCopyKey(depositAddress)} />}
        value={depositAddress}
        disabled
      />
      <Styled.KeyLinkContainer>
        <Styled.KeyDownloadLink>Download Private Key</Styled.KeyDownloadLink>
      </Styled.KeyLinkContainer>
      <Styled.InfoBox>
        <InfoCircleOutlined />
        <Styled.DisclaimerFooter>
          The private key must be saved securely as it will be shown just once
          during the deposit address creation.
        </Styled.DisclaimerFooter>
      </Styled.InfoBox>
    </>
  );
};
