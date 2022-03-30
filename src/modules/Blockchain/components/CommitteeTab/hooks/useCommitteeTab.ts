import { useEffect, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useAsset } from "../../../../../common/hooks";

import { CommitteeData, CommitteeTab } from "./useCommitteeTab.types";

export function useCommitteeTab(): CommitteeTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [committee, setCommittee] = useState<CommitteeData>({
    activeCommittee: 0,
    data: [],
    stats: {
      active: [],
    },
  });
  const { dbApi } = usePeerplaysApiContext();
  const { defaultAsset, formAssetBalanceById } = useAsset();

  useEffect(() => {
    setInterval(() => getCommiteeData(), 3000);
  }, [defaultAsset]);

  const getCommiteeData = async () => {
    if (defaultAsset) {
      const committeeID = await dbApi("lookup_committee_member_accounts", [
        "",
        100,
      ]).then((e: any) => e);
      const rawCommittee = await dbApi("get_committee_members", [
        committeeID.map((item: any[]) => item[1]),
      ]).then(async (e: any[]) => {
        const allCommittee = e.map(async (item, index) => {
          const votesAsset = await formAssetBalanceById(
            defaultAsset.id,
            Number(item.total_votes)
          );
          return {
            rank: index + 1,
            name: committeeID.filter((id: any[]) => id[1] === item.id)[0][0],
            totalVotes: `${votesAsset.amount} ${votesAsset.symbol}`,
            url: item.url,
          };
        });

        return await Promise.all(allCommittee);
      });
      setCommittee({
        activeCommittee: rawCommittee.length,
        data: rawCommittee,
        stats: {
          active: updateStatsArray(committee.stats.active, rawCommittee.length),
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

  const onSearch = async (name: string) => {
    setLoading(true);
    setSearchValue(name);
    setLoading(false);
  };

  return { loading, committee, searchValue, onSearch };
}
