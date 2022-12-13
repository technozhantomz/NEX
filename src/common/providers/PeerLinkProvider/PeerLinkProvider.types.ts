import { HiveKeyChain, MetaMask } from "../../types";

export type PeerLinkContextType = {
  metaMask: MetaMask;
  hiveKeyChain: HiveKeyChain;
  connectToMetaMask: () => void;
  connectToHiveKeyChain: () => void;
};
