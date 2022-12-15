import { useMetaMask } from "metamask-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useSessionStorage } from "../../hooks";
import { HiveKeyChain, MetaMask } from "../../types";
import { useUserContext } from "../UserProvider";

import { PeerLinkContextType } from "./PeerLinkProvider.types";

declare global {
  interface Window {
    hive_keychain: any;
    ethereum: any;
  }
}

type Props = {
  children: React.ReactNode;
};

const defaultPeerLinkState: PeerLinkContextType = {
  metaMask: {
    isConnected: false,
    selectedAddress: "",
  },
  hiveKeyChain: {
    isConnected: false,
    userName: "",
    activePubkey: "",
  },
  connectToMetaMask: () =>
    function () {
      throw new Error(`Function not implemented.`);
    },
  connectToHiveKeyChain: () =>
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
  const [hiveKeyChain, setHiveKeyChain] = useState<HiveKeyChain>(
    defaultPeerLinkState.hiveKeyChain
  );
  const [hiveUserName, setHiveUserName] = useSessionStorage(
    "PL-hiveUserName"
  ) as [string, (value: string) => void];
  const [hiveActivePubKey, setHiveActivePubKey] = useSessionStorage(
    "PL-hiveActivePubKey"
  ) as [string, (value: string) => void];
  const { ethereum, connect } = useMetaMask();

  const { localStorageAccount } = useUserContext();

  const connectToMetaMask = useCallback(async () => {
    const accounts = await connect();
    if (accounts?.length) {
      if (ethereum) {
        setMetaMask({
          isConnected: ethereum.selectedAddress ? true : false,
          selectedAddress: ethereum.selectedAddress,
        });
      }
    }
  }, [localStorageAccount, setMetaMask]);

  const connectToHiveKeyChain = async () => {
    const args = {
      title: "Sign In",
      message: `Click "Confirm" to sign in with Hive Keychain`,
      key: "Active",
      account: null,
      rpc: null,
    };

    try {
      if (window.hive_keychain as unknown) {
        const keychain = window.hive_keychain;
        keychain.requestSignBuffer(
          args.account,
          args.message,
          args.key,
          async (response: any) => {
            if (response.success) {
              setHiveUserName(response.data.username);
              setHiveActivePubKey(response.publicKey);
              setHiveKeyChain({
                isConnected: true,
                userName: response.data.username,
                activePubkey: response.publicKey,
              });
            }
          },
          args.rpc,
          args.title
        );
      } else {
        console.warn("Hive keychain is not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (hiveUserName) {
      setHiveKeyChain({
        isConnected: true,
        userName: hiveUserName,
        activePubkey: hiveActivePubKey,
      });
    }
    if (ethereum) {
      setMetaMask({
        isConnected: ethereum.selectedAddress ? true : false,
        selectedAddress: ethereum.selectedAddress,
      });
    }
  }, [hiveUserName, ethereum]);

  return (
    <PeerLinkContext.Provider
      value={{
        metaMask,
        hiveKeyChain,
        connectToMetaMask,
        connectToHiveKeyChain,
      }}
    >
      {children}
    </PeerLinkContext.Provider>
  );
};

export const usePeerLinkContext = (): PeerLinkContextType => {
  return useContext<PeerLinkContextType>(PeerLinkContext);
};
