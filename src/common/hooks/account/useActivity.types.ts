import { ActivityRow } from "../../components/PageLayout/TopBar/components/NotificationMenu/Notifications/hooks/useNotification.types";

export type UseActivityResult = {
  getActivitiesRows: (userName: string) => Promise<ActivityRow[]>;
};
