import { useViewportContext } from "../../../common/components";
import { InfoCircleOutlined } from "../../../ui/src";
import { breakpoints } from "../../../ui/src/breakpoints";
import { CopyIcon } from "../../../ui/src/icons";
import BitcoinIcon from "../../../ui/src/icons/Cryptocurrencies/BitcoinIcon.svg";
import { useCopyText } from "../../hooks";
import { SidechainAcccount } from "../../types";

import * as Styled from "./AddressGenerated.styled";

type Props = {
  bitcoinSidechainAccount?: SidechainAcccount;
};
export const AddressGenerated = ({
  bitcoinSidechainAccount,
}: Props): JSX.Element => {
  const { width } = useViewportContext();

  return (
    <>
      <Styled.AddressContainer>
        <Styled.IconDiv>
          <BitcoinIcon
            height={width > breakpoints.sm ? "30" : "18"}
            width="30"
          />
        </Styled.IconDiv>
        <Styled.DepositHeader>Copy your Bitcoin address</Styled.DepositHeader>
      </Styled.AddressContainer>
      <Styled.GeneratedBitcoinAddress
        size="small"
        suffix={
          <CopyIcon
            onClick={() =>
              useCopyText(
                bitcoinSidechainAccount
                  ? bitcoinSidechainAccount.deposit_address
                  : ""
              )
            }
          />
        }
        value={
          bitcoinSidechainAccount ? bitcoinSidechainAccount.deposit_address : ""
        }
        disabled
      />
      <Styled.AddressLinkContainer>
        <Styled.AddressDownloadLink>
          Download Private Address
        </Styled.AddressDownloadLink>
      </Styled.AddressLinkContainer>
      <Styled.InfoBox>
        <InfoCircleOutlined />
        <Styled.DisclaimerFooter>
          The private Address must be saved securely as it will be shown just
          once during the deposit address creation.
        </Styled.DisclaimerFooter>
      </Styled.InfoBox>
    </>
  );
};
