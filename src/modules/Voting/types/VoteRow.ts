export type VoteRow = {
  // this is vote_id in Vote type
  id: string;
  key: number;
  rank: number;
  type: "witnesses" | "sons" | "committees";
  name: string;
  website: string;
  votes: string;
  action: "add" | "remove" | "";
  active: boolean;
};
