import { useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useAsset } from "../../../../../common/hooks";

import { WitnessData, WitnessesTab } from "./useWitnessesTab.types";

export function useWitnessesTab(): WitnessesTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [witnesses, setWitnesses] = useState<WitnessData>({
    activeWitnesses: 0,
    reward: 0,
    earnings: 0,
    data: [],
    stats: {
      active: [],
      reward: [],
      earnings: [],
    },
  });
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById } = useAsset();

  useEffect(() => {
    setInterval(() => getWitnessData(), 3000);
  }, [defaultAsset]);

  const getWitnessData = async () => {
    if (defaultAsset) {
      const witnessesID = await dbApi("lookup_witness_accounts", [
        "",
        100,
      ]).then((e) => e);
      const rawWitnesses = await dbApi("get_witnesses", [
        witnessesID.map((item) => item[1]),
      ]).then(async (e) => {
        let allWitnesses = e.map(async (item) => {
          const votesAsset = await formAssetBalanceById(
            defaultAsset.id,
            Number(item.total_votes)
          );
          return {
            rank: 0,
            name: witnessesID.filter((name) => name[1] === item.id)[0][0],
            totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
            lastBlock: item.last_confirmed_block_num,
            missedBlocks: 0,
            url: item.url,
          };
        });
        allWitnesses = await Promise.all(allWitnesses);
        return allWitnesses.filter((item) => item.lastBlock !== 0);
      });
      setWitnesses({
        activeWitnesses: rawWitnesses.length,
        reward: 0,
        earnings: 0,
        data: rawWitnesses,
        stats: {
          active: updateStatsArray(witnesses.stats.active, rawWitnesses.length),
          reward: [],
          earnings: [],
        },
      });
    }
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

  const onSearch = async (symbol: string) => {
    setLoading(true);
    setSearchValue(symbol);
    setLoading(false);
  };

  return { loading, witnesses, searchValue, onSearch };
}
