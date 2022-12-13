import { Dispatch, SetStateAction } from "react";

import { SignerKey } from "../../../../../common/types";
import { FormInstance } from "../../../../../ui/src";

export type UsePeerLinkResult = {
  peerLinkConnectForm: FormInstance<PeerLinkConnectForm>;
  transactionErrorMessage: string;
  transactionSuccessMessage: string;
  loadingTransaction: boolean;
  setTransactionErrorMessage: Dispatch<SetStateAction<string>>;
  setTransactionSuccessMessage: Dispatch<SetStateAction<string>>;
  handleConnect: (signerKey: SignerKey) => Promise<void>;
};

export type PeerLinkConnectForm = {
  password: string;
};
