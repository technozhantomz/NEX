import { ActivityRow } from "../../types";

export type UseActivityResult = {
  getActivitiesRows: (userName: string) => Promise<ActivityRow[]>;
};
