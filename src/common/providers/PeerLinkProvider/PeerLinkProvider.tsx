import { useMetaMask } from "metamask-react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { MetaMask, PeerLinkContextType } from "./PeerLinkProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultPeerLinkState: PeerLinkContextType = {
  metaMask: {
    isConnected: false,
    selectedAddress: "",
  },
  connectToMetaMask: () =>
    function () {
      throw new Error(`Function not implemented.`);
    },
};

const PeerLinkContext =
  createContext<PeerLinkContextType>(defaultPeerLinkState);

export const PeerLinkProvider = ({ children }: Props): JSX.Element => {
  const [metaMask, setMetaMask] = useState<MetaMask>(
    defaultPeerLinkState.metaMask
  );
  const { ethereum, status, connect } = useMetaMask();

  const connectToMetaMask = async () => {
    const accounts = await connect();
    if (accounts?.length) {
      // const { account, chainId } = useConnectedMetaMask();
      // console.log("account:", account);
      // console.log("chainId:", chainId);
      setMetaMask({
        isConnected: ethereum.selectedAddress ? true : false,
        selectedAddress: ethereum.selectedAddress,
      });
    }
  };

  useEffect(() => {
    if (ethereum) {
      console.log("status:", status);
      setMetaMask({
        isConnected: ethereum.selectedAddress ? true : false,
        selectedAddress: ethereum.selectedAddress,
      });
    }
  }, [ethereum]);

  return (
    <PeerLinkContext.Provider value={{ metaMask, connectToMetaMask }}>
      {children}
    </PeerLinkContext.Provider>
  );
};

export const usePeerLinkContext = (): PeerLinkContextType => {
  return useContext<PeerLinkContextType>(PeerLinkContext);
};
