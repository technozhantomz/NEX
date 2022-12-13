import { Dispatch, SetStateAction } from "react";

import { HiveKeyChain, MetaMask, SignerKey } from "../../../../../common/types";
import { FormInstance } from "../../../../../ui/src";

export type UsePeerLinkResult = {
  metaMask: MetaMask;
  hiveKeyChain: HiveKeyChain;
  localStorageAccount: string;
  peerLinkConnectForm: FormInstance<PeerLinkConnectForm>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handleConnect: (signerKey: SignerKey) => Promise<void>;
  connectToMetaMask: () => void;
  connectToHiveKeyChain: () => void;
};

export type PeerLinkConnectForm = {
  password: string;
};
