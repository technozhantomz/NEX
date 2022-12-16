import { useCallback, useEffect, useState } from "react";

import { useBlockchain, useFormDate } from "../../../../../common/hooks";

import {
  BlockDetailsType,
  TransactionRow,
  UseBlockDetailsResult,
} from "./useBlockDetails.types";

export function useBlockDetails(block: number): UseBlockDetailsResult {
  const [hasNextBlock, setHasNextBlock] = useState<boolean>(false);
  const [hasPreviousBlock, setHasPreviousBlock] = useState<boolean>(false);
  const [blockDetails, _setBlockDetails] = useState<BlockDetailsType>({
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
  const { getBlock, getBlockData } = useBlockchain();

  const getBlockDetails = useCallback(async () => {
    try {
      const rawBlock = await getBlock(Number(block));
      if (rawBlock) {
        const transactions: TransactionRow[] = rawBlock.transactions.map(
          (transaction, index) => {
            return {
              key: index + 1,
              rank: index + 1,
              id: index.toString(),
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
        return {
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
        };
      }
    } catch (e) {
      console.log(e);
    }
  }, [block, getBlock]);

  const checkSideBlocksExistence = useCallback(async () => {
    let hasPreviousBlock = false;
    let hasNextBlock = false;
    try {
      const blockData = await getBlockData();
      if (block > 1) {
        hasPreviousBlock = true;
      }
      if (blockData && block < blockData.head_block_number) {
        hasNextBlock = true;
      }
    } catch (e) {
      console.log(e);
    }
    return {
      hasPreviousBlock,
      hasNextBlock,
    };
  }, [getBlockData, block]);

  useEffect(() => {
    let ignore = false;
    async function setBlockDetails() {
      setLoading(true);
      const blockDetails = await getBlockDetails();
      if (!ignore && blockDetails) {
        _setBlockDetails(blockDetails);
        setLoading(false);
      }
    }
    setBlockDetails();
    return () => {
      ignore = true;
    };
  }, [getBlockDetails, setLoading, _setBlockDetails]);

  useEffect(() => {
    let ignore = false;
    async function setSideBlocksExistence() {
      setLoadingSideBlocks(true);
      const { hasPreviousBlock, hasNextBlock } =
        await checkSideBlocksExistence();
      if (!ignore) {
        setHasNextBlock(hasNextBlock);
        setHasPreviousBlock(hasPreviousBlock);
        setLoadingSideBlocks(false);
      }
    }
    setSideBlocksExistence();
    return () => {
      ignore = true;
    };
  }, [checkSideBlocksExistence]);

  return {
    blockDetails,
    loading,
    hasNextBlock,
    hasPreviousBlock,
    loadingSideBlocks,
  };
}
