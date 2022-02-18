import { ChainTypes } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

// import { useUser } from "../../../context";
import { usePeerplaysApi } from "../../../modules/peerplaysApi";
import { useAsset } from "../useAsset";

import { IFee, IUseFees } from "./useFees.type";

export function useFees(): IUseFees {
  //   const { accountData } = useUser();
  const [fees, setFees] = useState<IFee[]>();
  const { getAssetById, setAssets } = useAsset();
  const { dbApi } = usePeerplaysApi();
  const operationsNames = Object.keys(ChainTypes.operations);

  useEffect(() => {
    getFees();
  }, []);

  const getFees = async () => {
    let operations: IFee[];
    const feeAsset = await getAssetById("1.3.0");
    const globalProps = await dbApi("get_global_properties").then(
      (e) => e["parameters"]["current_fees"]["parameters"]
    );
    operations = operationsNames.map((item, index) => ({
      name: item.split("_").join(" ").toUpperCase(),
      ...globalProps[index],
    }));

    operations = operations.map(async (item) => {
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
    });

    operations = await Promise.all(operations);

    setFees(operations);
    return operations;
  };

  const calculateFees = () => {};

  return {
    getFees,
  };
}
