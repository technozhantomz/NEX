import counterpart from "counterpart";
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
  validatePeerplaysAccountName: (
    name: string
  ): { isValid: boolean; error?: string } => {
    let suffix = "";

    suffix = counterpart.translate(
      "field.errors.account_creation_errors.account_should"
    );

    const length = name.length;
    if (!/^[~a-z]/.test(name)) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.account_creation_errors.start_with_letter"
          ),
      };
    }
    if (length < 2) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.account_creation_errors.be_longer"
          ),
      };
    }
    if (length > 62) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.account_creation_errors.be_shorter"
          ),
      };
    }
    if (/\./.test(name)) {
      suffix = counterpart.translate(
        "field.errors.account_creation_errors.account_segment_should"
      );
    }
    const ref = name.split(".");

    for (let i = 0, len = ref.length; i < len; i++) {
      const label = ref[i];
      if (!/^[~a-z]/.test(label)) {
        return {
          isValid: false,
          error:
            suffix +
            counterpart.translate(
              "field.errors.account_creation_errors.start_with_letter"
            ),
        };
      }
      if (!/^[~a-z0-9-]*$/.test(label)) {
        return {
          isValid: false,
          error:
            suffix +
            counterpart.translate(
              "field.errors.account_creation_errors.have_letters_digits_dashes"
            ),
        };
      }
      if (/--/.test(label)) {
        return {
          isValid: false,
          error:
            suffix +
            counterpart.translate(
              "field.errors.account_creation_errors.have_one_dash_in_row"
            ),
        };
      }
      if (!/[a-z0-9]$/.test(label)) {
        return {
          isValid: false,
          error:
            suffix +
            counterpart.translate(
              "field.errors.account_creation_errors.end_letter_digit"
            ),
        };
      }
      if (label.length < 2) {
        return {
          isValid: false,
          error:
            suffix +
            counterpart.translate(
              "field.errors.account_creation_errors.be_longer"
            ),
        };
      }
    }

    return { isValid: true };
  },
  validateHiveAccount: (name: string): { isValid: boolean; error?: string } => {
    let suffix = "";

    suffix = counterpart.translate(
      "field.errors.hive_account_errors.account_should"
    );

    const length = name.length;

    if (length < 3) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate("field.errors.hive_account_errors.be_longer"),
      };
    }
    if (length > 16) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate("field.errors.hive_account_errors.be_shorter"),
      };
    }
    if (!/^[~a-z]/.test(name)) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.hive_account_errors.start_with_letter"
          ),
      };
    }
    if (!/^[~a-z0-9-]*$/.test(name)) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.hive_account_errors.have_letters_digits_dashes"
          ),
      };
    }
    if (!/[a-z0-9]$/.test(name)) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.hive_account_errors.end_letter_digit"
          ),
      };
    }
    if (/--/.test(name)) {
      return {
        isValid: false,
        error:
          suffix +
          counterpart.translate(
            "field.errors.hive_account_errors.have_one_dash_in_row"
          ),
      };
    }
    return { isValid: true };
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
