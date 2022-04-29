export type VoteRow = {
  id: string;
  key: string;
  type: "witnesses" | "sons" | "committees";
  name: string;
  webpage: string;
  votes: string;
  action: "add" | "remove" | "";
};
