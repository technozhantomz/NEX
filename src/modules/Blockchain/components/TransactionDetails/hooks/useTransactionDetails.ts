import { useCallback, useEffect, useState } from "react";

import { useBlockchain } from "../../../../../common/hooks";
import { TransactionRow } from "../../BlockDetails/hooks";

import { UseTransactionDetails } from "./useTransactionDetails.types";

export function useTransactionDetails(
  block: number,
  transactionNum?: number
): UseTransactionDetails {
  const [loading, setLoading] = useState<boolean>(true);
  const [hasNextTransition, setHasNextTransition] = useState<boolean>(false);
  const [hasPreviousTransition, setHasPreviousTransition] =
    useState<boolean>(false);
  const [loadingSideTransactions, setLoadingSideTransactions] =
    useState<boolean>(true);
  const [blockTransactions, setBlockTransactions] = useState<TransactionRow[]>(
    []
  );
  const [transactionDetails, setTransactionDetails] = useState<TransactionRow>({
    key: 0,
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
  const { getBlock } = useBlockchain();

  const getTransactionDetails = useCallback(async () => {
    try {
      setLoading(true);
      if (transactionNum !== undefined) {
        const transactionNumAsIndex = transactionNum - 1;
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
          setBlockTransactions(transactions);
          setTransactionDetails(transactions[transactionNumAsIndex]);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    getBlock,
    block,
    transactionNum,
    setBlockTransactions,
    setTransactionDetails,
    setLoading,
  ]);

  const getSideTransactions = useCallback(async () => {
    try {
      if (transactionNum !== undefined) {
        setLoadingSideTransactions(true);
        const transactionNumAsIndex = transactionNum - 1;
        const nextTransaction = blockTransactions[transactionNumAsIndex + 1];
        if (nextTransaction) {
          setHasNextTransition(true);
        } else {
          setHasNextTransition(false);
        }
        const previousTransaction =
          blockTransactions[transactionNumAsIndex - 1];
        if (previousTransaction) {
          setHasPreviousTransition(true);
        } else {
          setHasPreviousTransition(false);
        }
        setLoadingSideTransactions(false);
      } else {
        setLoadingSideTransactions(false);
      }
    } catch (e) {
      console.log(e);
      setHasNextTransition(false);
      setHasPreviousTransition(false);
      setLoadingSideTransactions(false);
    }
  }, [
    transactionDetails,
    transactionNum,
    blockTransactions,
    getTransactionDetails,
    setHasNextTransition,
    setHasPreviousTransition,
    setLoadingSideTransactions,
  ]);

  useEffect(() => {
    getTransactionDetails();
  }, [getTransactionDetails]);

  useEffect(() => {
    getSideTransactions();
  }, [getSideTransactions]);

  return {
    loading,
    blockTransactions,
    transactionDetails,
    hasNextTransition,
    hasPreviousTransition,
    loadingSideTransactions,
  };
}
