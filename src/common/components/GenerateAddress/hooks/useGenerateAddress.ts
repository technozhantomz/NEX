import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { FormFinishInfo } from "rc-field-form";
import { useCallback, useState } from "react";
import * as ecc from "tiny-secp256k1";

import { useAccount, useSidechainAccounts } from "../../../hooks";
import { useTransactionBuilder } from "../../../hooks/useTransactionBuilder";
import { useUserContext } from "../../UserProvider";

import { GenerateAddress } from "./useGenerateAddress.types";

export function useGenerateAddress(): GenerateAddress {
  const { getSidechainAccounts } = useSidechainAccounts();
  const [visible, setVisible] = useState<boolean>(false);
  const { trxBuilder } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const { id, setSidechainAcccounts } = useUserContext();

  const toHex = (buffer: any) => {
    return Array.from(buffer)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const defaultHandleAssetChange = (
    value: unknown,
    option:
      | DefaultOptionType
      | BaseOptionType
      | (DefaultOptionType | BaseOptionType)[]
  ) => {
    console.log(value);
    console.log(option);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const confirm = () => {
    setVisible(true);
  };

  const onFormFinish = (name: string, info: FormFinishInfo) => {
    const { values, forms } = info;
    const { passwordModal } = forms;
    if (name === "passwordModal") {
      passwordModal.validateFields().then(() => {
        generateAddress(values.password);
      });
    }
  };

  const generateAddress = useCallback(async (password: string) => {
    const ECPair = ECPairFactory(ecc);
    const generatedAddress = [];

    for (let i = 0; i <= 1; i++) {
      const keyPair = ECPair.makeRandom();

      const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      generatedAddress.push(address);
    }

    const fees = { amount: 0, asset_id: "1.3.0" };
    const activeKey = getPrivateKey(password, "active");
    const trx = {
      type: "sidechain_address_add",
      params: {
        fee: fees,
        payer: id,
        sidechain_address_account: id,
        sidechain: "bitcoin",
        deposit_public_key: toHex(generatedAddress[0].pubkey),
        deposit_address: "",
        deposit_address_data: "",
        withdraw_public_key: toHex(generatedAddress[1].pubkey),
        withdraw_address: generatedAddress[1].address,
      },
    };

    let trxResult;

    try {
      console.log(trx);
      trxResult = await trxBuilder([trx], [activeKey]);
    } catch (error) {
      console.log(error);
      setVisible(false);
    }

    if (trxResult) {
      const sidechainAcccounts = await getSidechainAccounts(id);
      setSidechainAcccounts(sidechainAcccounts);
      setVisible(false);
    }
  }, []);

  return { visible, onCancel, onFormFinish, confirm, defaultHandleAssetChange };
}
