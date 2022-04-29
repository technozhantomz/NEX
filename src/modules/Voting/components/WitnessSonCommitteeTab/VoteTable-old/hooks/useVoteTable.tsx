import { useCallback, useEffect, useRef, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../common/components/UserProvider";
import {
  useAccount,
  useAsset,
  useFees,
  useTransactionBuilder,
} from "../../../../../../common/hooks";
import {
  Candidate,
  FullAccount,
  Vote,
  VoteModalData,
} from "../../../../../../common/types";

import { IVoteRow, UseVoteTabResult } from "./useVoteTable.types";

export function useVoteTable(tab: string): UseVoteTabResult {
  const [tableVotes, setTableVotes] = useState<IVoteRow[]>([]);
  const [tableNotVotes, setTableNotVotes] = useState<IVoteRow[]>([]);
  const [tableChanges, setTableChanges] = useState<IVoteRow[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPassModalVisible, setIsPassModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<VoteModalData>({});
  const [pendingTrx, setPendingTrx] = useState<Record<string, unknown>>({});
  const [trxResult, setTrxResult] = useState<[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { dbApi } = usePeerplaysApiContext();
  const { findOperationFee } = useFees();
  const { defaultAsset, setPrecision } = useAsset();
  const { buildTrx, getTrxFee } = useTransactionBuilder();
  const { localStorageAccount, votes, name, id, assets, updateAccount } =
    useUserContext();
  const { getPrivateKey, getFullAccount } = useAccount();

  const candidates = useRef<Candidate[]>([]);
  const [initialVoteCount, setInitialVoteCount] = useState<
    Record<string, number>
  >({ [tab]: 0 });
  const [votesAddedCount, setVotesAddedCount] = useState<
    Record<string, number>
  >({ [tab]: 0 });
  const [votesRemovedCount, setVotesRemovedCount] = useState<
    Record<string, number>
  >({ [tab]: 0 });

  useEffect(() => {
    setTableVotesCB();
    setIsPassModalVisible(false);
  }, [votes, localStorageAccount]);

  useEffect(() => {
    if (trxResult && trxResult.length) {
      setInitialVoteCount((x) => ({ ...x, [tab]: 0 }));
      setVotesAddedCount((x) => ({ ...x, [tab]: 0 }));
      setVotesRemovedCount((x) => ({ ...x, [tab]: 0 }));
      setTableChanges([]);
      updateVotes(trxResult[0].trx.operations[0][1].new_options.votes);
    }
  }, [trxResult]);

  useEffect(() => {
    if (modalData.account) {
      setIsModalVisible(true);
    }
  }, [modalData]);

  const updateVotes = useCallback(
    async (newVotes: string[]) => {
      const votesLookup: Vote[] = await dbApi("lookup_vote_ids", [
        newVotes,
        false,
      ]).then((e: any) =>
        e.length
          ? e.map((v: Vote) => {
              return v;
            })
          : []
      );
      updateAccount(id, name, assets, votesLookup);
    },
    [dbApi, updateAccount, id, name, assets]
  );

  const doAction = useCallback(
    async (txt: string, tableRow?: IVoteRow) => {
      switch (txt) {
        case "ADD": {
          const changedRecord = tableNotVotes.filter((x) => {
            return x.key === tableRow.key;
          });
          const newArrNotVotes = tableNotVotes.filter((x) => {
            return x.key !== tableRow.key;
          });
          changedRecord[0].action = "adding vote";
          setTableNotVotes(newArrNotVotes);
          setVotesAddedCount((x) => ({ ...x, [tab]: x[tab] + 1 }));
          const newArrChg = tableChanges
            .map((x) => {
              return x;
            })
            .concat(changedRecord);
          setTableChanges(newArrChg);
          break;
        }
        case "REMOVE": {
          const changedRecord = tableVotes.filter((x) => {
            return x.key === tableRow.key;
          });
          const newArrVotes = tableVotes.filter((x) => {
            return x.key !== tableRow.key;
          });
          changedRecord[0].action = "removing vote";
          setTableVotes(newArrVotes);
          setVotesRemovedCount((x) => ({ ...x, [tab]: x[tab] + 1 }));
          const newArrChg = tableChanges
            .map((x) => {
              return x;
            })
            .concat(changedRecord);
          setTableChanges(newArrChg);
          break;
        }
        case "UNDO": {
          const changedRecord = tableChanges.filter((x) => {
            return x.key === tableRow.key;
          });
          const newArrChg = tableChanges.filter((x) => {
            return x.key !== tableRow.key;
          });
          if (changedRecord[0].action === "adding vote") {
            // undo "adding vote", send back to not approved table.
            changedRecord[0].action = "none";
            const newArrNotVotes = tableNotVotes.concat(changedRecord);
            setTableNotVotes(newArrNotVotes);
            setVotesAddedCount((x) => ({ ...x, [tab]: x[tab] - 1 }));
          } else {
            // undo "removing vote", send back to approved table.
            changedRecord[0].action = "none";
            const newArrVotes = tableVotes.concat(changedRecord);
            setTableVotes(newArrVotes);
            setVotesRemovedCount((x) => ({ ...x, [tab]: x[tab] - 1 }));
          }
          setTableChanges(newArrChg);
          break;
        }
        case "RESET": {
          const toSendToVotes = tableChanges.filter((x) => {
            return x.action === "removing vote";
          });
          const toSendToNotVotes = tableChanges.filter((x) => {
            return x.action === "adding vote";
          });
          const newArrChg: IVoteRow[] = [];
          setTableChanges(newArrChg);
          const newArrNotVotes = tableNotVotes
            .concat(toSendToNotVotes)
            .map((x) => {
              x.action = "none";
              return x;
            });
          setTableNotVotes(newArrNotVotes);
          setVotesRemovedCount((x) => ({ ...x, [tab]: 0 }));
          const newArrVotes = tableVotes.concat(toSendToVotes).map((x) => {
            x.action = "none";
            return x;
          });
          setTableVotes(newArrVotes);
          setVotesAddedCount((x) => ({ ...x, [tab]: 0 }));
          break;
        }
        case "PUBLISH": {
          // Show the Confirmation Modal.
          const candidateCount =
            initialVoteCount[tab] -
            votesRemovedCount[tab] +
            votesAddedCount[tab];

          let account: FullAccount | undefined;
          await getFullAccount(name, false).then((x) => {
            account = x;
          });

          const newOptions = account?.account.options;

          const proxy = "No Proxy";

          switch (tab) {
            case "Advisors": {
              newOptions.num_committee = candidateCount;
              break;
            }
            case "Witnesses": {
              newOptions.num_witness = candidateCount;
              break;
            }
            case "SONs":
              break;
            case "Proxy": {
              // Put the Proxy Logic here...
              // await getProxy().then((x) => (proxy = x));
              break;
            }
            default:
              break;
          }

          const removingVotes = tableChanges.filter((x) => {
            return x.action === "removing vote";
          });
          const addingVotes = tableChanges.filter((x) => {
            return x.action === "adding vote";
          });
          const tempArr1 = newOptions?.votes.filter((x) => {
            return !removingVotes.some((y) => {
              return y.key === x;
            });
          });

          const addingVotesIds = addingVotes.map((x) => {
            return x.key;
          });

          const tempArr2 = tempArr1
            .filter((x) => {
              return !addingVotes.some((y) => {
                return y.key === x;
              });
            })
            .concat(addingVotesIds)
            .sort((a, b) => {
              const aSplit = a.split(":");
              const bSplit = b.split(":");

              return parseInt(aSplit[1], 10) - parseInt(bSplit[1], 10);
            })
            .sort((a, b) => {
              const aSplit = a.split(":");
              const bSplit = b.split(":");

              return parseInt(aSplit[0], 10) - parseInt(bSplit[0], 10);
            });

          newOptions.votes = tempArr2;

          const trx = {
            type: "account_update",
            params: {
              fee: {
                amount: 0,
                asset_id: defaultAsset?.id,
              },
              account: account?.account.id,
              new_options: newOptions,
              extensions: { value: { update_last_voting_time: true } },
            },
          };

          const fee = await getTrxFee([trx]);

          const md: VoteModalData = {
            account: localStorageAccount,
            proxy: proxy,
            candidateCount: candidateCount,
            fee: fee,
          };
          setPendingTrx(trx);
          setModalData(md);
          break;
        }
        default:
          break;
      }
    },
    [
      tableVotes,
      tableNotVotes,
      tableChanges,
      setTableVotes,
      setTableNotVotes,
      setTableChanges,
      setModalData,
      getFullAccount,
      setPendingTrx,
      findOperationFee,
      setPrecision,
      setVotesAddedCount,
      setVotesRemovedCount,
      initialVoteCount,
      votesAddedCount,
      votesRemovedCount,
    ]
  );

  const sendVotes = useCallback(
    async (password: string) => {
      const activeKey = getPrivateKey(password, "active");
      try {
        const trxRes = await buildTrx([pendingTrx], [activeKey]);
        setTrxResult(trxRes);
      } catch (e) {
        console.log(e);
      }
    },
    [getPrivateKey, pendingTrx, setTrxResult]
  );

  const formVoteRow = useCallback(
    async (vote: Vote): Promise<IVoteRow> => {
      let voteType: string;
      switch (parseInt(vote.vote_id.charAt(0))) {
        case 0:
          voteType = "Advisors";
          break;
        case 1:
          voteType = "Witnesses";
          break;
        case 3:
          voteType = "SONs";
          break;
        default:
          voteType = "Witnesses";
      }
      let name = "";
      if (candidates.current && candidates.current.length) {
        const currIndex = candidates.current.findIndex((x) => x[1] == vote.id);
        name = candidates.current[currIndex][0];
      }
      const v = { ...vote, name: name };
      return {
        key: v.vote_id,
        type: voteType,
        name: v.name,
        webpage: v.url,
        votes: v.total_votes,
        action: "none",
      };
    },
    [candidates.current]
  );

  const getNotApprovedVotes = useCallback(async (): Promise<Vote[]> => {
    let notVotes: Vote[] = [];
    try {
      const candidatesCM: Candidate[] = await dbApi(
        "lookup_committee_member_accounts",
        ["", 1000, false]
      ).then((e: any) =>
        e.length
          ? e.map((c: Candidate) => {
              return c;
            })
          : undefined
      );
      const candidatesW: Candidate[] = await dbApi("lookup_witness_accounts", [
        "",
        1000,
        false,
      ]).then((e: any) =>
        e.length
          ? e.map((c: Candidate) => {
              return c;
            })
          : undefined
      );
      const candidatesS: Candidate[] = await dbApi("lookup_son_accounts", [
        "",
        1000,
        false,
      ]).then((e: any) =>
        e.length
          ? e.map((c: Candidate) => {
              return c;
            })
          : undefined
      );
      candidates.current = candidatesCM.concat(candidatesW, candidatesS);
      const candidateIDs: string[] = candidates.current.map((x: Candidate) => {
        return x[1];
      });
      if (candidateIDs && candidateIDs.length) {
        const allVotes: Vote[] = await dbApi("get_objects", [
          candidateIDs,
          false,
        ]).then((e: any) =>
          e.length
            ? e.map((v: Vote) => {
                return v;
              })
            : undefined
        );
        if (allVotes && allVotes.length) {
          notVotes = allVotes.filter(
            (x) => votes.filter((y) => y.id == x.id).length == 0
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    return notVotes;
  }, [dbApi, votes, candidates.current]);

  const setTableVotesCB = useCallback(async () => {
    try {
      setLoading(true);

      await getNotApprovedVotes().then(async (notVotes) => {
        const notVoteRows = await Promise.all(notVotes.map(formVoteRow));
        setTableNotVotes(notVoteRows);
      });

      if (votes && votes.length) {
        const voteRows = await Promise.all(votes.map(formVoteRow));
        setTableVotes(voteRows);
        setInitialVoteCount((x) => ({
          ...x,
          [tab]: voteRows.filter((y) => {
            return y.type === tab;
          }).length,
        }));
      } else {
        setTableVotes([]);
        setInitialVoteCount((x) => ({ ...x, [tab]: 0 }));
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }, [
    getNotApprovedVotes,
    formVoteRow,
    setTableVotes,
    setTableNotVotes,
    setLoading,
    votes,
    setInitialVoteCount,
  ]);

  return {
    tableVotes,
    tableNotVotes,
    tableChanges,
    loading,
    setTableVotes,
    setTableNotVotes,
    doAction,
    modalData,
    isModalVisible,
    setIsModalVisible,
    isPassModalVisible,
    setIsPassModalVisible,
    sendVotes,
  };
}
