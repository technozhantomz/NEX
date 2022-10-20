import { useCallback, useEffect, useState } from "react";

import { useBlockchain, useFormDate } from "../../../../../common/hooks";
import {
  DataTableRow,
  TransactionRow,
} from "../../BlockchainTab/hooks/useBlockchainTab.types";

import { UseBlockDetailsResult } from "./useBlockDetails.types";

export function useBlockDetails(block: number): UseBlockDetailsResult {
  const [hasNextBlock, setHasNextBlock] = useState<boolean>(false);
  const [hasPreviousBlock, setHasPreviousBlock] = useState<boolean>(false);
  const [blockDetails, setBlockDetails] = useState<DataTableRow>({
    key: block,
    nextSecret: "",
    previousSecret: "",
    merkleRoot: "",
    blockID: block,
    time: "",
    witness: "",
    witnessSignature: "",
    transactions: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSideBlocks, setLoadingSideBlocks] = useState<boolean>(true);

  const { formLocalDate } = useFormDate();
  const { getBlock } = useBlockchain();

  const getBlockDetails = useCallback(async () => {
    try {
      setLoading(true);
      const rawBlock = await getBlock(Number(block));
      if (rawBlock) {
        const transactions: TransactionRow[] = rawBlock.transactions.map(
          (transaction, index) => {
            return {
              rank: index + 1,
              id: transaction.signatures[0],
              expiration: transaction.expiration,
              operations: transaction.operations,
              operationResults: transaction.operation_results,
              refBlockPrefix: transaction.ref_block_prefix,
              refBlockNum: transaction.ref_block_num,
              extensions: transaction.extensions,
              signatures: transaction.signatures,
            };
          }
        );
        setBlockDetails({
          key: block,
          nextSecret: rawBlock.next_secret_hash as string,
          previousSecret: rawBlock.previous_secret,
          merkleRoot: rawBlock.transaction_merkle_root,
          blockID: block,
          time: formLocalDate(rawBlock.timestamp, [
            "month",
            "date",
            "year",
            "time",
          ]),
          witness: rawBlock.witness_account_name,
          witnessSignature: rawBlock.witness_signature,
          transactions: transactions,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [block, setBlockDetails]);

  const getSideBlocks = useCallback(async () => {
    try {
      setLoadingSideBlocks(true);
      const nextBlock = await getBlock(Number(block) + 1);
      if (nextBlock) {
        setHasNextBlock(true);
      } else {
        setHasNextBlock(false);
      }
      const previousBlock = await getBlock(Number(block) - 1);
      if (previousBlock) {
        setHasPreviousBlock(true);
      } else {
        setHasPreviousBlock(false);
      }
      setLoadingSideBlocks(false);
    } catch (e) {
      console.log(e);
      setHasNextBlock(false);
      setHasPreviousBlock(false);
      setLoadingSideBlocks(false);
    }
  }, [getBlock, block, setHasNextBlock, setHasPreviousBlock]);

  useEffect(() => {
    getBlockDetails();
  }, [block]);

  useEffect(() => {
    getSideBlocks();
  }, [getSideBlocks]);

  return {
    blockDetails,
    loading,
    hasNextBlock,
    hasPreviousBlock,
    loadingSideBlocks,
  };
}
