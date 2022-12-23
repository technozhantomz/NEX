import { ChainValidation } from "peerplaysjs-lib";
import { ClipboardEvent, KeyboardEvent } from "react";

import { BITCOIN_NETWORK, defaultNetwork, HIVE_NETWORK } from "../params";

const id_regex = /\b\d+\.\d+\.(\d+)\b/;

export const utils = {
  sortID(a: string, b: string, inverse = false): number {
    // inverse = false => low to high
    const intA = parseInt(a.split(".")[2], 10);
    const intB = parseInt(b.split(".")[2], 10);

    return inverse ? intB - intA : intA - intB;
  },
  isObjectId: (obj_id: string): boolean => {
    if ("string" != typeof obj_id) return false;
    const match = id_regex.exec(obj_id);
    return match !== null && obj_id.split(".").length === 3;
  },
  trimNum: (num: number, digits: number): number => {
    // Early return if NaN
    if (isNaN(num)) {
      return 0;
    }
    const numString = num.toString();
    const decimalIndex = numString.indexOf(".");
    const subString =
      decimalIndex > 0
        ? numString.substring(0, decimalIndex + (digits + 1))
        : num;
    return parseFloat(subString as string);
  },
  isNumber: (input: string): boolean => {
    const numbers = "0123456789.";
    if (numbers.includes(input)) {
      return true;
    }
    return false;
  },
  isNumberKey: (e: KeyboardEvent<HTMLInputElement>): boolean => {
    return utils.isNumber(e.key);
  },
  ensureInputNumberValidity: (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      !utils.isNumberKey(e) ||
      (e.target as any).value.split(".")[0].length >= 6
    ) {
      e.preventDefault();
    }
  },
  numberedInputsPasteHandler: (e: ClipboardEvent<HTMLInputElement>): void => {
    const clipBoardData = e.clipboardData.getData("text");
    const isNumber = Array.from(clipBoardData)
      .map((char: string) => utils.isNumber(char))
      .every((_isNumber) => _isNumber);

    if (
      !isNumber ||
      ((e.target as any).value as string).length + clipBoardData.length >= 6
    ) {
      e.preventDefault();
    }
  },
  getBlockchainFromSymbol: (symbol: string): string => {
    const blockchains: Record<string, string> = {
      BTC: BITCOIN_NETWORK,
      PBTC: defaultNetwork,
      HIVE: HIVE_NETWORK,
      HBD: HIVE_NETWORK,
      PEOS: "EOSIO",
      EOS: "EOSIO",
      PETH: "Ethereum",
      ETH: "Ethereum",
      TEST: "PeerPlays",
      PPY: "PeerPlays",
    };
    return blockchains[symbol.toUpperCase()] || symbol;
  },
  validateGrapheneAccountName: (name: string): boolean => {
    const defaultErrors = ChainValidation.is_account_name_error(name);
    if (defaultErrors) {
      return false;
    }
    return /^[a-z](?!.*([-.])\\1)((?=.*(-))|(?=.*(\d)))[a-z0-9-.]{2,62}(?![-.])$/.test(
      name
    );
  },
  isUrlsEqual: (url1: string, url2: string): boolean => {
    let trimedUrl1 =
      url1[url1.length - 1] !== "/" ? url1 : url1.slice(0, url1.length - 1);
    trimedUrl1 = trimedUrl1.includes("//")
      ? trimedUrl1.split("//")[1]
      : trimedUrl1;

    let trimedUrl2 =
      url2[url2.length - 1] !== "/" ? url2 : url2.slice(0, url2.length - 1);
    trimedUrl2 = trimedUrl2.includes("//")
      ? trimedUrl2.split("//")[1]
      : trimedUrl2;

    return trimedUrl1 === trimedUrl2;
  },
};
