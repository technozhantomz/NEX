export type UseVotingResult = {
  isModalVisible: boolean;
  isPassModalVisible: boolean;
  loading: boolean;
};

export interface VoteRow {
  key: string;
  approved: boolean;
  type: "witness" | "son" | "committee";
  name: string;
  webpage: string;
  votes: number;
  action: "add" | "remove";
}
