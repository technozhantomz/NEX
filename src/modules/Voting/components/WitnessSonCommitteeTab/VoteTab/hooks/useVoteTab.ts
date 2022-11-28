import counterpart from "counterpart";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  Vote,
  VoteType,
  WitnessAccount,
} from "../../../../../../common/types";
import { VoteRow } from "../../../../types";

import { UseVoteTabResult } from "./useVoteTab.types";

type Args = {
  tab: string;
  tabAllMembers: Vote[];
  fullAccount: FullAccount | undefined;
  getUserVotes: () => Promise<void>;
  allMembersIds: [string, string][];
  votesLoading: boolean;
  totalGpos: number;
  tabServerApprovedVotesIds: string[];
};

export function useVoteTab({
  tab,
  tabAllMembers,
  allMembersIds,
  fullAccount,
  getUserVotes,
  totalGpos,
  votesLoading,
  tabServerApprovedVotesIds,
}: Args): UseVoteTabResult {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [isVotesChanged, setIsVotesChanged] = useState<boolean>(false);
  const [globalProperties, _setGlobalProperties] = useState<
    GlobalProperties | undefined
  >();
  const [updateAccountFee, setUpdateAccountFee] = useState<number>();
  //
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const afterCloseTransactionModal = useRef<() => void>();

  const { formKnownAssetBalanceById } = useAsset();
  const { defaultAsset } = useAssetsContext();
  const { formAccountBalancesByName } = useAccount();
  const { id, assets, name, localStorageAccount } = useUserContext();
  const { buildUpdateAccountTransaction } =
    useUpdateAccountTransactionBuilder();
  const { getTrxFee, buildTrx } = useTransactionBuilder();
  const { dbApi } = usePeerplaysApiContext();

  const sortVotesRows = useCallback((votes: VoteRow[]) => {
    const sorter = (a: VoteRow, b: VoteRow) =>
      Number(b.votes.split(" ")[0]) - Number(a.votes.split(" ")[0]);
    return votes.sort(sorter).map((vote, index) => {
      return { ...vote, rank: index + 1 };
    }) as VoteRow[];
  }, []);
  const formVoteRow = useCallback(
    (
      vote: Vote,
      votesIds: [string, string][],
      status: "approved" | "unapproved",
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
        possibleAction: undefined,
        active: voteActive,
        status: status,
      } as VoteRow;
    },
    [formKnownAssetBalanceById]
  );
  const tableRows = useMemo(() => {
    if (
      !votesLoading &&
      defaultAsset !== undefined &&
      globalProperties !== undefined
    ) {
      return sortVotesRows(
        tabAllMembers.map((member) => {
          return formVoteRow(
            member,
            allMembersIds,
            fullAccount?.votes.some((vote) => vote.id === member.id)
              ? "approved"
              : "unapproved",
            defaultAsset,
            globalProperties
          );
        })
      );
    }
    return [] as VoteRow[];
  }, [
    votesLoading,
    defaultAsset,
    globalProperties,
    sortVotesRows,
    tabAllMembers,
    formVoteRow,
    allMembersIds,
    fullAccount,
  ]);
  const [localApprovedVotesIds, setLocalApprovedVotesIds] = useState<string[]>(
    tabServerApprovedVotesIds
  );
  const [prevTabServerApprovedVotesIds, setPrevTabServerApprovedVotesIds] =
    useState<string[]>([]);
  if (!isArrayEqual(prevTabServerApprovedVotesIds, tabServerApprovedVotesIds)) {
    setPrevTabServerApprovedVotesIds(tabServerApprovedVotesIds);
    setLocalApprovedVotesIds(tabServerApprovedVotesIds);
  }

  const checkVotesChanged = useCallback(
    (serverApprovedVotesIds: string[], localApprovedVotesIds: string[]) => {
      const isVotesChanged = !isArrayEqual(
        serverApprovedVotesIds,
        localApprovedVotesIds
      );
      return isVotesChanged;
    },
    [isArrayEqual]
  );

  // Trx and fee creation
  const createUpdateAccountTrx = useCallback(
    (localApprovedVotesIds: string[]) => {
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

        // Other tabs approved votes
        const allTabsServerApprovedVotes = fullAccount.votes;
        const otherTabsServerApprovedVotesIds = allTabsServerApprovedVotes
          .filter(
            (approvedVote) =>
              parseInt(approvedVote.vote_id.split(":")[0]) !== memberIdentifier
          )
          .map((otherMember) => otherMember.vote_id);

        const allApprovedVotesIds = [
          ...localApprovedVotesIds,
          ...otherTabsServerApprovedVotesIds,
        ];

        new_options.votes = otherTabsServerApprovedVotesIds
          .concat(localApprovedVotesIds)
          .sort((a, b) => {
            const aSplit = a.split(":");
            const bSplit = b.split(":");

            return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
          });

        new_options.num_witness = allApprovedVotesIds.filter(
          (voteId) => parseInt(voteId.split(":")[0]) === 1
        ).length;
        new_options.num_committee = allApprovedVotesIds.filter(
          (voteId) => parseInt(voteId.split(":")[0]) === 0
        ).length;
        new_options.num_son = allApprovedVotesIds.filter(
          (voteId) => parseInt(voteId.split(":")[0]) === 3
        ).length;

        const trx = buildUpdateAccountTransaction(
          {
            new_options,
            extensions: { value: { update_last_voting_time: true } },
          },
          id
        );
        return trx;
      }
    },
    [tab, fullAccount, id, buildUpdateAccountTransaction]
  );
  const calculateUpdateAccountFee = useCallback(
    async (localApprovedVotesIds: string[]) => {
      const trx = createUpdateAccountTrx(localApprovedVotesIds);

      if (trx !== undefined) {
        const fee = await getTrxFee([trx]);
        if (fee !== undefined) {
          return fee;
        }
      }
    },
    [createUpdateAccountTrx, getTrxFee]
  );
  const calculateAndSetFee = useCallback(
    async (approvedVotesIds: string[]) => {
      const fee = await calculateUpdateAccountFee(approvedVotesIds);
      setUpdateAccountFee(fee);
    },
    [calculateUpdateAccountFee, setUpdateAccountFee]
  );

  // Events
  const resetChanges = useCallback(() => {
    setIsVotesChanged(false);
    setLocalApprovedVotesIds(tabServerApprovedVotesIds);
    calculateAndSetFee(tabServerApprovedVotesIds);
  }, [
    setIsVotesChanged,
    setLocalApprovedVotesIds,
    tabServerApprovedVotesIds,
    calculateAndSetFee,
  ]);
  const addVote = useCallback(
    (voteId: string) => {
      const newLocalApprovedVotesIds = [...localApprovedVotesIds, voteId];
      setLocalApprovedVotesIds(newLocalApprovedVotesIds);
      const votesChanged = checkVotesChanged(
        tabServerApprovedVotesIds,
        newLocalApprovedVotesIds
      );
      setIsVotesChanged(votesChanged);
      setConfirmed(false);
      calculateAndSetFee(newLocalApprovedVotesIds);
      if (afterCloseTransactionModal.current) {
        afterCloseTransactionModal.current = undefined;
      }
    },
    [
      localApprovedVotesIds,
      setLocalApprovedVotesIds,
      checkVotesChanged,
      tabServerApprovedVotesIds,
      setIsVotesChanged,
      setConfirmed,
      calculateAndSetFee,
      afterCloseTransactionModal,
      afterCloseTransactionModal.current,
    ]
  );
  const removeVote = useCallback(
    (voteId: string) => {
      const newLocalApprovedVotesIds = localApprovedVotesIds.filter(
        (vote_id) => vote_id !== voteId
      );
      setLocalApprovedVotesIds(newLocalApprovedVotesIds);
      const votesChanged = checkVotesChanged(
        tabServerApprovedVotesIds,
        newLocalApprovedVotesIds
      );
      setIsVotesChanged(votesChanged);
      setConfirmed(false);
      calculateAndSetFee(newLocalApprovedVotesIds);
      if (afterCloseTransactionModal.current) {
        afterCloseTransactionModal.current = undefined;
      }
    },
    [
      localApprovedVotesIds,
      setLocalApprovedVotesIds,
      checkVotesChanged,
      tabServerApprovedVotesIds,
      setIsVotesChanged,
      setConfirmed,
      calculateAndSetFee,
      afterCloseTransactionModal,
      afterCloseTransactionModal.current,
    ]
  );

  // submit changes
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
  const handleVoting = useCallback(
    async (signerKey: SignerKey) => {
      const votingErrorMessage = validateVoting(updateAccountFee as number);
      if (votingErrorMessage) {
        setTransactionErrorMessage(votingErrorMessage);
        return;
      }

      setTransactionErrorMessage("");
      let trxResult;
      try {
        setLoadingTransaction(true);
        const trx = await createUpdateAccountTrx(localApprovedVotesIds);
        trxResult = await buildTrx([trx], [signerKey]);
      } catch (error) {
        console.log(error);
        setTransactionErrorMessage(
          counterpart.translate(`field.errors.unable_transaction`)
        );
        setLoadingTransaction(false);
      }
      if (trxResult) {
        setTransactionErrorMessage("");
        setTransactionSuccessMessage(
          counterpart.translate(`field.success.published_votes`)
        );
        setLoadingTransaction(false);
        afterCloseTransactionModal.current = () => {
          formAccountBalancesByName(localStorageAccount);
          getUserVotes();
          setIsVotesChanged(false);
          setConfirmed(true);
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
      createUpdateAccountTrx,
      localApprovedVotesIds,
      buildTrx,
      formAccountBalancesByName,
      localStorageAccount,
      getUserVotes,
      setIsVotesChanged,
      afterCloseTransactionModal,
      afterCloseTransactionModal.current,
    ]
  );

  const getGlobalProperties = useCallback(async () => {
    try {
      const gpo: GlobalProperties = await dbApi("get_global_properties");
      return gpo;
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  useEffect(() => {
    let ignore = false;
    async function setGlobalProperties() {
      const gpo = await getGlobalProperties();
      if (!ignore) {
        _setGlobalProperties(gpo);
      }
    }
    setGlobalProperties();
    return () => {
      ignore = true;
    };
  }, [getGlobalProperties, _setGlobalProperties]);

  useEffect(() => {
    let ignore = false;
    async function setInitialUpdateAccountFee() {
      const initialFee = await calculateUpdateAccountFee(
        tabServerApprovedVotesIds
      );
      if (!ignore) {
        setUpdateAccountFee(initialFee);
      }
    }
    setInitialUpdateAccountFee();
    return () => {
      ignore = true;
    };
  }, [
    calculateUpdateAccountFee,
    setUpdateAccountFee,
    tabServerApprovedVotesIds,
  ]);

  return {
    name,
    confirmed,
    tableRows,
    isVotesChanged,
    resetChanges,
    addVote,
    removeVote,
    handleVoting,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    updateAccountFee,
    localApprovedVotesIds,
    afterSuccessTransactionModalClose: afterCloseTransactionModal.current,
  };
}
