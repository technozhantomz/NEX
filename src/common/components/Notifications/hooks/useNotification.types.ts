export interface ActivityRow {
  key: string;
  time: string;
  type: string;
  info: string;
  id: string;
  fee: string;
}

export type UseActivityTableResult = {
  activitiesTable: ActivityRow[];
  loading: boolean;
  recentActivitiesTable: ActivityRow[];
  unread: ActivityRow[];
  showUnread: boolean;
  handleShowUnread: () => void;
  unreadMessages: ActivityRow[];
};

export type UseActivityTableArgs = {
  userName?: string;
  isWalletActivityTable?: boolean;
};
