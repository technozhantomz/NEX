export interface IVoteRow {
  key: string;
  type: string;
  name?: string;
  webpage: string;
  votes: number;
}

export type UseVoteTabResult = {
  tableVotes: IVoteRow[];
  tableNotVotes: IVoteRow[];
  loading: boolean;
};
