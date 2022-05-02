export type VoteRow = {
  id: string;
  key: string;
  type: "witnesses" | "sons" | "committees";
  name: string;
  website: string;
  votes: string;
  action: "add" | "remove" | "";
};
