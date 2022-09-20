import counterpart from "counterpart";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../../api/params";
import { isArrayEqual } from "../../../../../../api/utils";
import {
  useAccount,
  useAsset,
  useTransactionBuilder,
  useUpdateAccountTransactionBuilder,
} from "../../../../../../common/hooks";
import {
  useAssetsContext,
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../../common/providers";
import {
  AccountOptions,
  FullAccount,
  GlobalProperties,
  Transaction,
  Vote,
  VoteType,
} from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

import { UseVoteTabResult } from "./useVoteTab.types";

type Args = {
  tab: string;
  serverApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  votesLoading: boolean;
  totalGpos: number;
};

export function useVoteTab({
  tab,
  serverApprovedVotes,
  allMembers,
  allMembersIds,
  fullAccount,
  getVotes,
  totalGpos,
}: Args): UseVoteTabResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [allMembersRows, setAllMembersRows] = useState<VoteRow[]>([]);
  const [serverApprovedRows, setServerApprovedRows] = useState<VoteRow[]>([]);
  const [localApprovedRows, setLocalApprovedRows] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [voteSearchValue, setVoteSearchValue] = useState<string>("");
  const [updateAccountFee, setUpdateAccountFee] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [pendingTransaction, setPendingTransaction] = useState<Transaction>();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const { formAssetBalanceById } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { getPrivateKey, formAccountBalancesByName, getAccountByName } =
    useAccount();
  const { id, assets, name, localStorageAccount } = useUserContext();
  const { buildUpdateAccountTransaction } =
    useUpdateAccountTransactionBuilder();
  const { getTrxFee, buildTrx } = useTransactionBuilder();
  const { dbApi } = usePeerplaysApiContext();

  const getUpdateAccountTrx = useCallback(() => {
    const membersIdentifiers: {
      [tab: string]: number;
    } = {
      witnesses: 1,
      sons: 3,
      committees: 0,
    };
    const memberIdentifier =
      membersIdentifiers[tab] !== undefined
        ? membersIdentifiers[tab]
        : membersIdentifiers["witnesses"];

    if (fullAccount !== undefined && id) {
      const new_options = {
        extensions: [...fullAccount.account.options.extensions],
        memo_key: fullAccount.account.options.memo_key,
        num_committee: fullAccount.account.options.num_committee,
        num_witness: fullAccount.account.options.num_witness,
        num_son: fullAccount.account.options.num_son,
        votes: [...fullAccount.account.options.votes],
        voting_account: fullAccount.account.options.voting_account,
      } as AccountOptions;

      const allTabsServerApprovedVotes = fullAccount.votes;

      const localApprovedVotes = allMembers.filter((member) =>
        localApprovedRows.map((vote) => vote.id).includes(member.vote_id)
      );

      const localApprovedVotesIds = localApprovedVotes.map(
        (selectedMember) => selectedMember.vote_id
      );

      const otherTabsServerApprovedVotes = allTabsServerApprovedVotes.filter(
        (approvedVote) =>
          parseInt(approvedVote.vote_id.split(":")[0]) !== memberIdentifier
      );
      const otherTabsServerApprovedVotesIds = allTabsServerApprovedVotes
        .filter(
          (approvedVote) =>
            parseInt(approvedVote.vote_id.split(":")[0]) !== memberIdentifier
        )
        .map((otherMember) => otherMember.vote_id);
      const allApprovedVotes = [
        ...localApprovedVotes,
        ...otherTabsServerApprovedVotes,
      ];

      new_options.votes = otherTabsServerApprovedVotesIds
        .concat(localApprovedVotesIds)
        .sort((a, b) => {
          const aSplit = a.split(":");
          const bSplit = b.split(":");

          return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
        });

      new_options.num_witness = allApprovedVotes.filter(
        (vote) => parseInt(vote.vote_id.split(":")[0]) === 1
      ).length;
      new_options.num_committee = allApprovedVotes.filter(
        (vote) => parseInt(vote.vote_id.split(":")[0]) === 0
      ).length;
      new_options.num_son = allApprovedVotes.filter(
        (vote) => parseInt(vote.vote_id.split(":")[0]) === 3
      ).length;

      const trx = buildUpdateAccountTransaction(
        {
          new_options,
          extensions: { value: { update_last_voting_time: true } },
        },
        id
      );

      setPendingTransaction(trx);
      return trx;
    }
  }, [
    fullAccount,
    id,
    allMembers,
    localApprovedRows,
    tab,
    buildUpdateAccountTransaction,
    setPendingTransaction,
  ]);

  const getUpdateAccountFee = useCallback(async () => {
    const trx = getUpdateAccountTrx();

    if (trx !== undefined) {
      const fee = await getTrxFee([trx]);
      if (fee !== undefined) {
        setUpdateAccountFee(fee);
      }
    }
  }, [getUpdateAccountTrx, getTrxFee, setUpdateAccountFee]);

  const handlePublishChanges = useCallback(
    async (password: string) => {
      const userDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      if (
        userDefaultAsset === undefined ||
        (userDefaultAsset.amount as number) < updateAccountFee
      ) {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.balance_not_enough_to_pay`)
        );
        return;
      }
      if (totalGpos <= 0) {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.need_to_vest_gpos`)
        );
      } else {
        setTransactionErrorMessage("");
        const activeKey = getPrivateKey(password, "active");
        let trxResult;
        try {
          setLoadingTransaction(true);
          trxResult = await buildTrx([pendingTransaction], [activeKey]);
        } catch (error) {
          console.log(error);
          setTransactionErrorMessage(
            counterpart.translate(`field.errors.unable_transaction`)
          );
          setLoadingTransaction(false);
        }
        if (trxResult) {
          formAccountBalancesByName(localStorageAccount);
          await getVotes();
          setIsVotesChanged(false);
          setTransactionErrorMessage("");
          setTransactionSuccessMessage(
            counterpart.translate(`field.success.published_votes`)
          );
          setLoadingTransaction(false);
          setServerApprovedRows([...localApprovedRows]);
          setLocalApprovedRows([...localApprovedRows]);
        } else {
          setTransactionErrorMessage(
            counterpart.translate(`field.errors.unable_transaction`)
          );
          setLoadingTransaction(false);
        }
      }
    },
    [
      assets,
      updateAccountFee,
      setTransactionErrorMessage,
      totalGpos,
      getPrivateKey,
      setLoadingTransaction,
      buildTrx,
      pendingTransaction,
      formAccountBalancesByName,
      localStorageAccount,
      getVotes,
      localApprovedRows,
      setServerApprovedRows,
      setLocalApprovedRows,
    ]
  );

  const handleVoteSearch = useCallback(
    (name: string) => {
      setLoading(true);
      setVoteSearchValue(name);
      setLoading(false);
    },
    [setVoteSearchValue, setLoading]
  );

  const sortVotesRows = useCallback((votes: VoteRow[]) => {
    return votes.sort(
      (a, b) => Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0])
    );
  }, []);

  const formVoteRow = useCallback(
    async (
      vote: Vote,
      votesIds: [string, string][],
      action: "add" | "remove" | ""
    ): Promise<VoteRow> => {
      try {
        const gpo: GlobalProperties = await dbApi("get_global_properties");
        if (defaultAsset !== undefined) {
          let voteType: VoteType;
          switch (parseInt(vote.vote_id.charAt(0))) {
            case 0:
              voteType = "committees";
              break;
            case 1:
              voteType = "witnesses";
              break;
            case 3:
              voteType = "sons";
              break;
            default:
              voteType = "witnesses";
          }
          const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];

          const votesAsset = await formAssetBalanceById(
            defaultAsset.id,
            Number(vote.total_votes)
          );
          return {
            id: vote.vote_id,
            key: vote.vote_id,
            rank: vote.vote_id,
            type: voteType,
            name: name,
            url: vote.url,
            votes: `${votesAsset.amount} ${votesAsset.symbol}`,
            action: action,
            active:
              gpo["active_witnesses"].indexOf(vote.id) >= 0 ? true : false,
          } as VoteRow;
        } else {
          return {} as VoteRow;
        }
      } catch (e) {
        console.log(e);
        return {} as VoteRow;
      }
    },
    [formAssetBalanceById, defaultAsset]
  );

  const formTableRows = useCallback(async () => {
    try {
      setLoading(true);
      const allMembersRows = await Promise.all(
        allMembers.map((member) => {
          return formVoteRow(member, allMembersIds, "add");
        })
      );
      setAllMembersRows(sortVotesRows(allMembersRows));
      const serverApprovedRows = await Promise.all(
        serverApprovedVotes.map((vote) => {
          return formVoteRow(vote, allMembersIds, "remove");
        })
      );
      setServerApprovedRows(sortVotesRows([...serverApprovedRows]));
      setLocalApprovedRows(sortVotesRows([...serverApprovedRows]));
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, [
    setLoading,
    formVoteRow,
    allMembers,
    setAllMembersRows,
    allMembersIds,
    serverApprovedVotes,
    setServerApprovedRows,
    sortVotesRows,
    setLocalApprovedRows,
  ]);

  const checkVotesChanged = useCallback(
    (serverApprovedRows: VoteRow[], localApprovedRows: VoteRow[]) => {
      const isVotesChanged = !isArrayEqual(
        serverApprovedRows,
        localApprovedRows
      );
      setIsVotesChanged(isVotesChanged);
    },
    [setIsVotesChanged]
  );

  const approveVote = useCallback(
    (voteId: string) => {
      if (localApprovedRows.find((vote) => vote.id === voteId) === undefined) {
        const selectedRow = allMembersRows.find((vote) => vote.id === voteId);
        if (selectedRow !== undefined) {
          setLocalApprovedRows(
            sortVotesRows([
              { ...selectedRow, action: "remove" },
              ...localApprovedRows,
            ])
          );
          checkVotesChanged(serverApprovedRows, [
            { ...selectedRow, action: "remove" } as VoteRow,
            ...localApprovedRows,
          ]);
        }
      }
    },
    [
      localApprovedRows,
      allMembersRows,
      setLocalApprovedRows,
      checkVotesChanged,
      tab,
    ]
  );

  const removeVote = useCallback(
    (voteId: string) => {
      if (localApprovedRows.find((vote) => vote.id === voteId) !== undefined) {
        setLocalApprovedRows(
          sortVotesRows(localApprovedRows.filter((vote) => vote.id !== voteId))
        );
        checkVotesChanged(
          serverApprovedRows,
          localApprovedRows.filter((vote) => vote.id !== voteId)
        );
      }
    },
    [
      localApprovedRows,
      setLocalApprovedRows,
      sortVotesRows,
      checkVotesChanged,
      serverApprovedRows,
    ]
  );

  const resetChanges = useCallback(() => {
    setLocalApprovedRows([...serverApprovedRows]);
    setIsVotesChanged(false);
  }, [serverApprovedRows, setLocalApprovedRows, setIsVotesChanged]);

  const getWitnessSonCommitteeAccountByName = useCallback(
    (name: string) => {
      try {
        const account: VoteRow | undefined = allMembersRows.find(
          (account) => account.name == name
        );
        return account;
      } catch (e) {
        console.log(e);
      }
    },
    [allMembersRows]
  );

  const searchChange = useCallback(
    (inputEvent: ChangeEvent<HTMLInputElement>) => {
      setVoteSearchValue(inputEvent.target.value);

      const account = getWitnessSonCommitteeAccountByName(
        inputEvent.target.value
      );
      if (account) {
        setSearchError(false);
      } else {
        setSearchError(true);
      }
    },
    [
      getAccountByName,
      setSearchError,
      setVoteSearchValue,
      getWitnessSonCommitteeAccountByName,
    ]
  );

  useEffect(() => {
    if (isArrayEqual(serverApprovedRows, localApprovedRows)) {
      formTableRows();
    }
  }, [formTableRows]);

  useEffect(() => {
    getUpdateAccountFee();
  }, [tab, localApprovedRows, allMembers, fullAccount]);

  return {
    name,
    loading,
    allMembersRows,
    serverApprovedRows,
    localApprovedRows,
    isVotesChanged,
    handleVoteSearch,
    voteSearchValue,
    approveVote,
    removeVote,
    resetChanges,
    updateAccountFee,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handlePublishChanges,
    loadingTransaction,
    searchChange,
    searchError,
  };
}
