import { useCallback, useEffect, useState } from "react";

//import { isArrayEqual } from "../../../api/utils";
import {
  useAccount,
  useAsset,
  useMembers,
  //useTransactionBuilder,
  //useUpdateAccountTransactionBuilder,
} from "../../../common/hooks";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../common/providers";
import { Asset, FullAccount, Vote, VoteType } from "../../../common/types";
import { GposInfo } from "../types";
//import { VoteRow } from "../types";

import { UseVotingResult, Proxy } from "./useVoting.types";

// should add tab: string for the arg, to use in publish function
export function useVoting(): UseVotingResult {
  const DEFAULT_PROXY_ID = "1.2.5";
  const [fullAccount, setFullAccount] = useState<FullAccount>();
  const [serverApprovedVotes, setServerApprovedVotes] = useState<Vote[]>([]);
  const [allMembers, setAllMembers] = useState<Vote[]>([]);
  const [allMembersIds, setAllMembersIds] = useState<[string, string][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalGpos, setTotalGpos] = useState<number>(0);
  const [proxy, setProxy] = useState<Proxy>({
    name: "",
    id: DEFAULT_PROXY_ID,
  });
  //const [localApprovedVotes, setLocalApprovedVotes] = useState<VoteRow[]>([]);
  //const [allMembersVotes, setAllMembersVotes] = useState<VoteRow[]>([]);
  //const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  //const [voteSearchValue, setVoteSearchValue] = useState<string>("");
  //const [updateAccountFee, setUpdateAccountFee] = useState<number>(0);

  const { localStorageAccount, id } = useUserContext();
  const { getFullAccount } = useAccount();
  const { getCommittees, getSons, getWitnesses } = useMembers();
  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById, setPrecision } = useAsset();

  const getProxyAccount = useCallback(
    async (fullAccount: FullAccount) => {
      const proxyId = fullAccount.account.options.voting_account;
      const proxy = (await getFullAccount(proxyId, false)) as FullAccount;

      setProxy({
        name: proxyId !== DEFAULT_PROXY_ID ? proxy.account.name : "",
        id: proxyId,
      } as Proxy);
    },
    [getFullAccount, setProxy]
  );

  const getUserTotalGpos = useCallback(async () => {
    if (id) {
      try {
        const gposInfo: GposInfo = await dbApi("get_gpos_info", [id]);
        if (gposInfo !== undefined) {
          const asset = await getAssetById(gposInfo.award.asset_id);
          if (asset !== undefined) {
            setTotalGpos(
              setPrecision(
                true,
                gposInfo.account_vested_balance,
                asset.precision
              )
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [dbApi, id, getAssetById, setTotalGpos, setPrecision]);

  //const { defaultAsset, formAssetBalanceById } = useAsset();
  //const { buildUpdateAccountTransaction } =
  //useUpdateAccountTransactionBuilder();
  //const { getTrxFee } = useTransactionBuilder();

  // const getSelectedTabUpdateAccountTrx = useCallback(() => {
  //   const voteIdentifiers: {
  //     [tab: string]: number;
  //   } = {
  //     witnesses: 1,
  //     sons: 3,
  //     committees: 0,
  //   };
  //   const memberIdentifier =
  //     voteIdentifiers[tab] !== undefined
  //       ? voteIdentifiers[tab]
  //       : voteIdentifiers["witnesses"];
  //   if (fullAccount !== undefined && id) {
  //     const new_options = fullAccount.account.options;

  //     const serverApprovedMembers = allMembers.filter((member) =>
  //       serverApprovedVotes.map((vote) => vote.id).includes(member.vote_id)
  //     );

  //     const localApprovedMembers = allMembers.filter((member) =>
  //       localApprovedVotes.map((vote) => vote.id).includes(member.vote_id)
  //     );

  //     const selectedTabLocalApprovedMembersIds = localApprovedMembers
  //       .filter(
  //         (approvedMember) =>
  //           parseInt(approvedMember.vote_id.split(":")[0]) === memberIdentifier
  //       )
  //       .map((selectedMember) => selectedMember.vote_id);

  //     const otherTabsServerApprovedMembersIds = serverApprovedMembers
  //       .filter(
  //         (approvedMember) =>
  //           parseInt(approvedMember.vote_id.split(":")[0]) !== memberIdentifier
  //       )
  //       .map((otherMember) => otherMember.vote_id);
  //     new_options.votes = otherTabsServerApprovedMembersIds
  //       .concat(selectedTabLocalApprovedMembersIds)
  //       .sort((a, b) => {
  //         const aSplit = a.split(":");
  //         const bSplit = b.split(":");

  //         return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
  //       });
  //     const trx = buildUpdateAccountTransaction(
  //       {
  //         new_options,
  //         extensions: { value: { update_last_voting_time: true } },
  //       },
  //       id
  //     );
  //     return trx;
  //   }
  // }, [
  //   fullAccount,
  //   allMembers,
  //   serverApprovedVotes,
  //   localApprovedVotes,
  //   buildUpdateAccountTransaction,
  //   id,
  //   tab,
  // ]);

  // const getSelectedTabUpdateAccountFee = useCallback(async () => {
  //   const trx = getSelectedTabUpdateAccountTrx();

  //   if (trx !== undefined) {
  //     const fee = await getTrxFee([trx]);
  //     setUpdateAccountFee(fee);
  //   }
  // }, [getSelectedTabUpdateAccountTrx, getTrxFee, setUpdateAccountFee]);

  // const handleVoteSearch = useCallback(
  //   (name: string) => {
  //     setLoading(true);
  //     setVoteSearchValue(name);
  //     setLoading(false);
  //   },
  //   [setVoteSearchValue, setLoading]
  // );

  // const sortVotesRows = useCallback((votes: VoteRow[]) => {
  //   return votes.sort(
  //     (a, b) => Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0])
  //   );
  // }, []);

  // const formVoteRow = useCallback(
  //   async (
  //     vote: Vote,
  //     votesIds: [string, string][],
  //     action: "add" | "remove" | ""
  //   ): Promise<VoteRow> => {
  //     let voteType: VoteType;
  //     switch (parseInt(vote.vote_id.charAt(0))) {
  //       case 0:
  //         voteType = "committees";
  //         break;
  //       case 1:
  //         voteType = "witnesses";
  //         break;
  //       case 3:
  //         voteType = "sons";
  //         break;
  //       default:
  //         voteType = "witnesses";
  //     }
  //     const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];

  //     const votesAsset = await formAssetBalanceById(
  //       (defaultAsset as Asset).id,
  //       Number(vote.total_votes)
  //     );
  //     return {
  //       id: vote.vote_id,
  //       key: vote.vote_id,
  //       type: voteType,
  //       name: name,
  //       website: vote.url,
  //       votes: `${votesAsset.amount} ${votesAsset.symbol}`,
  //       action: action,
  //     } as VoteRow;
  //   },
  //   [formAssetBalanceById, defaultAsset]
  // );

  const getVotes = useCallback(async () => {
    try {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      setFullAccount(fullAccount);
      if (fullAccount !== undefined) {
        await getProxyAccount(fullAccount);
      }
      let allMembers: Vote[] = [];
      let allMembersIds: [string, string][] = [];
      const { committees, committeesIds } = await getCommittees();
      const { sons, sonsIds } = await getSons();
      const { witnesses, witnessesIds } = await getWitnesses();
      allMembers = [...committees, ...sons, ...witnesses];
      allMembersIds = [...committeesIds, ...sonsIds, ...witnessesIds];

      setAllMembers(allMembers);
      setAllMembersIds(allMembersIds);
      // const allMembersVotes = await Promise.all(
      //   allMembers.map((member) => {
      //     return formVoteRow(member, allMembersIds, "add");
      //   })
      // );
      // setAllMembersVotes(sortVotesRows(allMembersVotes));

      if (fullAccount !== undefined) {
        const votes = fullAccount.votes;
        // const serverApprovedVotes = await Promise.all(
        //   votes.map((vote) => {
        //     return formVoteRow(vote, allMembersIds, "remove");
        //   })
        // );
        //setServerApprovedVotes(sortVotesRows([...serverApprovedVotes]));
        setServerApprovedVotes(votes);
        //setLocalApprovedVotes(sortVotesRows([...serverApprovedVotes]));
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setLoading,
    localStorageAccount,
    setFullAccount,
    getCommittees,
    getSons,
    getWitnesses,
    //formVoteRow,
    setAllMembers,
    setAllMembersIds,
    //setAllMembersVotes,
    setServerApprovedVotes,
    //setLocalApprovedVotes,
  ]);

  // const checkVotesChanged = useCallback(
  //   (serverApprovedVotes: VoteRow[], localApprovedVotes: VoteRow[]) => {
  //     const isVotesChanged = !isArrayEqual(
  //       serverApprovedVotes,
  //       localApprovedVotes
  //     );
  //     setIsVotesChanged(isVotesChanged);
  //   },
  //   [setIsVotesChanged]
  // );

  // const approveVote = useCallback(
  //   (voteId: string) => {
  //     if (localApprovedVotes.find((vote) => vote.id === voteId) === undefined) {
  //       const selectedVote = allMembersVotes.find((vote) => vote.id === voteId);
  //       if (selectedVote !== undefined) {
  //         setLocalApprovedVotes(
  //           sortVotesRows([
  //             { ...selectedVote, action: "remove" },
  //             ...localApprovedVotes,
  //           ])
  //         );
  //         checkVotesChanged(
  //           serverApprovedVotes.filter((vote) => vote.type === tab),
  //           [
  //             { ...selectedVote, action: "remove" } as VoteRow,
  //             ...localApprovedVotes,
  //           ].filter((vote) => vote.type === tab)
  //         );
  //       }
  //     }
  //   },
  //   [
  //     localApprovedVotes,
  //     allMembersVotes,
  //     setLocalApprovedVotes,
  //     checkVotesChanged,
  //     tab,
  //   ]
  // );

  // const removeVote = useCallback(
  //   (voteId: string) => {
  //     if (localApprovedVotes.find((vote) => vote.id === voteId) !== undefined) {
  //       setLocalApprovedVotes(
  //         sortVotesRows(localApprovedVotes.filter((vote) => vote.id !== voteId))
  //       );
  //       checkVotesChanged(
  //         serverApprovedVotes.filter((vote) => vote.type === tab),
  //         localApprovedVotes
  //           .filter((vote) => vote.id !== voteId)
  //           .filter((vote) => vote.type === tab)
  //       );
  //     }
  //   },
  //   [localApprovedVotes, setLocalApprovedVotes, checkVotesChanged, tab]
  // );

  // const resetChanges = useCallback(() => {
  //   setLocalApprovedVotes([
  //     ...serverApprovedVotes.filter((vote) => vote.type === tab),
  //     ...localApprovedVotes.filter((vote) => vote.type !== tab),
  //   ]);
  //   setIsVotesChanged(false);
  // }, [
  //   localApprovedVotes,
  //   serverApprovedVotes,
  //   setLocalApprovedVotes,
  //   setLocalApprovedVotes,
  //   tab,
  // ]);

  useEffect(() => {
    getVotes();
  }, [getVotes]);

  useEffect(() => {
    getUserTotalGpos();
  }, [getUserTotalGpos]);
  // useEffect(() => {
  //   getSelectedTabUpdateAccountFee();
  // }, [getSelectedTabUpdateAccountFee]);

  // useEffect(() => {
  //   checkVotesChanged(
  //     serverApprovedVotes.filter((vote) => vote.type === tab),
  //     localApprovedVotes.filter((vote) => vote.type === tab)
  //   );
  // }, [tab]);
  return {
    loading,
    serverApprovedVotes,
    allMembers,
    fullAccount,
    getVotes,
    allMembersIds,
    totalGpos,
    //localApprovedVotes,
    //isVotesChanged,
    //allMembersVotes,
    //voteSearchValue,
    //approveVote,
    //removeVote,
    //resetChanges,
    //handleVoteSearch,
  };
}
