import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useBlockchain,
} from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { WitnessAccount } from "../../../../../common/types";

import {
  UseWitnessesTabResult,
  WitnessStats,
  WitnessTableRow,
} from "./useWitnessesTab.types";

export function useWitnessesTab(): UseWitnessesTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [witnessTableRows, setWitnessTableRows] = useState<WitnessTableRow[]>(
    []
  );
  const [witnessStats, setWitnessStats] = useState<WitnessStats>({
    active: [],
    reward: [],
    earnings: [],
  });
  const [activeWitnesses, setActiveWitnesses] = useState<number>(0);
  const [reward, setReward] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);

  const { updateArrayWithLimit } = useArrayLimiter();
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById, setPrecision } = useAsset();
  const { getChain, getAvgBlockTime } = useBlockchain();

  const getDaysInThisMonth = useCallback(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }, []);

  const getWitnessData = useCallback(async () => {
    if (defaultAsset) {
      try {
        const chain = await getChain();
        if (chain) {
          const rewardAmount = setPrecision(
            false,
            chain.parameters.witness_pay_per_block,
            defaultAsset.precision
          );
          const witnessesIds: [string, string][] = await dbApi(
            "lookup_witness_accounts",
            ["", 100]
          );
          if (witnessesIds && witnessesIds.length > 0) {
            const witnesses: WitnessAccount[] = await dbApi("get_witnesses", [
              witnessesIds.map((witnessId) => witnessId[1]),
            ]);
            if (witnesses && witnesses.length > 0) {
              witnesses.sort((a, b) => b.total_votes - a.total_votes);
              const witnessesRows: WitnessTableRow[] = [];
              let index = 0;
              for (const witness of witnesses) {
                const votesAsset = await formAssetBalanceById(
                  defaultAsset.id,
                  Number(witness.total_votes)
                );
                witnessesRows.push({
                  key: index,
                  rank: index + 1,
                  name: witnessesIds.filter(
                    (witnessId) => witnessId[1] === witness.id
                  )[0][0],
                  totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
                  lastBlock: witness.last_confirmed_block_num,
                  missedBlocks: witness.total_missed,
                  url: witness.url,
                } as WitnessTableRow);
                index = index + 1;
              }

              const blocksPerMonth =
                (60 / getAvgBlockTime()) * 60 * 24 * getDaysInThisMonth();
              const earnings = (
                (blocksPerMonth / witnessesRows.length) *
                rewardAmount
              ).toFixed(defaultAsset.precision);
              setWitnessTableRows(witnessesRows);
              setActiveWitnesses(witnessesRows.length);
              setReward(rewardAmount);
              setEarnings(Number(earnings));
              setWitnessStats({
                active: updateArrayWithLimit(
                  witnessStats.active,
                  witnessesRows.length,
                  99
                ),
                reward: updateArrayWithLimit(
                  witnessStats.reward,
                  rewardAmount,
                  99
                ),
                earnings: updateArrayWithLimit(
                  witnessStats.earnings,
                  Number(earnings),
                  99
                ),
              });
              setLoading(false);
            }
          }
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  }, [
    defaultAsset,
    getChain,
    setPrecision,
    formAssetBalanceById,
    getAvgBlockTime,
    getDaysInThisMonth,
    setWitnessTableRows,
    setActiveWitnesses,
    setReward,
    setEarnings,
    setWitnessStats,
    setLoading,
  ]);

  const handleSearch = useCallback(
    async (name: string) => {
      setLoading(true);
      setSearchValue(name);
      setLoading(false);
    },
    [setLoading, setSearchValue, dbApi]
  );

  useEffect(() => {
    setInterval(() => getWitnessData(), 3000);
  }, [defaultAsset]);

  return {
    loading,
    witnessTableRows,
    witnessStats,
    activeWitnesses,
    searchValue,
    reward,
    earnings,
    handleSearch,
  };
}
