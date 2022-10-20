import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../../../../../common/hooks";
import { TransactionRow } from "../../../../BlockchainTab/hooks/useBlockchainTab.types";

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
  const { getAssetById } = useAsset();

  const formOperationRows = useCallback(async () => {
    setLoading(true);
    try {
      if (transaction) {
        const operations = transaction.operations.map(
          (operation: unknown[], index: number) => {
            const operationDetails = operation[1];
            const operationResults = transaction.operationResults[index];
            const fees = `${operationDetails.fee.amount} ${getAssetById(
              operationDetails.fee.asset_id
            )}`;
            return {
              number: index + 1,
              id: operation[0] as number,
              type: operationDetails.ts as string,
              fees: fees as string,
              details: {
                details: JSON.stringify(operationDetails),
                results: operationResults.toString(),
              },
            };
          }
        );
        setOperationsRows(operations);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [transaction, setOperationsRows]);

  useEffect(() => {
    formOperationRows();
  }, [transaction]);

  return {
    loading,
    searchDataSource,
    operationsRows,
    setSearchDataSource,
  };
}
