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
  const [sonsStats, setSonsStats] = useState<SonsStats>({ active: [] });
  const [activeSons, setActiveSons] = useState<number>(0);
  const [nextVote, setNextVote] = useState<string>("");

  const { getSons } = useMembers();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { formAssetBalanceById, setPrecision } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { getChain, getAvgBlockTime, getBlockData } = useBlockchain();
  const { formDate } = useFormDate();

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
          if (sons && sons.length > 0) {
            sons.sort((a, b) => b.total_votes - a.total_votes);
            const sonsRows: SonsTableRow[] = [];
            let index = 0;
            for (const son of sons) {
              const votesAsset = await formAssetBalanceById(
                defaultAsset.id,
                Number(son.total_votes)
              );
              sonsRows.push({
                key: index,
                rank: index + 1,
                name: sonsIds.filter((sonId) => sonId[1] === son.id)[0][0],
                active: son.status === "active" ? true : false,
                url: son.url,
                totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
              } as SonsTableRow);
              index = index + 1;
            }

            const activeSones = sonsRows.filter((son) => son.active === true);
            setSonsTableRows(sonsRows);
            setSearchDataSource(sonsRows);
            setActiveSons(activeSones.length);
            setNextVote(
              formDate(blockData.next_maintenance_time, [
                "month",
                "date",
                "year",
                "time",
              ])
            );
            setSonsStats({
              active: updateArrayWithLimit(
                sonsStats.active,
                activeSones.length,
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
    const sonsInterval = setInterval(() => getSonsData(), 1000);
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
    nextVote,
    setSearchDataSource,
  };
}
