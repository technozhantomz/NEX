export type VoteRow = {
  // this is vote_id in Vote type
  id: string;
  key: string;
  rank: number;
  type: "witnesses" | "sons" | "committees";
  status: "approved" | "unapproved";
  name: string;
  url: string;
  votes: string;
  missedBlocks?: number;
  active: boolean;
  possibleAction: undefined;
};
