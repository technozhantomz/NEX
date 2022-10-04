import counterpart from "counterpart";

import { CopyButton } from "..";
import { SidechainAcccount } from "../../types";

import * as Styled from "./AddressGenerated.styled";

type Props = {
  bitcoinSidechainAccount?: SidechainAcccount;
};
export const AddressGenerated = ({
  bitcoinSidechainAccount,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.GeneratedBitcoinAddressLabel>
        {counterpart.translate(`field.labels.bitcoin_deposit_address`)}
      </Styled.GeneratedBitcoinAddressLabel>
      <Styled.GeneratedBitcoinAddress
        size="small"
        suffix={
          <CopyButton
            copyValue={`${bitcoinSidechainAccount?.deposit_address}`}
          ></CopyButton>
        }
        value={bitcoinSidechainAccount?.deposit_address}
        disabled
      />
    </>
  );
};
