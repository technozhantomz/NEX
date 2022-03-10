import { InfoCircleOutlined } from "@ant-design/icons";

import { CopyIcon } from "../../../ui/src/icons";
import BitcoinIcon from "../../../ui/src/icons/BitcoinIcon.svg";

import * as Styled from "./AddressGenerated.styled";
import { useAddressGenerated } from "./hooks";

export const AddressGenerated = (): JSX.Element => {
  const { depositAddress, useCopyAddress } = useAddressGenerated();

  return (
    <>
      <Styled.AddressContainer>
        <BitcoinIcon height="30" width="30" />
        <Styled.DepositHeader>Copy your Bitcoin address</Styled.DepositHeader>
      </Styled.AddressContainer>
      <Styled.GeneratedBitcoinAddress
        size="small"
        suffix={<CopyIcon onClick={() => useCopyAddress(depositAddress)} />}
        value={depositAddress}
        disabled
      />
      <Styled.AddressLinkContainer>
        <Styled.AddressDownloadLink>Download Private Address</Styled.AddressDownloadLink>
      </Styled.AddressLinkContainer>
      <Styled.InfoBox>
        <InfoCircleOutlined />
        <Styled.DisclaimerFooter>
          The private Address must be saved securely as it will be shown just once
          during the deposit address creation.
        </Styled.DisclaimerFooter>
      </Styled.InfoBox>
    </>
  );
};
