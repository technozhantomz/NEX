import { useCallback, useEffect, useRef, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components/PeerplaysApiProvider";
import { useUserContext } from "../../../../../common/components/UserProvider";
import { Candidate, Vote } from "../../../../../common/types";

import { IVoteRow, UseVoteTabResult } from "./useVoteTable.types";

export function useVoteTable(): UseVoteTabResult {
  const [tableVotes, _setTableVotes] = useState<IVoteRow[]>([]);
  const [tableNotVotes, _setTableNotVotes] = useState<IVoteRow[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const { dbApi } = usePeerplaysApiContext();
  const { localStorageAccount, votes } = useUserContext();
  const candidates = useRef<Candidate[]>([]);

  useEffect(() => {
    setTableVotes();
  }, [votes, localStorageAccount]);

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
      //console.log(vote.id);
      //console.log(candidates);
      let name = "";
      if (candidates.current && candidates.current.length) {
        const currIndex = candidates.current.findIndex((x) => x[1] == vote.id);
        //console.log(currIndex);
        name = candidates.current[currIndex][0];
      }
      const v = { ...vote, name: name };
      return {
        key: v.vote_id,
        type: voteType,
        name: v.name,
        webpage: v.url,
        votes: v.total_votes,
      };
    },
    [dbApi]
  );

  const setTableVotes = useCallback(async () => {
    if (votes && votes.length) {
      try {
        setLoading(true);

        await getNotApprovedVotes().then(async (notVotes) => {
          const notVoteRows = await Promise.all(notVotes.map(formVoteRow));
          _setTableNotVotes(notVoteRows);
        });

        const voteRows = await Promise.all(votes.map(formVoteRow));
        _setTableVotes(voteRows);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
    }
  }, [formVoteRow, _setTableVotes, setLoading, votes]);

  async function getNotApprovedVotes(): Promise<Vote[]> {
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
      candidates.current = [...candidatesCM, ...candidatesW, ...candidatesS];
      const candidateIDs: string[] = candidates.current.map((x: Candidate) => {
        return x[1];
      });
      if (candidateIDs && candidateIDs.length) {
        console.log(candidateIDs);
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
          console.log(allVotes);
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
  }

  return { tableVotes, tableNotVotes, loading };
}
