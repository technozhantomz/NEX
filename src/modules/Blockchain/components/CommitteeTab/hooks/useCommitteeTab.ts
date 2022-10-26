import { useCallback, useEffect, useState } from "react";

import {
  useArrayLimiter,
  useAsset,
  useMembers,
} from "../../../../../common/hooks";
import {
  useAssetsContext,
  usePeerplaysApiContext,
} from "../../../../../common/providers";

import {
  CommitteeTableRow,
  UseCommitteeTabResult,
} from "./useCommitteeTab.types";

export function useCommitteeTab(): UseCommitteeTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchDataSource, setSearchDataSource] = useState<CommitteeTableRow[]>(
    []
  );
  const [activeCommittee, setActiveCommittee] = useState<number>(0);
  const [committeeStats, setCommitteeStats] = useState<number[]>([]);
  const [committeeTableRows, setCommitteeTableRows] = useState<
    CommitteeTableRow[]
  >([]);
  const { dbApi } = usePeerplaysApiContext();
  const { formAssetBalanceById } = useAsset();
  const { defaultAsset } = useAssetsContext();
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
                active: (votesAsset?.amount as number) > 0 ? true : false,
                url: committee.url,
                totalVotes: `${votesAsset?.amount} ${votesAsset?.symbol}`,
              } as CommitteeTableRow;
            })
          );
          const activeCommittee = committeeRows.filter(
            (committee) => committee.active
          );
          setCommitteeTableRows(committeeRows);
          setSearchDataSource(committeeRows);
          setActiveCommittee(activeCommittee.length);
          setCommitteeStats(
            updateArrayWithLimit(committeeStats, activeCommittee.length, 99)
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

  useEffect(() => {
    const committeeInterval = setInterval(() => getCommitteesTableRows(), 3000);
    return () => {
      clearInterval(committeeInterval);
    };
  }, [defaultAsset]);

  return {
    loading,
    activeCommittee,
    committeeStats,
    committeeTableRows,
    searchDataSource,
    setSearchDataSource,
  };
}
