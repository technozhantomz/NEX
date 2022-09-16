import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useBlockchain,
  useFormDate,
  useMembers,
} from "../../../../../common/hooks";
import { useAssetsContext } from "../../../../../common/providers";

import { SonsStats, SonsTableRow, UseSonsTabResult } from "./useSonsTab.types";

export function useSonsTab(): UseSonsTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<SonsTableRow[]>([]);
  const [sonsTableRows, setSonsTableRows] = useState<SonsTableRow[]>([]);
  const [sonsStats, setSonsStats] = useState<SonsStats>({
    active: [],
    budget: [],
    nextVote: [],
  });
  const [activeSons, setActiveSons] = useState<number>(0);
  const [budget, setBudget] = useState<number>(0);
  const [nextVote, setNextVote] = useState<string>("");

  const { getSons } = useMembers();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { formAssetBalanceById, setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { getChain, getAvgBlockTime, getBlockData } = useBlockchain();
  const { formLocalDate } = useFormDate();

  const getDaysInThisMonth = useCallback(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }, []);

  const getSonsData = useCallback(async () => {
    if (defaultAsset) {
      try {
        const chain = await getChain();
        const blockData = await getBlockData();
        if (chain && blockData) {
          const { sons, sonsIds } = await getSons();
          const budgetAmount = setPrecision(
            false,
            blockData.son_budget,
            defaultAsset.precision
          );
          const now = new Date().getTime();
          const nextVoteTime = new Date(
            blockData.next_maintenance_time
          ).getTime();
          const nextVoteDistance = nextVoteTime - now;
          if (sons && sons.length > 0) {
            sons.sort((a, b) => b.total_votes - a.total_votes);
            const sonsRows: SonsTableRow[] = [];
            let index = 0;
            const sonsVotesAsset = await Promise.all(
              sons.map((son) => {
                return formAssetBalanceById(defaultAsset.id, son.total_votes);
              })
            );
            for (const son of sons) {
              sonsRows.push({
                key: index,
                rank: index + 1,
                name: sonsIds.filter((sonId) => sonId[1] === son.id)[0][0],
                active: son.status === "active" ? true : false,
                url: son.url,
                totalVotes: `${sonsVotesAsset[index].amount} ${sonsVotesAsset[index].symbol}`,
              } as SonsTableRow);
              index = index + 1;
            }

            const activeSones = sonsRows.filter((son) => son.active === true);
            setSonsTableRows(sonsRows);
            setSearchDataSource(sonsRows);
            setActiveSons(activeSones.length);
            setBudget(budgetAmount);
            setNextVote(
              formLocalDate(blockData.next_maintenance_time, [
                "month",
                "date",
                "time",
              ])
            );
            setSonsStats({
              active: updateArrayWithLimit(
                sonsStats.active,
                activeSones.length,
                99
              ),
              budget: updateArrayWithLimit(sonsStats.budget, budgetAmount, 99),
              nextVote: updateArrayWithLimit(
                sonsStats.nextVote,
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
    setSonsTableRows,
    setActiveSons,
    setSonsStats,
    setLoading,
  ]);

  useEffect(() => {
    const sonsInterval = setInterval(() => getSonsData(), 3000);
    return () => {
      clearInterval(sonsInterval);
    };
  }, [defaultAsset]);

  return {
    loading,
    sonsTableRows,
    searchDataSource,
    sonsStats,
    activeSons,
    budget,
    nextVote,
    setSearchDataSource,
  };
}
