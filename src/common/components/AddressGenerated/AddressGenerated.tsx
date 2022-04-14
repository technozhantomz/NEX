import { InfoCircleOutlined } from "../../../ui/src";
import { CopyIcon } from "../../../ui/src/icons";
import BitcoinIcon from "../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import { useCopyText } from "../../hooks";
import { SidechainAcccount } from "../../types";

import * as Styled from "./AddressGenerated.styled";
import { useAddressGenerated } from "./hooks/useAddressGenerated";

type Props = {
  bitcoinSidechainAccount: SidechainAcccount;
  getSidechainAccounts: (accountId: string) => Promise<void>;
};
export const AddressGenerated = ({
  bitcoinSidechainAccount,
  getSidechainAccounts,
}: Props): JSX.Element => {
  const { downloaded, downloadPrivateKeys } =
    useAddressGenerated(getSidechainAccounts);

  return (
    <>
      <Styled.AddressContainer>
        <BitcoinIcon height="30" width="30" />
        <Styled.DepositHeader>Copy your Bitcoin address</Styled.DepositHeader>
      </Styled.AddressContainer>
      <Styled.GeneratedBitcoinAddress
        size="small"
        suffix={
          <CopyIcon
            onClick={() => useCopyText(bitcoinSidechainAccount.deposit_address)}
          />
        }
        value={bitcoinSidechainAccount.deposit_address}
        disabled
      />
      {!downloaded ? (
        <>
          <Styled.AddressLinkContainer>
            <Styled.AddressDownloadLink
              onClick={() =>
                downloadPrivateKeys(bitcoinSidechainAccount.deposit_address)
              }
            >
              Download Private Address
            </Styled.AddressDownloadLink>
          </Styled.AddressLinkContainer>
          <Styled.InfoBox>
            <InfoCircleOutlined />
            <Styled.DisclaimerFooter>
              The private Address must be saved securely as it will be shown
              just once during the deposit address creation.
            </Styled.DisclaimerFooter>
          </Styled.InfoBox>
        </>
      ) : (
        ""
      )}
    </>
  );
};
