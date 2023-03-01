import { sum } from "lodash";
import { useCallback, useEffect, useState } from "react";

import {
  BITCOIN_NETWORK,
  ETHEREUM_NETWORK,
  HIVE_NETWORK,
} from "../../../../../api/params";
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
    activeBitcoin: [],
    activeHive: [],
    activeEthereum: [],
    budget: [],
    nextVote: [],
  });
  const [activeBitcoinSons, setActiveBitcoinSons] = useState<number>(0);
  const [activeHiveSons, setActiveHiveSons] = useState<number>(0);
  const [activeEthereumSons, setActiveEthereumSons] = useState<number>(0);
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
        sons.sort(
          (a, b) =>
            sum(b.total_votes.map((vote) => vote[1])) -
            sum(a.total_votes.map((vote) => vote[1]))
        );
        const sonsRows: SonsTableRow[] = [];
        let index = 0;
        const sonsVotesAsset = sons.map((son) => {
          const bitcoinTotalVotes = son.total_votes.find(
            (total_vote) => total_vote[0] === BITCOIN_NETWORK.toLowerCase()
          );
          const hiveTotalVotes = son.total_votes.find(
            (total_vote) => total_vote[0] === HIVE_NETWORK.toLowerCase()
          );
          const ethereumTotalVotes = son.total_votes.find(
            (total_vote) => total_vote[0] === ETHEREUM_NETWORK.toLowerCase()
          );
          return {
            bitcoinVoteAsset: bitcoinTotalVotes
              ? formKnownAssetBalanceById(defaultAsset, bitcoinTotalVotes[1])
              : undefined,
            hiveVoteAsset: hiveTotalVotes
              ? formKnownAssetBalanceById(defaultAsset, hiveTotalVotes[1])
              : undefined,
            ethereumVoteAsset: ethereumTotalVotes
              ? formKnownAssetBalanceById(defaultAsset, ethereumTotalVotes[1])
              : undefined,
          };
        });

        for (const son of sons) {
          const activeChains = son.statuses
            .filter((status) => status[1] === "active")
            .map((status) => status[0]);

          sonsRows.push({
            key: index,
            rank: index + 1,
            name: sonsIds.filter((sonId) => sonId[1] === son.id)[0][0],
            accountId: son.son_account,
            url: son.url,
            activeChains: activeChains,
            bitcoinActive: activeChains.includes(BITCOIN_NETWORK.toLowerCase()),
            ethereumActive: activeChains.includes(
              ETHEREUM_NETWORK.toLowerCase()
            ),
            hiveActive: activeChains.includes(HIVE_NETWORK.toLowerCase()),
            bitcoinTotalVotes: sonsVotesAsset[index].bitcoinVoteAsset
              ? `${sonsVotesAsset[index].bitcoinVoteAsset?.amount} ${sonsVotesAsset[index].bitcoinVoteAsset?.symbol}`
              : undefined,
            ethereumTotalVotes: sonsVotesAsset[index].ethereumVoteAsset
              ? `${sonsVotesAsset[index].ethereumVoteAsset?.amount} ${sonsVotesAsset[index].ethereumVoteAsset?.symbol}`
              : undefined,
            hiveTotalVotes: sonsVotesAsset[index].hiveVoteAsset
              ? `${sonsVotesAsset[index].hiveVoteAsset?.amount} ${sonsVotesAsset[index].hiveVoteAsset?.symbol}`
              : undefined,
          } as SonsTableRow);
          index = index + 1;
        }

        const activeBitcoinSons = sonsRows.filter(
          (son) => son.bitcoinActive === true
        );
        const activeHiveSons = sonsRows.filter(
          (son) => son.hiveActive === true
        );
        const activeEthereumSons = sonsRows.filter(
          (son) => son.ethereumActive === true
        );
        return {
          sonsRows,
          activeBitcoinSons: activeBitcoinSons.length,
          activeHiveSons: activeHiveSons.length,
          activeEthereumSons: activeEthereumSons.length,
          budget: budgetAmount,
          nextVote: formLocalDate(blockData.next_maintenance_time, [
            "month",
            "date",
            "time",
          ]),
          sonsStats: {
            activeBitcoin: updateArrayWithLimit(
              sonsStats.activeBitcoin,
              activeBitcoinSons.length,
              99
            ),
            activeHive: updateArrayWithLimit(
              sonsStats.activeHive,
              activeHiveSons.length,
              99
            ),
            activeEthereum: updateArrayWithLimit(
              sonsStats.activeEthereum,
              activeEthereumSons.length,
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
        setActiveBitcoinSons(sonsData.activeBitcoinSons);
        setActiveEthereumSons(sonsData.activeEthereumSons);
        setActiveHiveSons(sonsData.activeHiveSons);
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
    setActiveBitcoinSons,
    setActiveEthereumSons,
    setActiveHiveSons,
    setBudget,
    setNextVote,
    setSonsStats,
  ]);

  return {
    loading,
    sonsTableRows,
    searchDataSource,
    sonsStats,
    activeBitcoinSons,
    activeEthereumSons,
    activeHiveSons,
    budget,
    nextVote,
    setSearchDataSource,
  };
}
