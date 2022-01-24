import { config as Config } from "./config";
import { testnetCheck } from "./networkparams";

const testnetNodes = [
  {
    location: "Global",
    url: Config.blockchainEndpoints[0],
    user: {
      name: "Peerplays Witnesses",
      status: "Witness",
    },
  },
];

const prodNodes = [
  {
    location: "Global",
    url: Config.blockchainEndpoints[0],
    user: {
      name: "Peerplays Witnesses",
      status: "Witness",
    },
  },
];

export const defaultNodesList = testnetCheck ? testnetNodes : prodNodes;
