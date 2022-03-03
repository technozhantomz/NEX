import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from "ecpair";
import { useState } from "react";
import { RegtestUtils } from "regtest-client";
import * as ecc from "tiny-secp256k1";

import { useTransactionBuilder } from "../../../../../../../common/hooks/useTransactionBuilder";

import { AddressDetails } from "./useAddress.types";

export function useGenerateAddress() {
  const [key, setKey] = useState(0);
  const [addresses, setAddresses] = useState<AddressDetails[]>([]);
  const { trxBuilder } = useTransactionBuilder();
  // const [depositAddress, setDepositAddress] = useState([]);

  const generateAddress = async () => {
    const ECPair = ECPairFactory(ecc);
    const generatedAddress = [];
    let depositAddress = [];

    for (let i = 0; i <= 1; i++) {
      const keyPair = ECPair.makeRandom();

      const address = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
      generatedAddress.push(address);
    }
    console.log(generatedAddress);
    depositAddress = generatedAddress[0];
    console.log(depositAddress);
  };

  return { generateAddress, key };
}
