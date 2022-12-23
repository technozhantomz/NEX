import { useCallback, useState } from "react";

import {
  ETHEREUM_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
} from "../../../../../api/params";
import { Form } from "../../../../../ui/src";

import { TransferForm, UseTransferResult } from "./useTransfer.types";

export function useTransfer(): UseTransferResult {
  const [selectedFromToken, setSelectedFromToken] =
    useState<string>(HIVE_ASSET_SYMBOL);
  const handleFromTokenChange = useCallback(
    (value: unknown) => {
      setSelectedFromToken(value as string);
    },
    [setSelectedFromToken]
  );

  const [selectedFromNetwork, setSelectedFromNetwork] =
    useState<string>(HIVE_ASSET_SYMBOL);
  const handleFromNetworkChange = useCallback(
    (value: unknown) => {
      setSelectedFromNetwork(value as string);
    },
    [setSelectedFromNetwork]
  );

  const [selectedToNetwork, setSelectedToNetwork] = useState<string>(
    ETHEREUM_ASSET_SYMBOL
  );
  const handleToNetworkChange = useCallback(
    (value: unknown) => {
      setSelectedToNetwork(value as string);
    },
    [setSelectedToNetwork]
  );

  const [transferAmount, setTransferAmount] = useState<string>("0.00");
  const handleTransferAmountChange = useCallback(
    (value: unknown) => {
      setTransferAmount(value as string);
    },
    [setTransferAmount]
  );

  const [transferForm] = Form.useForm<TransferForm>();

  const handleTransferSubmit = useCallback(async () => {
    console.log(
      // transferAmount,
      selectedFromNetwork,
      selectedFromToken,
      selectedToNetwork,
      transferForm
    );
  }, [
    // transferAmount,
    selectedFromNetwork,
    selectedFromToken,
    selectedToNetwork,
    transferForm,
  ]);

  const handleValuesChange = useCallback(async () => {
    transferForm.setFieldsValue({
      fromNetwork: selectedFromNetwork,
      fromToken: selectedFromToken,
      toNetwork: selectedToNetwork,
      transferAmount: transferAmount,
    });
  }, [
    selectedFromNetwork,
    selectedFromToken,
    selectedToNetwork,
    transferAmount,
    transferForm,
  ]);

  return {
    transferForm,
    handleFromTokenChange,
    selectedFromToken,
    handleFromNetworkChange,
    selectedFromNetwork,
    handleToNetworkChange,
    selectedToNetwork,
    transferAmount,
    handleTransferAmountChange,
    handleTransferSubmit,
    handleValuesChange,
  };
}
