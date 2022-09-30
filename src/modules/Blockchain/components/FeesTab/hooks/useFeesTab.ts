import counterpart from "counterpart";
import { ChainTypes } from "peerplaysjs-lib";
import { useCallback, useEffect, useState } from "react";

import { useAsset } from "../../../../../common/hooks";
import {
  useAssetsContext,
  useFeesContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import {
  FeesTableRow,
  OperationWithFeeParameter,
  UseFeesTabResult,
} from "./useFeesTab.types";

export function useFeesTab(): UseFeesTabResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchDataSource, setSearchDataSource] = useState<FeesTableRow[]>([]);
  const [fullFeesRows, setFullFeesRows] = useState<FeesTableRow[]>([]);
  const { feeParameters } = useFeesContext();
  const { setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();

  const getFees = useCallback(async () => {
    setLoading(true);
    const allOperationsTypes = Object.keys(ChainTypes.operations);
    const feeGrouping = {
      general: [
        0, 25, 26, 27, 28, 32, 33, 37, 39, 40, 41, 81, 116, 117, 118, 119,
      ],
      asset: [
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 38, 42, 43, 44, 48, 49, 77, 92,
        93, 94, 95, 96, 97,
      ],
      market: [1, 2, 3, 4],
      account: [
        5, 6, 7, 8, 9, 82, 83, 84, 85, 86, 87, 98, 99, 100, 113, 114, 115,
      ],
      business: [
        20, 21, 22, 23, 24, 29, 30, 31, 34, 35, 36, 101, 102, 103, 104, 105,
        106, 107, 108,
      ],
      game: [
        45, 46, 47, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
        65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 78, 79, 80, 89,
      ],
    };
    if (feeParameters && feeParameters.length > 0 && defaultAsset) {
      const operations: OperationWithFeeParameter[] = allOperationsTypes.map(
        (type, index) => ({
          type: type,
          feeParameter: feeParameters[index],
        })
      );
      let generalOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.general.includes(operation.feeParameter[0])
      );
      generalOperations = generalOperations.filter(
        (generalOperation) =>
          Object.keys(generalOperation.feeParameter[1]).length > 0
      );

      let assetOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.asset.includes(operation.feeParameter[0])
      );
      assetOperations = assetOperations.filter(
        (assetOperation) =>
          Object.keys(assetOperation.feeParameter[1]).length > 0
      );

      let marketOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.market.includes(operation.feeParameter[0])
      );
      marketOperations = marketOperations.filter(
        (marketOperation) =>
          Object.keys(marketOperation.feeParameter[1]).length > 0
      );

      let accountOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.account.includes(operation.feeParameter[0])
      );
      accountOperations = accountOperations.filter(
        (accountOperation) =>
          Object.keys(accountOperation.feeParameter[1]).length > 0
      );

      let businessOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.business.includes(operation.feeParameter[0])
      );
      businessOperations = businessOperations.filter(
        (businessOperation) =>
          Object.keys(businessOperation.feeParameter[1]).length > 0
      );

      let gameOperations = operations.filter(
        (operation) =>
          operation.feeParameter &&
          feeGrouping.game.includes(operation.feeParameter[0])
      );
      gameOperations = gameOperations.filter(
        (gameOperation) => Object.keys(gameOperation.feeParameter[1]).length > 0
      );

      const generalRows = generalOperations.map((operation) =>
        formFeeRow(operation, "General")
      );
      const assetRows = assetOperations.map((operation) =>
        formFeeRow(operation, "Asset Specific")
      );
      const accountRows = accountOperations.map((operation) =>
        formFeeRow(operation, "Account Specific")
      );
      const marketRows = marketOperations.map((operation) =>
        formFeeRow(operation, "Market Specific")
      );
      const businessRows = businessOperations.map((operation) =>
        formFeeRow(operation, "Business Administration")
      );
      const gameRows = gameOperations.map((operation) =>
        formFeeRow(operation, "Game Specific")
      );
      const fullRows = generalRows.concat(
        assetRows,
        accountRows,
        marketRows,
        businessRows,
        gameRows
      );

      setFullFeesRows(fullRows);
      setLoading(false);
    }
  }, [feeParameters, defaultAsset, setPrecision, setLoading, setFullFeesRows]);

  const formFeeRow = useCallback(
    (
      operationWithFeeParameter: OperationWithFeeParameter,
      category: string
    ): FeesTableRow => {
      return {
        key: operationWithFeeParameter.type,
        category,
        operation: counterpart.translate(
          `transaction.trxTypes.${operationWithFeeParameter.type}.title`
        ),
        types: Object.keys(operationWithFeeParameter.feeParameter[1]).map(
          (key) => counterpart.translate(`transaction.feeTypes.${key}`)
        ),
        fees: Object.values(operationWithFeeParameter.feeParameter[1]).map(
          (feeValue) => {
            if (feeValue === 0) {
              return counterpart.translate("transaction.feeTypes._none");
            } else {
              return `${setPrecision(
                false,
                feeValue,
                (defaultAsset as Asset).precision
              ).toString()} ${defaultAsset?.symbol}`;
            }
          }
        ),
      };
    },

    [defaultAsset]
  );

  useEffect(() => {
    getFees();
  }, [feeParameters, defaultAsset]);

  useEffect(() => {
    if (searchDataSource.length === 0) {
      setSearchDataSource(fullFeesRows);
    }
  }, [fullFeesRows]);

  return {
    loading,
    searchDataSource,
    fullFeesRows,
    setSearchDataSource,
  };
}
