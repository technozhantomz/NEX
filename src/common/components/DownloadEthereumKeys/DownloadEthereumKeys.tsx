import counterpart from "counterpart";

import { InfoCircleOutlined } from "../../../ui/src";

import * as Styled from "./DownloadEthereumKeys.styled";
import { useDownloadEthereumKeys } from "./hooks";

type Props = {
  getSidechainAccounts: (accountId: string) => Promise<void>;
};
export const DownloadEthereumKeys = ({
  getSidechainAccounts,
}: Props): JSX.Element => {
  const { downloaded, downloadPrivateKeys } = useDownloadEthereumKeys({
    getSidechainAccounts,
  });

  return (
    <>
      {!downloaded ? (
        <>
          <Styled.InfoBox>
            <InfoCircleOutlined />
            <Styled.DisclaimerFooter>
              {counterpart.translate(
                `field.labels.ethereum_associated_account`
              )}
            </Styled.DisclaimerFooter>
          </Styled.InfoBox>
          <Styled.AddressLinkContainer>
            <Styled.AddressDownloadLink onClick={() => downloadPrivateKeys()}>
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
