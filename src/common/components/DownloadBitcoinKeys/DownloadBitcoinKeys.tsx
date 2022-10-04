import counterpart from "counterpart";

import { InfoCircleOutlined } from "../../../ui/src";
import { SidechainAcccount } from "../../types";

import * as Styled from "./DownloadBitcoinKeys.styled";
import { useDownloadBitcoinKeys } from "./hooks";

type Props = {
  bitcoinSidechainAccount: SidechainAcccount;
  getSidechainAccounts: (accountId: string) => Promise<void>;
};
export const DownloadBitcoinKeys = ({
  bitcoinSidechainAccount,
  getSidechainAccounts,
}: Props): JSX.Element => {
  const { downloaded, downloadPrivateKeys } =
    useDownloadBitcoinKeys(getSidechainAccounts);

  return (
    <>
      {!downloaded ? (
        <>
          <Styled.InfoBox>
            <InfoCircleOutlined />
            <Styled.DisclaimerFooter>
              {counterpart.translate(`field.labels.bitcoin_associated_account`)}
            </Styled.DisclaimerFooter>
          </Styled.InfoBox>
          <Styled.AddressLinkContainer>
            <Styled.AddressDownloadLink
              onClick={() =>
                downloadPrivateKeys(bitcoinSidechainAccount.deposit_address)
              }
            >
              {counterpart.translate(`field.labels.download_private_keys`)}
            </Styled.AddressDownloadLink>
          </Styled.AddressLinkContainer>
          <Styled.InfoBox>
            <InfoCircleOutlined />
            <Styled.DisclaimerFooter>
              {counterpart.translate(`field.labels.private_keys_warning`)}
            </Styled.DisclaimerFooter>
          </Styled.InfoBox>
        </>
      ) : (
        ""
      )}
    </>
  );
};
