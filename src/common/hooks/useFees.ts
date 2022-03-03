import { ChainTypes, TransactionHelper } from "peerplaysjs-lib";
import { useEffect } from "react";

import { usePeerplaysApiContext } from "../components/PeerplaysApiProvider";
import { useUserContext } from "../components/UserProvider";

import { useAccount } from "./account/useAccount";
import { useAsset } from "./useAsset";
import { Fee, UseFees } from "./useFees.types";
import { useLocalStorage } from "./useLocalStorage";

export function useFees(): UseFees {
  const defaultNonce = TransactionHelper.unique_nonce_uint64();
  const [jsonFees, setJsonFees] = useLocalStorage("fees");
  const { localStorageAccount } = useUserContext();
  const { getAccountByName } = useAccount();
  const { getAssetById, setAssets } = useAsset();
  const { dbApi } = usePeerplaysApiContext();
  const operationsNames = Object.keys(ChainTypes.operations);

  useEffect(() => {
    getFees();
  }, [jsonFees]);

  const getFees = async () => {
    if (jsonFees) return jsonFees;
    let operations: Fee[];
    const feeAsset = await getAssetById("1.3.0");
    const globalProps = await dbApi("get_global_properties").then(
      (e: { [x: string]: { [x: string]: { [x: string]: unknown } } }) =>
        e["parameters"]["current_fees"]["parameters"]
    );
    operations = operationsNames.map((item, index) => ({
      name: item.split("_").join(" ").toUpperCase(),
      ...globalProps[index],
    }));

    operations = await Promise.all(
      operations.map(async (item) => {
        if ("1" in item) {
          const assetId = feeAsset.id;
          return {
            fee:
              "fee" in item[1]
                ? await setAssets(assetId, Number(item[1]["fee"]))
                : 0,
            membership_lifetime_fee:
              "membership_lifetime_fee" in item[1]
                ? await setAssets(
                    assetId,
                    Number(item[1]["membership_lifetime_fee"])
                  )
                : 0,
            price_per_kbyte:
              "price_per_kbyte" in item[1]
                ? await setAssets(assetId, Number(item[1]["price_per_kbyte"]))
                : 0,
            name: item["name"],
          };
        } else {
          return {
            fee: "",
            membership_lifetime_fee: "",
            price_per_kbyte: "",
            name: item["name"],
          };
        }
      })
    );
    setJsonFees(operations);
    return operations;
  };

  const calculateFees = async (type: string, memo: string) => {
    const account = await getAccountByName(localStorageAccount);
    const feeData = jsonFees?.find((fee) => fee.name.toLowerCase() === type);
    let feeAmount = feeData.fee;

    if (memo && memo.length > 0) {
      const rawAdditional = feeData.price_per_kbyte;
      const memoLength = JSON.stringify(account.options.memo_key).length;
      const helperLength = JSON.stringify(defaultNonce).length;
      const result =
        ((memoLength + helperLength + memo.length) / 1024) * rawAdditional;

      feeAmount = feeAmount + result;
    }

    return feeAmount;
  };

  const feeCalculator = {
    transfer: async (memo: string) => await calculateFees("transfer", memo),
  };

  return {
    getFees,
    feeCalculator,
  };
}
