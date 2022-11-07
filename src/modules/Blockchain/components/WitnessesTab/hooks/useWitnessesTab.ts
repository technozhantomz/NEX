import { useCallback, useEffect, useState } from "react";

import { isArrayEqual } from "../../../../../api/utils";
import {
  useAccount,
  useArrayLimiter,
  useAsset,
  useBlockchain,
  useFormDate,
  useMembers,
} from "../../../../../common/hooks";
import {
  useAssetsContext,
  usePeerplaysApiContext,
} from "../../../../../common/providers";
import { GlobalProperties } from "../../../../../common/types";

import {
  UseWitnessesTabResult,
  WitnessStats,
  WitnessTableRow,
} from "./useWitnessesTab.types";

export function useWitnessesTab(): UseWitnessesTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<WitnessTableRow[]>(
    []
  );
  const [witnessTableRows, setWitnessTableRows] = useState<WitnessTableRow[]>(
    []
  );
  const [witnessStats, setWitnessStats] = useState<WitnessStats>({
    active: [],
    reward: [],
    earnings: [],
    budget: [],
    nextVote: [],
  });
  const [activeWitnesses, setActiveWitnesses] = useState<number>(0);
  const [currentWitness, setCurrentWitness] = useState<string>("");
  const [reward, setReward] = useState<number>(0);
  const [earnings, setEarnings] = useState<number>(0);
  const [nextVote, setNextVote] = useState<string>("");
  const [budget, setBudget] = useState<number>(0);

  const { dbApi } = usePeerplaysApiContext();
  const { getUserNameById } = useAccount();
  const { getWitnesses } = useMembers();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { formAssetBalanceById, setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { getChain, getAvgBlockTime, getBlockData } = useBlockchain();
  const { formLocalDate } = useFormDate();

  const getDaysInThisMonth = useCallback(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }, []);

  const getWitnessData = useCallback(async () => {
    if (defaultAsset) {
      try {
        const gpo: GlobalProperties = await dbApi("get_global_properties");
        const chain = await getChain();
        const blockData = await getBlockData();
        if (chain && blockData) {
          const rewardAmount = setPrecision(
            false,
            chain.parameters.witness_pay_per_block,
            defaultAsset.precision
          );
          const budgetAmount = setPrecision(
            false,
            blockData.witness_budget,
            defaultAsset.precision
          );
          const { witnesses, witnessesIds } = await getWitnesses();
          const now = new Date().getTime();
          const nextVoteTime = new Date(
            blockData.next_maintenance_time
          ).getTime();
          const nextVoteDistance = now - nextVoteTime;
          const currentWitness = await getUserNameById(
            blockData.current_witness as string
          );
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
                active:
                  gpo["active_witnesses"].indexOf(witness.id) >= 0
                    ? true
                    : false,
                url: witness.url,
                lastBlock: witness.last_confirmed_block_num,
                missedBlocks: witness.total_missed,
                totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
                publicKey: witness.signing_key,
              } as WitnessTableRow);
              index = index + 1;
            }
            const activeWitnesses = witnessesRows.filter(
              (witness) => witness.active === true
            );
            const blocksPerMonth =
              (60 / getAvgBlockTime()) * 60 * 24 * getDaysInThisMonth();
            const earnings = (
              (blocksPerMonth / witnessesRows.length) *
              rewardAmount
            ).toFixed(defaultAsset.precision);
            setWitnessTableRows(witnessesRows);
            if (isArrayEqual(witnessTableRows, searchDataSource)) {
              setSearchDataSource(witnessesRows);
            }
            setActiveWitnesses(activeWitnesses.length);
            setReward(rewardAmount);
            setEarnings(Number(earnings));
            setBudget(budgetAmount);
            setNextVote(
              formLocalDate(blockData.next_maintenance_time, [
                "month",
                "date",
                "time",
              ])
            );
            setCurrentWitness(currentWitness);
            setWitnessStats({
              active: updateArrayWithLimit(
                witnessStats.active,
                activeWitnesses.length,
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
              budget: updateArrayWithLimit(
                witnessStats.budget,
                budgetAmount,
                99
              ),
              nextVote: updateArrayWithLimit(
                witnessStats.nextVote,
                nextVoteDistance,
                99
              ),
            });
            setLoading(false);
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
    searchDataSource,
    witnessTableRows,
  ]);

  useEffect(() => {
    const witnessInterval = setInterval(() => getWitnessData(), 3000);
    return () => {
      clearInterval(witnessInterval);
    };
  }, [getWitnessData]);

  return {
    loading,
    witnessTableRows,
    witnessStats,
    activeWitnesses,
    reward,
    earnings,
    budget,
    nextVote,
    currentWitness,
    searchDataSource,
    setSearchDataSource,
  };
}
