/** @format */

import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { useCallback, useState } from "react";
import { RegtestUtils } from "regtest-client";
import * as ecc from "tiny-secp256k1";

import { useUserContext } from "../../../../../../../common/components/UserProvider";
import { useTransactionBuilder } from "../../../../../../../common/hooks/useTransactionBuilder";

import { AddressDetails } from "./useAddress.types";

export function useGenerateAddress(): GenerateAddress {
  const [key, setKey] = useState(0);
  const [addresses, setAddresses] = useState<AddressDetails[]>([]);
  const [depositPublicKey, setDepositPublicKey] = useState("");
  const { trxBuilder } = useTransactionBuilder();
  const { id } = useUserContext();

  const toHex = (buffer: any) => {
    return Array.from(buffer)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const generateAddress = useCallback(async () => {
    const ECPair = ECPairFactory(ecc);
    const generatedAddress = [];

    for (let i = 0; i <= 1; i++) {
      const keyPair = ECPair.makeRandom();

      const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      generatedAddress.push(address);
    }

    const fees = { amount: 0, asset_id: "1.3.0" };

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

    try {
      console.log(trx);
      const activeKey = ["vijaythopate"];
      const trxResult = await trxBuilder([trx], [activeKey]);
      console.log(trxResult);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { generateAddress };
}
