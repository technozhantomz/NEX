import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useMembers,
} from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";

import {
  CommitteeTableRow,
  UseCommitteeTabResult,
} from "./useCommitteeTab.types";

export function useCommitteeTab(): UseCommitteeTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeCommittee, setActiveCommittee] = useState<number>(0);
  const [committeeStats, setCommitteeStats] = useState<number[]>([]);
  const [committeeTableRows, setCommitteeTableRows] = useState<
    CommitteeTableRow[]
  >([]);
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById } = useAsset();
  const { updateArrayWithLimit } = useArrayLimiter();
  const { getCommittees } = useMembers();

  const getCommitteesTableRows = useCallback(async () => {
    if (defaultAsset) {
      try {
        const { committees, committeesIds } = await getCommittees();

        if (committees && committees.length > 0) {
          committees.sort((a, b) => b.total_votes - a.total_votes);

          const committeeRows = await Promise.all(
            committees.map(async (committee, index) => {
              const votesAsset = await formAssetBalanceById(
                defaultAsset.id,
                Number(committee.total_votes)
              );
              return {
                key: index,
                rank: index + 1,
                name: committeesIds.filter(
                  (committeeId) => committeeId[1] === committee.id
                )[0][0],
                totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
                url: committee.url,
              } as CommitteeTableRow;
            })
          );

          setCommitteeTableRows(committeeRows);
          setActiveCommittee(committees.length);
          setCommitteeStats(
            updateArrayWithLimit(committeeStats, committees.length, 99)
          );
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  }, [
    dbApi,
    formAssetBalanceById,
    setCommitteeTableRows,
    setActiveCommittee,
    setCommitteeStats,
    updateArrayWithLimit,
    defaultAsset,
    setLoading,
  ]);

  const handleSearch = useCallback(
    (name: string) => {
      setLoading(true);
      setSearchValue(name);
      setLoading(false);
    },
    [setLoading, setSearchValue]
  );

  useEffect(() => {
    setInterval(() => getCommitteesTableRows(), 3000);
  }, [defaultAsset]);

  return {
    loading,
    activeCommittee,
    committeeStats,
    committeeTableRows,
    searchValue,
    handleSearch,
  };
}
