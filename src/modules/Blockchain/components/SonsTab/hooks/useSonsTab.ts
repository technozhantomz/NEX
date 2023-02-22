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
  const [sonsTableRows, setSonsTableRows] = useState<SonsTableRow[]>();
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
  const { formKnownAssetBalanceById, setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { getChain, getBlockData } = useBlockchain();
  const { formLocalDate } = useFormDate();

  const getSonsData = useCallback(async () => {
    if (defaultAsset) {
      const [chain, blockData] = await Promise.all([
        getChain(),
        getBlockData(),
      ]);
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
        const nextVoteDistance = now - nextVoteTime;
        sons.sort((a, b) => b.total_votes - a.total_votes);
        const sonsRows: SonsTableRow[] = [];
        let index = 0;
        const sonsVotesAsset = sons.map((son) => {
          return formKnownAssetBalanceById(defaultAsset, son.total_votes);
        });

        for (const son of sons) {
          sonsRows.push({
            key: index,
            rank: index + 1,
            name: sonsIds.filter((sonId) => sonId[1] === son.id)[0][0],
            active: son.status === "active" ? true : false,
            url: son.url,
            totalVotes: `${sonsVotesAsset[index]?.amount} ${sonsVotesAsset[index]?.symbol}`,
          } as SonsTableRow);
          index = index + 1;
        }

        const activeSones = sonsRows.filter((son) => son.active === true);
        return {
          sonsRows,
          activeSons: activeSones.length,
          budget: budgetAmount,
          nextVote: formLocalDate(blockData.next_maintenance_time, [
            "month",
            "date",
            "time",
          ]),
          sonsStats: {
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
          },
        };
      }
    }
  }, [
    defaultAsset,
    getChain,
    getBlockData,
    getSons,
    setPrecision,
    formKnownAssetBalanceById,
  ]);

  useEffect(() => {
    let ignore = false;
    async function setSonsData() {
      setLoading(true);
      const sonsData = await getSonsData();
      if (!ignore && sonsData) {
        setSonsTableRows(sonsData.sonsRows);
        setSearchDataSource(sonsData.sonsRows);
        setActiveSons(sonsData.activeSons);
        setBudget(sonsData.budget);
        setNextVote(sonsData.nextVote);
        setSonsStats(sonsData.sonsStats);
        setLoading(false);
      }
    }
    setSonsData();
    const sonsInterval = setInterval(() => setSonsData(), 3000);
    return () => {
      ignore = true;
      clearInterval(sonsInterval);
    };
  }, [
    setLoading,
    getSonsData,
    setSonsTableRows,
    setSearchDataSource,
    setActiveSons,
    setBudget,
    setNextVote,
    setSonsStats,
  ]);

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
