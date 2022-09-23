export type VoteRow = {
  // this is vote_id in Vote type
  id: string;
  key: string;
  rank: string;
  type: "witnesses" | "sons" | "committees";
  name: string;
  url: string;
  votes: string;
  action: "add" | "remove" | "cancel" | "";
  active: boolean;
};
