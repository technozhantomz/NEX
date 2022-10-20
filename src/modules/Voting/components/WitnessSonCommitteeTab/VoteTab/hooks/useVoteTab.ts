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
  FullAccount,
  GlobalProperties,
  SignerKey,
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
  const [pendingChanges, setPendingChanges] = useState<VoteRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allMembersRows, setAllMembersRows] = useState<VoteRow[]>([]);
  const [serverApprovedRows, setServerApprovedRows] = useState<VoteRow[]>([]);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [updateAccountFee, setUpdateAccountFee] = useState<number>(0);
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [pendingTransaction, setPendingTransaction] = useState<Transaction>();
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const afterCloseTransactionModal = useRef<() => void>();

  const { formAssetBalanceById } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { formAccountBalancesByName } = useAccount();
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
          await getVotes();
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
      }
    },
    [
      assets,
      updateAccountFee,
      setTransactionErrorMessage,
      totalGpos,
      setLoadingTransaction,
      buildTrx,
      pendingTransaction,
      formAccountBalancesByName,
      localStorageAccount,
      getVotes,
      setServerApprovedRows,
    ]
  );

  const sortVotesRows = useCallback((votes: VoteRow[]) => {
    return votes
      .sort(
        (a, b) => Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0])
      )
      .map((vote, index) => {
        return { ...vote, rank: index + 1 };
      });
  }, []);

  const formVoteRow = useCallback(
    async (
      vote: Vote,
      votesIds: [string, string][],
      action:
        | "add"
        | "remove"
        | "pending add"
        | "pending remove"
        | "cancel"
        | ""
    ): Promise<VoteRow> => {
      try {
        const gpo: GlobalProperties = await dbApi("get_global_properties");
        if (defaultAsset !== undefined) {
          let voteType: VoteType;
          let voteActive: boolean;
          switch (parseInt(vote.vote_id.charAt(0))) {
            case 0:
              voteType = "committees";
              voteActive =
                gpo["active_committee_members"].indexOf(vote.id) >= 0
                  ? true
                  : false;
              break;
            case 1:
              voteType = "witnesses";
              voteActive =
                gpo["active_witnesses"].indexOf(vote.id) >= 0 ? true : false;
              break;
            case 3:
              voteType = "sons";
              voteActive =
                gpo.active_sons.find((son) => son.son_id === vote.id) !==
                undefined
                  ? true
                  : false;
              break;
            default:
              voteType = "witnesses";
              voteActive =
                gpo["active_witnesses"].indexOf(vote.id) >= 0 ? true : false;
          }
          const name = votesIds.filter((voteId) => voteId[1] === vote.id)[0][0];

          const votesAsset = await formAssetBalanceById(
            defaultAsset.id,
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
            action: action,
            active: voteActive,
            status: action === "remove" ? "approved" : "unapproved",
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
          return formVoteRow(
            member,
            allMembersIds,
            fullAccount?.votes.some((vote) => vote.id === member.id)
              ? "remove"
              : "add"
          );
        })
      );
      setAllMembersRows(sortVotesRows(allMembersRows));
      const serverApprovedRows = await Promise.all(
        serverApprovedVotes.map((vote) => {
          return formVoteRow(vote, allMembersIds, "remove");
        })
      );
      setServerApprovedRows(sortVotesRows([...serverApprovedRows]));
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

  const updateAllMembersRows = useCallback(
    (memberId: string, changeType: "add" | "cancel" | "update") => {
      const selectedRow = allMembersRows.find((vote) => vote.id === memberId);
      const selectedRowIndex = allMembersRows.findIndex(
        (vote) => vote.id === memberId
      );
      switch (changeType) {
        case "add":
          allMembersRows[selectedRowIndex].action =
            selectedRow?.action === "add" ? "pending add" : "pending remove";
          break;
        case "cancel":
          allMembersRows[selectedRowIndex].action =
            selectedRow?.action === "pending add" ? "add" : "remove";
          break;
        case "update":
          allMembersRows[selectedRowIndex].action =
            selectedRow?.action === "pending add" ? "remove" : "add";
          allMembersRows[selectedRowIndex].status =
            selectedRow?.action === "remove" ? "approved" : "unapproved";
          break;
      }
      setAllMembersRows(allMembersRows);
    },
    [allMembersRows, setAllMembersRows]
  );

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

  useEffect(() => {
    if (isArrayEqual(serverApprovedRows, pendingChanges)) {
      formTableRows();
    }
  }, [formTableRows]);

  useEffect(() => {
    getUpdateAccountFee();
  }, [tab, pendingChanges, allMembers, fullAccount]);

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
  };
}
