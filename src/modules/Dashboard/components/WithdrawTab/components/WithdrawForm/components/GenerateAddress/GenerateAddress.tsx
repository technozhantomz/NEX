import {
  BITCOIN_ASSET_SYMBOL,
  ETHEREUM_ASSET_SYMBOL,
} from "../../../../../../../../api/params";
import {
  GenerateBitcoinAddress,
  GenerateEthereumAddress,
} from "../../../../../../../../common/components";
import { SidechainAccount } from "../../../../../../../../common/types";

type Props = {
  isLoggedIn: boolean;
  selectedAssetSymbol: string;
  bitcoinSidechainAccount:
    | {
        account: SidechainAccount;
        hasDepositAddress: boolean;
      }
    | undefined;
  ethereumSidechainAccount:
    | {
        account: SidechainAccount;
        hasDepositAddress: boolean;
      }
    | undefined;
  loadingSidechainAccounts: boolean;
  getSidechainAccounts: (accountId: string) => Promise<void>;
};
export const GenerateAddress = ({
  isLoggedIn,
  selectedAssetSymbol,
  bitcoinSidechainAccount,
  loadingSidechainAccounts,
  getSidechainAccounts,
  ethereumSidechainAccount,
}: Props): JSX.Element => {
  if (isLoggedIn) {
    if (selectedAssetSymbol === BITCOIN_ASSET_SYMBOL) {
      return (!bitcoinSidechainAccount ||
        !bitcoinSidechainAccount.hasDepositAddress) &&
        !loadingSidechainAccounts ? (
        <GenerateBitcoinAddress getSidechainAccounts={getSidechainAccounts} />
      ) : (
        <></>
      );
    } else if (selectedAssetSymbol === ETHEREUM_ASSET_SYMBOL) {
      return (!ethereumSidechainAccount ||
        !ethereumSidechainAccount.hasDepositAddress) &&
        !loadingSidechainAccounts ? (
        <GenerateEthereumAddress getSidechainAccounts={getSidechainAccounts} />
      ) : (
        <></>
      );
    } else {
      return <></>;
    }
  } else {
    return <></>;
  }
};
