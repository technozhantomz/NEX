import counterpart from "counterpart";
import { useCallback, useEffect, useRef, useState } from "react";

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
  Asset,
  FullAccount,
  GlobalProperties,
  SignerKey,
  Transaction,
  Vote,
  VoteType,
  WitnessAccount,
} from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

import { UseVoteTabResult } from "./useVoteTab.types";

type Args = {
  tab: string;
  tabServerApprovedVotes: Vote[];
  allMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getUserVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  votesLoading: boolean;
  totalGpos: number;
};

export function useVoteTab({
  tab,
  tabServerApprovedVotes,
  allMembers,
  allMembersIds,
  fullAccount,
  getUserVotes,
  totalGpos,
  votesLoading,
}: Args): UseVoteTabResult {
  const [pendingChanges, setPendingChanges] = useState<VoteRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allMembersRows, setAllMembersRows] = useState<VoteRow[]>([]);
  const [serverApprovedRows, setServerApprovedRows] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [updateAccountFee, setUpdateAccountFee] = useState<number>(0);
  const [reconfirmFee, setReconfirmFee] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [pendingTransaction, setPendingTransaction] = useState<Transaction>();
  const [reconfirmPendingTransaction, setReconfirmPendingTransaction] =
    useState<Transaction>();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const [globalProperties, _setGlobalProperties] = useState<
    GlobalProperties | undefined
  >();
  const afterCloseTransactionModal = useRef<() => void>();

  const { formKnownAssetBalanceById } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { formAccountBalancesByName } = useAccount();
  const { id, assets, name, localStorageAccount } = useUserContext();
  const { buildUpdateAccountTransaction } =
    useUpdateAccountTransactionBuilder();
  const { getTrxFee, buildTrx } = useTransactionBuilder();
  const { dbApi } = usePeerplaysApiContext();

  const updateAllMembersRows = useCallback(
    (memberId: string, changeType: "add" | "cancel" | "update") => {
      const newAllMembersRows = [...allMembersRows];
      const selectedRow = allMembersRows.find((vote) => vote.id === memberId);
      const selectedRowIndex = allMembersRows.findIndex(
        (vote) => vote.id === memberId
      );
      switch (changeType) {
        case "add":
          newAllMembersRows[selectedRowIndex].action =
            selectedRow?.action === "add" ? "pending add" : "pending remove";
          break;
        case "cancel":
          newAllMembersRows[selectedRowIndex].action =
            selectedRow?.action === "pending add" ? "add" : "remove";
          break;
        case "update":
          newAllMembersRows[selectedRowIndex].action =
            selectedRow?.action === "pending add" ? "remove" : "add";
          newAllMembersRows[selectedRowIndex].status =
            selectedRow?.action === "remove" ? "approved" : "unapproved";
          break;
      }
      setAllMembersRows(newAllMembersRows);
    },
    [allMembersRows, setAllMembersRows]
  );

  const validateVoting = useCallback(
    (votingFee: number) => {
      const userDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      if (
        userDefaultAsset === undefined ||
        (userDefaultAsset.amount as number) < votingFee
      ) {
        return counterpart.translate(`field.errors.balance_not_enough_to_pay`);
      }
      if (totalGpos <= 0) {
        return counterpart.translate(`field.errors.need_to_vest_gpos`);
      }
      return undefined;
    },
    [assets, defaultToken, totalGpos]
  );

  const getReconfirmTrx = useCallback(() => {
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

      const trx = buildUpdateAccountTransaction(
        {
          new_options,
          extensions: { value: { update_last_voting_time: true } },
        },
        id
      );

      setReconfirmPendingTransaction(trx);
      return trx;
    }
  }, [
    fullAccount,
    id,
    buildUpdateAccountTransaction,
    setReconfirmPendingTransaction,
  ]);

  const getReconfirmFee = useCallback(async () => {
    const trx = getReconfirmTrx();

    if (trx !== undefined) {
      const fee = await getTrxFee([trx]);
      if (fee !== undefined) {
        setReconfirmFee(fee);
      }
    }
  }, [getReconfirmTrx, getTrxFee, setReconfirmFee]);

  const handleReconfirmVoting = useCallback(
    async (signerKey: SignerKey) => {
      const votingErrorMessage = validateVoting(reconfirmFee);
      if (votingErrorMessage) {
        setTransactionErrorMessage(votingErrorMessage);
        return;
      }
      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([reconfirmPendingTransaction], [signerKey]);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        getUserVotes();
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.published_votes`)
        );
        setLoadingTransaction(false);
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      validateVoting,
      reconfirmFee,
      setTransactionErrorMessage,
      setLoadingTransaction,
      buildTrx,
      reconfirmPendingTransaction,
      formAccountBalancesByName,
      localStorageAccount,
      getUserVotes,
    ]
  );

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
        allMembersRows
          .map((vote) => {
            if (vote.action === "remove" || vote.action === "pending add")
              return vote.id;
          })
          .includes(member.vote_id)
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
    allMembersRows,
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
    async (signerKey: SignerKey) => {
      const votingErrorMessage = validateVoting(updateAccountFee);
      if (votingErrorMessage) {
        setTransactionErrorMessage(votingErrorMessage);
        return;
      }

      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        trxResult = await buildTrx([pendingTransaction], [signerKey]);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        formAccountBalancesByName(localStorageAccount);
        getUserVotes();
        setIsVotesChanged(false);
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.published_votes`)
        );
        setLoadingTransaction(false);
        pendingChanges.forEach((vote) =>
          updateAllMembersRows(vote.id, "update")
        );
        afterCloseTransactionModal.current = () => {
          setPendingChanges([]);
        };
      } else {
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
    },
    [
      validateVoting,
      updateAccountFee,
      setTransactionErrorMessage,
      setLoadingTransaction,
      buildTrx,
      pendingTransaction,
      formAccountBalancesByName,
      localStorageAccount,
      getUserVotes,
      setIsVotesChanged,
      pendingChanges,
      updateAllMembersRows,
      setPendingChanges,
    ]
  );

  const sortVotesRows = useCallback((votes: VoteRow[]) => {
    const sorter = (a: VoteRow, b: VoteRow) =>
      Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0]);
    return votes.sort(sorter).map((vote, index) => {
      return { ...vote, rank: index + 1 };
    });
  }, []);

  const formVoteRow = useCallback(
    (
      vote: Vote,
      votesIds: [string, string][],
      action:
        | "add"
        | "remove"
        | "pending add"
        | "pending remove"
        | "cancel"
        | "",
      defaultAsset: Asset,
      globalProperties: GlobalProperties
    ): VoteRow => {
      let voteType: VoteType;
      let voteActive: boolean;
      let missedBlocks = 0;
      switch (parseInt(vote.vote_id.charAt(0))) {
        case 0:
          voteType = "committees";
          voteActive =
            globalProperties["active_committee_members"].indexOf(vote.id) >= 0
              ? true
              : false;
          break;
        case 3:
          voteType = "sons";
          voteActive =
            globalProperties.active_sons.find(
              (son) => son.son_id === vote.id
            ) !== undefined
              ? true
              : false;
          break;
        default:
          voteType = "witnesses";
          voteActive =
            globalProperties["active_witnesses"].indexOf(vote.id) >= 0
              ? true
              : false;
          missedBlocks = (vote as WitnessAccount).total_missed;
      }
      const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];

      const votesAsset = formKnownAssetBalanceById(
        defaultAsset,
        Number(vote.total_votes)
      );

      return {
        id: vote.vote_id,
        key: vote.vote_id,
        rank: 0,
        type: voteType,
        name: name,
        url: vote.url,
        votes: `${votesAsset?.amount} ${votesAsset?.symbol}`,
        missedBlocks: missedBlocks,
        action: action,
        active: voteActive,
        status: action === "remove" ? "approved" : "unapproved",
      } as VoteRow;
    },
    [formKnownAssetBalanceById]
  );

  const formTableRows = useCallback(() => {
    if (
      !votesLoading &&
      defaultAsset !== undefined &&
      globalProperties !== undefined
    ) {
      setLoading(true);
      const allMembersRows = allMembers.map((member) => {
        return formVoteRow(
          member,
          allMembersIds,
          fullAccount?.votes.some((vote) => vote.id === member.id)
            ? "remove"
            : "add",
          defaultAsset,
          globalProperties
        );
      });

      setAllMembersRows(sortVotesRows(allMembersRows));
      const serverApprovedRows = tabServerApprovedVotes.map((vote) => {
        return formVoteRow(
          vote,
          allMembersIds,
          "remove",
          defaultAsset,
          globalProperties
        );
      });
      setServerApprovedRows(sortVotesRows([...serverApprovedRows]));
      setLoading(false);
    }
  }, [
    votesLoading,
    setLoading,
    formVoteRow,
    allMembers,
    setAllMembersRows,
    allMembersIds,
    tabServerApprovedVotes,
    setServerApprovedRows,
    sortVotesRows,
    defaultAsset,
    globalProperties,
  ]);

  const checkVotesChanged = useCallback(
    (serverApprovedRows: VoteRow[], pendingChanges: VoteRow[]) => {
      const isVotesChanged = !isArrayEqual(serverApprovedRows, pendingChanges);
      setIsVotesChanged(isVotesChanged);
    },
    [setIsVotesChanged]
  );

  const addChange = useCallback(
    (voteId: string) => {
      if (pendingChanges.find((vote) => vote.id === voteId) === undefined) {
        const selectedRow = allMembersRows.find((vote) => vote.id === voteId);
        if (selectedRow !== undefined) {
          updateAllMembersRows(voteId, "add");
          setPendingChanges(
            sortVotesRows([
              { ...selectedRow, action: "cancel" },
              ...pendingChanges,
            ])
          );
          checkVotesChanged(serverApprovedRows, [
            { ...selectedRow, action: "cancel" } as VoteRow,
            ...pendingChanges,
          ]);
        }
      }
    },
    [allMembersRows, checkVotesChanged, tab, setPendingChanges, pendingChanges]
  );

  const cancelChange = useCallback(
    (voteId: string) => {
      updateAllMembersRows(voteId, "cancel");
      setPendingChanges(
        sortVotesRows(pendingChanges.filter((vote) => vote.id !== voteId))
      );
      checkVotesChanged(
        serverApprovedRows,
        pendingChanges.filter((vote) => vote.id !== voteId)
      );
    },
    [
      sortVotesRows,
      checkVotesChanged,
      serverApprovedRows,
      setPendingChanges,
      pendingChanges,
    ]
  );

  const resetChanges = useCallback(() => {
    clearPendingActions();
    setPendingChanges([]);
    setIsVotesChanged(false);
  }, [serverApprovedRows, setIsVotesChanged]);

  const clearPendingActions = () => {
    const updatedMembersRows = allMembersRows.map((row) => {
      switch (row.action) {
        case "pending remove":
          row.action = "remove";
          break;
        case "pending add":
          row.action = "add";
          break;
        default:
          break;
      }
      return row;
    });
    setAllMembersRows(updatedMembersRows);
  };

  const setGlobalProperties = useCallback(async () => {
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      _setGlobalProperties(gpo);
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, _setGlobalProperties]);

  useEffect(() => {
    setGlobalProperties();
  }, [setGlobalProperties]);

  useEffect(() => {
    if (isArrayEqual(serverApprovedRows, pendingChanges)) {
      formTableRows();
    }
  }, [formTableRows]);

  useEffect(() => {
    getUpdateAccountFee();
  }, [tab, pendingChanges, allMembers, fullAccount]);

  useEffect(() => {
    getReconfirmFee();
  }, [getReconfirmFee]);

  useEffect(() => {
    if (afterCloseTransactionModal.current) {
      afterCloseTransactionModal.current = undefined;
    }
  }, [pendingChanges]);

  return {
    name,
    loading,
    allMembersRows,
    serverApprovedRows,
    isVotesChanged,
    addChange,
    cancelChange,
    resetChanges,
    updateAccountFee,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    handlePublishChanges,
    loadingTransaction,
    pendingChanges,
    afterSuccessTransactionModalClose: afterCloseTransactionModal.current,
    handleReconfirmVoting,
    reconfirmFee,
  };
}
