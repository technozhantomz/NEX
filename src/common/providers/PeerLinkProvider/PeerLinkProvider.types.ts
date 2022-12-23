export type PeerLinkContextType = {
  metaMask: MetaMask;
  hive: Hive;
  connectToMetaMask: () => void;
  connectToHive: () => void;
};

export type MetaMask = {
  isConnected: boolean;
  selectedAddress: string;
};

export type Hive = {
  isConnected: boolean;
  userName: string;
};
