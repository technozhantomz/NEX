import counterpart from "counterpart";
import { ChainTypes } from "peerplaysjs-lib";
import { useCallback, useEffect, useState } from "react";

import { useAsset, useFees } from "../../../../../common/hooks";
import { Asset } from "../../../../../common/types";

import {
  FeesTableRow,
  OperationWithFeeParameter,
  UseFeesTabResult,
} from "./useFeesTab.types";

export function useFeesTab(): UseFeesTabResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [generalFeesRows, setGeneralFeesRows] = useState<FeesTableRow[]>([]);
  const [assetFeesRows, setAssetFeesRows] = useState<FeesTableRow[]>([]);
  const [accountFeesRows, setAccountFeesRows] = useState<FeesTableRow[]>([]);
  const [businessFeesRows, setBusinessFeesRows] = useState<FeesTableRow[]>([]);
  const [gameFeesRows, setGameFeesRows] = useState<FeesTableRow[]>([]);
  const [marketFeesRows, setMarketFeesRows] = useState<FeesTableRow[]>([]);
  const { feeParameters } = useFees();
  const { defaultAsset, setPrecision } = useAsset();

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

      let generalOperations = operations.filter((operation) =>
        feeGrouping.general.includes(operation.feeParameter[0])
      );
      generalOperations = generalOperations.filter(
        (generalOperation) =>
          Object.keys(generalOperation.feeParameter[1]).length > 0
      );

      let assetOperations = operations.filter((operation) =>
        feeGrouping.asset.includes(operation.feeParameter[0])
      );
      assetOperations = assetOperations.filter(
        (assetOperation) =>
          Object.keys(assetOperation.feeParameter[1]).length > 0
      );

      let marketOperations = operations.filter((operation) =>
        feeGrouping.market.includes(operation.feeParameter[0])
      );
      marketOperations = marketOperations.filter(
        (marketOperation) =>
          Object.keys(marketOperation.feeParameter[1]).length > 0
      );

      let accountOperations = operations.filter((operation) =>
        feeGrouping.account.includes(operation.feeParameter[0])
      );
      accountOperations = accountOperations.filter(
        (accountOperation) =>
          Object.keys(accountOperation.feeParameter[1]).length > 0
      );

      let businessOperations = operations.filter((operation) =>
        feeGrouping.business.includes(operation.feeParameter[0])
      );
      businessOperations = businessOperations.filter(
        (businessOperation) =>
          Object.keys(businessOperation.feeParameter[1]).length > 0
      );

      let gameOperations = operations.filter((operation) =>
        feeGrouping.game.includes(operation.feeParameter[0])
      );
      gameOperations = gameOperations.filter(
        (gameOperation) => Object.keys(gameOperation.feeParameter[1]).length > 0
      );

      setGeneralFeesRows(generalOperations.map(formFeeRow));
      setAssetFeesRows(assetOperations.map(formFeeRow));
      setAccountFeesRows(accountOperations.map(formFeeRow));
      setBusinessFeesRows(businessOperations.map(formFeeRow));
      setGameFeesRows(gameOperations.map(formFeeRow));
      setMarketFeesRows(marketOperations.map(formFeeRow));
      setLoading(false);
    }
  }, [
    feeParameters,
    defaultAsset,
    setPrecision,
    setLoading,
    setGeneralFeesRows,
    setAssetFeesRows,
    setAccountFeesRows,
    setGameFeesRows,
    setBusinessFeesRows,
    setMarketFeesRows,
  ]);

  const formFeeRow = useCallback(
    (operationWithFeeParameter: OperationWithFeeParameter): FeesTableRow => {
      return {
        key: operationWithFeeParameter.type,
        operation: counterpart.translate(
          `transaction.trxTypes.${operationWithFeeParameter.type}`
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

  return {
    loading,
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows,
  };
}
