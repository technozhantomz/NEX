export type Node = {
  url: string;
  // could be the city
  location: string;
  region?: string;
  country?: string;
  user?: {
    name: string;
    status: string;
  };
};

export type NodeTreeBranch = {
  all: Node[];
  [country: string]: undefined | Node[];
};

export type NodeTree = {
  [region: string]: undefined | NodeTreeBranch;
};

export type ApiServer = {
  hidden: boolean;
  name?: string | { translate: string };
  latency?: number;
  node: Node;
};

export type ApiLatencies = {
  [url: string]: number | undefined;
};

export type LatencyPreferences = {
  region: string;
  country: string;
};

export type ApiSettings = {
  activeUrl?: string;
  // could be region or url
  filteredApiServers: string[];
  apiLatencies: ApiLatencies;
  apiServers: ApiServer[];
  latencyPreferences: LatencyPreferences;
  latencyChecks: number;
};
