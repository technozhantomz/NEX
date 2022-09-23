import { KeyboardEvent } from "react";

const id_regex = /\b\d+\.\d+\.(\d+)\b/;

export const utils = {
  sortID(a: string, b: string, inverse = false): number {
    // inverse = false => low to high
    const intA = parseInt(a.split(".")[2], 10);
    const intB = parseInt(b.split(".")[2], 10);

    return inverse ? intB - intA : intA - intB;
  },
  is_object_id: (obj_id: string): boolean => {
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
  isNumberKey: (e: KeyboardEvent<HTMLInputElement>): boolean => {
    const numbers = "0123456789.";
    if (numbers.includes(e.key)) {
      return true;
    }
    return false;
  },
  getBlockchainFromSymbol: (symbol: string): string => {
    const blockchains: Record<string, string> = {
      BTC: "Bitcoin",
      PBTC: "Bitcoin",
      HIVE: "Hive",
      HBD: "Hive",
      PEOS: "EOSIO",
      EOS: "EOSIO",
      PETH: "Ethereum",
      ETH: "Ethereum",
      TEST: "PeerPlays",
      PPY: "PeerPlays",
    };
    return blockchains[symbol] || symbol;
  },
  validateGrapheneAccountName: (name: string): boolean => {
    return /^[a-z](?!.*([-.])\\1)((?=.*(-))|(?=.*(\d)))[a-z0-9-.]{2,62}(?<![-.])$/.test(
      name
    );
  },
  //TODO: This should be completed
  isUrlsEqual: (url1: string, url2: string): boolean => {
    const trimedUrl1 =
      url1[url1.length - 1] !== "/" ? url1 : url1.slice(0, url1.length - 1);
    const trimedUrl2 =
      url2[url2.length - 1] !== "/" ? url2 : url2.slice(0, url2.length - 1);
    return trimedUrl1 === trimedUrl2;
  },
};
