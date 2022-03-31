import { useCallback, useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useAsset, useBlockchain } from "../../../../../common/hooks";

import { WitnessData, WitnessesTab } from "./useWitnessTab.types";

export function useWitnessTab(): WitnessesTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [witnesses, setWitnesses] = useState<WitnessData>({
    // activeWitnesses: 0,
    // reward: 0,
    // earnings: 0,
    data: [],
    // stats: {
    //   active: [],
    //   reward: [],
    //   earnings: [],
    // },
  });
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById, setPrecision } = useAsset();
  const { getChainData, getAvgBlockTime } = useBlockchain();

  useEffect(() => {
    getWitnessData();
    // setInterval(() => getWitnessData(), 3000);
  }, [defaultAsset]);

  const getWitnessData = useCallback(async () => {
    if (defaultAsset) {
      const witnessesID = await dbApi("lookup_witness_accounts", [
        "",
        100,
      ]).then((e: any) => e);

      const activeUsers = await dbApi("get_global_properties").then(
        (e: any) => e
      );

      const rawWitnesses = await dbApi("get_witnesses", [
        witnessesID.map((item: any[]) => item[1]),
      ]).then(async (e: any) => {
        let allWitnesses = e.map(
          async (
            item: {
              total_votes: any;
              id: any;
              url: any;
            },
            index: number
          ) => {
            const votesAsset = await formAssetBalanceById(
              defaultAsset.id,
              Number(item.total_votes)
            );
            return {
              name: witnessesID.filter(
                (name: any[]) => name[1] === item.id
              )[0][0],
              totalVotes: `${item.total_votes} ${votesAsset.symbol}`,
              url: item.url,
            };
          }
        );

        allWitnesses = await Promise.all(allWitnesses);
        console.log(allWitnesses);
        // return allWitnesses;
        return allWitnesses.map((item: any) => ({
          ...item,
          active: activeUsers["active_witnesses"].indexOf(item.id) >= 0,
        }));
      });

      setWitnesses({
        data: rawWitnesses,
      });
    }
  }, [witnesses, defaultAsset]);

  const getDaysInThisMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const updateStatsArray = (arr: number[], value: number) => {
    if (arr.length >= 99) {
      arr.shift();
      arr.push(value);
      return arr;
    }
    arr.push(value);
    return arr;
  };

  const onSearch = async (name: string) => {
    setLoading(true);
    setSearchValue(name);
    setLoading(false);
  };

  return { loading, witnesses, searchValue, onSearch };
}
