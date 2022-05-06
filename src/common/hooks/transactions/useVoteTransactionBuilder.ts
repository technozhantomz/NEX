import { useCallback } from "react";

import { AccountOptions } from "../../types";
import { useAsset } from "../useAsset";

import {
  IVoteTransactionBuilder,
  VoteExtensions,
} from "./useVoteTransactionBuilder.types";

export function useVoteTransactionBuilder(): IVoteTransactionBuilder {
  const { defaultAsset } = useAsset();

  const buildVoteTransaction = useCallback(
    (
      voteExtensions: VoteExtensions,
      voteOptions: AccountOptions,
      accountId: string
    ) => {
      const trx = {
        type: "account_update",
        params: {
          extensions: voteExtensions,
          new_options: voteOptions,
          account: accountId,
          fee: { amount: 0, asset_id: defaultAsset?.id },
        },
      };
      return trx;
    },
    [defaultAsset]
  );

  return { buildVoteTransaction };
}
