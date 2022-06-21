import { ChainTypes, TransactionHelper } from "peerplaysjs-lib";
import { useCallback, useEffect, useState } from "react";

import { useAccount, useAsset } from "..";
import { usePeerplaysApiContext, useUserContext } from "../../providers";
import { Account, Asset, FeeParameter, GlobalProperties } from "../../types";

import {
  ChainOperations,
  CreateLimitOrderFee,
  UseFeesResult,
} from "./useFees.types";

export function useFees(): UseFeesResult {
  const [feeParameters, setFeeParameters] = useState<FeeParameter[]>([]);
  const [account, _setAccount] = useState<Account>();
  const { dbApi } = usePeerplaysApiContext();
  const { getAccountByName } = useAccount();
  const { localStorageAccount } = useUserContext();
  const defaultNonce = TransactionHelper.unique_nonce_uint64();
  const { defaultAsset, setPrecision } = useAsset();

  const setAccount = useCallback(async () => {
    const acc = await getAccountByName(localStorageAccount);
    if (acc) {
      _setAccount(acc);
    }
  }, [getAccountByName, localStorageAccount, _setAccount]);

  const getFeesFromGlobal = useCallback(async () => {
    try {
      const globalProperties: GlobalProperties = await dbApi(
        "get_global_properties"
      );
      const feeParameters = globalProperties.parameters.current_fees.parameters;
      setFeeParameters(feeParameters);
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, setFeeParameters]);

  const findOperationFee = useCallback(
    (operationType: string): FeeParameter | undefined => {
      const allOperationsTypes = Object.keys(ChainTypes.operations);
      if (!allOperationsTypes.find((type) => type === operationType)) {
        return undefined;
      }
      const operations = ChainTypes.operations as ChainOperations;
      const operationNumber = operations[operationType];
      const selectedFeeParameter = feeParameters.find(
        (feeParameter) => feeParameter[0] === operationNumber
      );
      return selectedFeeParameter;
    },
    [feeParameters, feeParameters.length]
  );

  const calculateTransferFee = useCallback(
    (memo: string) => {
      if (account && feeParameters.length && defaultAsset) {
        const transferFeeParameter = findOperationFee(
          "transfer"
        ) as FeeParameter;
        const transferFee = transferFeeParameter[1];
        let feeAmount = transferFee.fee as number;

        if (memo && memo.length > 0) {
          const rawAdditional = transferFee.price_per_kbyte as number;
          const memoLength = JSON.stringify(account.options.memo_key).length;
          const helperLength = JSON.stringify(defaultNonce).length;
          const result =
            ((memoLength + helperLength + memo.length) / 1024) * rawAdditional;

          feeAmount = feeAmount + result;
        }

        return setPrecision(true, feeAmount, defaultAsset.precision);
      }
    },
    [
      feeParameters,
      feeParameters.length,
      findOperationFee,
      account,
      defaultAsset,
    ]
  );

  const calculateAccountUpgradeFee = useCallback(() => {
    if (feeParameters.length && defaultAsset) {
      const accountUpgradeFeeParameter = findOperationFee(
        "account_upgrade"
      ) as FeeParameter;
      const accountUpgradeFee = accountUpgradeFeeParameter[1];
      const membershipLifetimeFee =
        accountUpgradeFee.membership_lifetime_fee as number;

      return setPrecision(false, membershipLifetimeFee, defaultAsset.precision);
    }
  }, [
    feeParameters,
    feeParameters.length,
    findOperationFee,
    defaultAsset,
    setPrecision,
  ]);

  const calculateCancelLimitOrderFee = useCallback(() => {
    if (feeParameters.length && defaultAsset) {
      const cancelLimitOrderFeeParameter = findOperationFee(
        "limit_order_cancel"
      ) as FeeParameter;
      const cancelLimitOrderFee = cancelLimitOrderFeeParameter[1].fee as number;

      return setPrecision(false, cancelLimitOrderFee, defaultAsset.precision);
    }
  }, [
    feeParameters,
    feeParameters.length,
    findOperationFee,
    defaultAsset,
    setPrecision,
  ]);

  const calculateCreateLimitOrderFee = useCallback(
    (base: Asset, quote: Asset) => {
      if (feeParameters.length && defaultAsset) {
        const createLimitOrderFeeParameter = findOperationFee(
          "limit_order_create"
        ) as FeeParameter;
        const createLimitOrderFee = createLimitOrderFeeParameter[1]
          .fee as number;
        let buyMarketFeePercent = 0;
        let sellMarketFeePercent = 0;

        if (base.symbol !== defaultAsset.symbol) {
          sellMarketFeePercent = base.options.market_fee_percent / 100;
        }
        if (quote.symbol !== defaultAsset.symbol) {
          buyMarketFeePercent = quote.options.market_fee_percent / 100;
        }
        return {
          fee: setPrecision(false, createLimitOrderFee, defaultAsset.precision),
          sellMarketFeePercent,
          buyMarketFeePercent,
        } as CreateLimitOrderFee;
      }
    },
    [
      feeParameters,
      feeParameters.length,
      setPrecision,
      defaultAsset,
      findOperationFee,
    ]
  );

  const calculateGposVestingFee = useCallback(() => {
    if (feeParameters.length && defaultAsset) {
      const gposVestingFeeParameters = findOperationFee(
        "vesting_balance_create"
      ) as FeeParameter;
      const gposVestingFee = gposVestingFeeParameters[1];
      const feeAmount = gposVestingFee.fee as number;
      return setPrecision(false, feeAmount, defaultAsset.precision);
    }
  }, [
    feeParameters,
    feeParameters.length,
    defaultAsset,
    findOperationFee,
    setPrecision,
  ]);

  const calculateGposWithdrawFee = useCallback(() => {
    if (feeParameters.length && defaultAsset) {
      const gposWithdrawFeeParameters = findOperationFee(
        "vesting_balance_withdraw"
      ) as FeeParameter;
      const gposWithdrawFeeFee = gposWithdrawFeeParameters[1];
      const feeAmount = gposWithdrawFeeFee.fee as number;
      return setPrecision(false, feeAmount, defaultAsset.precision);
    }
  }, [
    feeParameters,
    feeParameters.length,
    defaultAsset,
    findOperationFee,
    setPrecision,
  ]);

  useEffect(() => {
    getFeesFromGlobal();
    setAccount();
  }, [localStorageAccount, dbApi]);

  return {
    feeParameters,
    findOperationFee,
    calculateTransferFee,
    calculateAccountUpgradeFee,
    calculateCreateLimitOrderFee,
    calculateCancelLimitOrderFee,
    calculateGposVestingFee,
    calculateGposWithdrawFee,
  };
}
