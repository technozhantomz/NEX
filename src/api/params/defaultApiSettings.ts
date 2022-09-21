import {
  ApiLatencies,
  ApiServer,
  ApiSettings,
  LatencyPreferences,
} from "../../common/types";

import { defaultNodesList } from ".";

export const defaultApiSettings: ApiSettings = {
  selectedNode: defaultNodesList[0].url,
  filteredApiServers: [],
  apiServers: defaultNodesList.map((node) => {
    return {
      node,
      hidden: false,
    } as ApiServer;
  }),
};

export const defaultApiLatencies = {} as ApiLatencies;

export const defaultLatencyPreferences = {} as LatencyPreferences;
