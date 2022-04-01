import { useCallback, useEffect, useRef, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../common/components/UserProvider";
import { Candidate, Vote } from "../../../../../common/types";

import { IVoteRow, UseVoteTabResult } from "./useVoteTable.types";

export function useVoteTable(): UseVoteTabResult {
  const [tableVotes, setTableVotes] = useState<IVoteRow[]>([]);
  const [tableNotVotes, setTableNotVotes] = useState<IVoteRow[]>([]);
  const [tableChanges, setTableChanges] = useState<IVoteRow[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { dbApi } = usePeerplaysApiContext();
  const { localStorageAccount, votes } = useUserContext();
  const candidates = useRef<Candidate[]>([]);

  useEffect(() => {
    setTableVotesCB();
  }, [votes, localStorageAccount]);

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
          } else {
            // undo "removing vote", send back to approved table.
            changedRecord[0].action = "none";
            const newArrVotes = tableVotes.concat(changedRecord);
            setTableVotes(newArrVotes);
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
          const newArrVotes = tableVotes.concat(toSendToVotes).map((x) => {
            x.action = "none";
            return x;
          });
          setTableVotes(newArrVotes);
          break;
        }
        case "PUBLISH": {
          // Send changes to the blockchain!
          
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
    ]
  );

  const formVoteRow = useCallback(
    async (vote: Vote): Promise<IVoteRow> => {
      let voteType: string;
      switch (parseInt(vote.vote_id.charAt(0))) {
        case 0:
          voteType = "Advisors";
          break;
        case 1:
          voteType = "Witness";
          break;
        case 3:
          voteType = "SONs";
          break;
        default:
          voteType = "Witness";
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
        //console.log(candidateIDs);
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
          //console.log(allVotes);
          notVotes = allVotes.filter(function (x) {
            return (
              votes.filter(function (y) {
                return y.id == x.id;
              }).length == 0
            );
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
    return notVotes;
  }, [dbApi, candidates.current]);

  const setTableVotesCB = useCallback(async () => {
    if (votes && votes.length) {
      try {
        setLoading(true);

        await getNotApprovedVotes().then(async (notVotes) => {
          const notVoteRows = await Promise.all(notVotes.map(formVoteRow));
          setTableNotVotes(notVoteRows);
        });

        const voteRows = await Promise.all(votes.map(formVoteRow));
        setTableVotes(voteRows);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
    }
  }, [
    getNotApprovedVotes,
    formVoteRow,
    setTableVotes,
    setTableNotVotes,
    setLoading,
    votes,
  ]);

  return {
    tableVotes,
    tableNotVotes,
    tableChanges,
    loading,
    setTableVotes,
    setTableNotVotes,
    doAction,
  };
}
