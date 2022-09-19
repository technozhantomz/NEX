import { ApiServer, ApiSettings, LatencyPreferences } from "../../common/types";

import { defaultNodesList } from ".";

export const defaultApiSettings: ApiSettings = {
  filteredApiServers: [],
  apiLatencies: {},
  latencyPreferences: {} as LatencyPreferences,
  apiServers: defaultNodesList.map((node) => {
    return {
      node,
      hidden: false,
    } as ApiServer;
  }),
  latencyChecks: 0,
};
