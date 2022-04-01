import { Dispatch, SetStateAction } from "react";

export interface IVoteRow {
  key: string;
  type: string;
  name: string;
  webpage: string;
  votes: number;
  action: string;
}

export type UseVoteTabResult = {
  tableVotes: IVoteRow[];
  tableNotVotes: IVoteRow[];
  tableChanges: IVoteRow[];
  loading: boolean;
  setTableVotes: Dispatch<SetStateAction<IVoteRow[]>>;
  setTableNotVotes: Dispatch<SetStateAction<IVoteRow[]>>;
  doAction: (txt: string, tableRow?: IVoteRow) => Promise<void>;
};
