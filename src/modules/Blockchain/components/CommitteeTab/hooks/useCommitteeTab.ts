import { useCallback, useEffect, useState } from "react";

import { useArrayLimiter, useAsset } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { CommitteeMember } from "../../../../../common/types";

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

  const getCommittees = useCallback(async () => {
    if (defaultAsset) {
      try {
        const committeeIds: [string, string][] = await dbApi(
          "lookup_committee_member_accounts",
          ["", 100]
        );
        if (committeeIds && committeeIds.length > 0) {
          const committees: CommitteeMember[] = await dbApi(
            "get_committee_members",
            [committeeIds.map((committeeId) => committeeId[1])]
          );

          if (committees && committees.length > 0) {
            committees.sort((a, b) => b.total_votes - a.total_votes);
            const committeeRows: CommitteeTableRow[] = [];
            let index = 0;
            for (const committee of committees) {
              const votesAsset = await formAssetBalanceById(
                defaultAsset.id,
                Number(committee.total_votes)
              );
              committeeRows.push({
                key: index,
                rank: index + 1,
                name: committeeIds.filter(
                  (committeeId) => committeeId[1] === committee.id
                )[0][0],
                totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
                url: committee.url,
              } as CommitteeTableRow);
              index = index + 1;
            }

            setCommitteeTableRows(committeeRows);
            setActiveCommittee(committees.length);
            setCommitteeStats(
              updateArrayWithLimit(committeeStats, committees.length, 99)
            );
            setLoading(false);
          }
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
    setInterval(() => getCommittees(), 3000);
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
