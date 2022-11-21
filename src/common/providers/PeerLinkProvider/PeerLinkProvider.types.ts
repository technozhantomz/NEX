export type PeerLinkContextType = {
  metaMask: MetaMask;
  connectToMetaMask: () => void;
};

export type MetaMask = {
  isConnected: boolean;
  selectedAddress: string;
};
