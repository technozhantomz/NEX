import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../../../../../common/hooks";
import { TransactionRow } from "../../../../BlockDetails/hooks";

import {
  OperationRow,
  UseOperationsTableResult,
} from "./useOperationsTable.types";

export function useOperationsTable(
  transaction: TransactionRow
): UseOperationsTableResult {
  const [loading, setLoading] = useState(true);
  const [searchDataSource, setSearchDataSource] = useState<OperationRow[]>([]);
  const [operationsRows, setOperationsRows] = useState<OperationRow[]>([]);
  const [showDetials, setShowDetials] = useState<boolean>(false);
  const { getAssetById } = useAsset();

  const formOperationRows = useCallback(async () => {
    setLoading(true);
    try {
      if (transaction) {
        const operations: OperationRow[] = await Promise.all(
          transaction.operations.map(
            async (operation: unknown[], index: number) => {
              const operationDetails: any = operation[1];
              const operationResults: any = transaction.operationResults[index];
              const feeAsset = await getAssetById(
                operationDetails.fee.asset_id
              );
              const fees = `${operationDetails.fee.amount} ${feeAsset?.symbol}`;
              return {
                key: index + 1,
                number: index + 1,
                id: operation[0] as number,
                type: operationDetails.ts as string,
                fees: fees,
                details: JSON.stringify(operation),
                results: operationResults.toString() as string,
              };
            }
          )
        );
        setOperationsRows(operations);
        setSearchDataSource(operations);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setLoading,
    transaction,
    setOperationsRows,
    getAssetById,
    setSearchDataSource,
  ]);

  const toggleDetails = useCallback(() => {
    setShowDetials(showDetials ? false : true);
  }, [showDetials, setLoading]);

  useEffect(() => {
    formOperationRows();
  }, [formOperationRows]);

  return {
    loading,
    showDetials,
    searchDataSource,
    operationsRows,
    setSearchDataSource,
    toggleDetails,
  };
}
