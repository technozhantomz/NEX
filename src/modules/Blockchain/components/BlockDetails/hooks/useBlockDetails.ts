import { useCallback, useEffect, useState } from "react";

import { useBlockchain, useFormDate } from "../../../../../common/hooks";
import {
  DataTableRow,
  TransactionRow,
} from "../../BlockchainTab/hooks/useBlockchainTab.types";

import { UseBlockDetailsResult } from "./useBlockDetails.types";

export function useBlockDetails(
  block: number,
  transactionNum?: number
): UseBlockDetailsResult {
  const [hasNextBlock, setHasNextBlock] = useState<boolean>(false);
  const [hasPreviousBlock, setHasPreviousBlock] = useState<boolean>(false);
  const [hasNextTransition, setHasNextTransition] = useState<boolean>(false);
  const [hasPreviousTransition, setHasPreviousTransition] =
    useState<boolean>(false);
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
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionRow>({
      rank: 0,
      id: "",
      expiration: "",
      operations: [],
      operationResults: [],
      refBlockPrefix: 0,
      refBlockNum: 0,
      extensions: [],
      signatures: [],
    });
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSideBlocks, setLoadingSideBlocks] = useState<boolean>(true);
  const [loadingSideTransactions, setLoadingSideTransactions] =
    useState<boolean>(true);
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
        if (transactionNum) {
          const transactionIndex = transactionNum - 1;
          setSelectedTransaction(transactions[transactionIndex]);
        }
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

  const getSideTransactions = useCallback(async () => {
    try {
      if (transactionNum !== undefined) {
        const transactionNumAsIndex = transactionNum - 1;
        setLoadingSideTransactions(true);
        const nextTransaction =
          blockDetails.transactions[transactionNumAsIndex + 1];
        if (nextTransaction) {
          setHasNextTransition(true);
        } else {
          setHasNextTransition(false);
        }
        const previousTransaction =
          blockDetails.transactions[transactionNumAsIndex - 1];
        if (previousTransaction) {
          setHasPreviousTransition(true);
        } else {
          setHasPreviousTransition(false);
        }
        setLoadingSideTransactions(false);
      }
    } catch (e) {
      console.log(e);
      setHasNextTransition(false);
      setHasPreviousTransition(false);
      setLoadingSideTransactions(false);
    }
  }, [
    blockDetails,
    transactionNum,
    getBlock,
    setHasNextTransition,
    setHasPreviousTransition,
  ]);

  useEffect(() => {
    getBlockDetails();
  }, [block]);

  useEffect(() => {
    getSideBlocks();
  }, [getSideBlocks]);

  useEffect(() => {
    getSideTransactions();
  }, [transactionNum, selectedTransaction, getSideTransactions]);

  return {
    blockDetails,
    loading,
    hasNextBlock,
    hasPreviousBlock,
    loadingSideBlocks,
    hasNextTransition,
    hasPreviousTransition,
    loadingSideTransactions,
    selectedTransaction,
  };
}
