import { useCallback, useState } from "react";

import {
  ETHEREUM_ASSET_SYMBOL,
  HIVE_ASSET_SYMBOL,
  HIVE_NETWORK,
} from "../../../../../api/params";
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../common/providers";
import { Form } from "../../../../../ui/src";

import { TransferForm, UseTransferResult } from "./useTransfer.types";

export function useTransfer(): UseTransferResult {
  const { sidechainAccounts } = useUserContext();
  const { sidechainAssets } = useAssetsContext();
  const hivePrecision =
    sidechainAssets?.find((asset) => asset?.symbol === HIVE_ASSET_SYMBOL)
      ?.precision ?? 3;
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

  const handleHiveDeposit = useCallback(async () => {
    const { transferAmount } = transferForm.getFieldsValue();
    const keychain = window.hive_keychain;
    keychain.requestCustomJson(
      null,
      "spkcc_send",
      "Active",
      JSON.stringify({
        to: "peerlink-treasury",
        amount: Math.round(Number(transferAmount) * 10 ** hivePrecision),
        memo: "PeerLink transfer",
        from: sidechainAccounts.find(
          (account) => account.sidechain === HIVE_NETWORK
        )?.deposit_address,
      }),
      `Deposit ${transferAmount} LARNYX`,
      (response: string) => {
        console.log(response);
      }
    );
  }, [transferForm, hivePrecision]);

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
    handleHiveDeposit,
  };
}
