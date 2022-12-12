import { useMetaMask } from "metamask-react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useSessionStorage, useSidechainTransactionBuilder } from "../../hooks";
import { useUserContext } from "../UserProvider";

import { Hive, MetaMask, PeerLinkContextType } from "./PeerLinkProvider.types";

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
  hive: {
    isConnected: false,
    userName: "",
    publicKey: "",
  },
  connectToMetaMask: () =>
    function () {
      throw new Error(`Function not implemented.`);
    },
  connectToHive: () =>
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
  const [hive, setHive] = useState<Hive>(defaultPeerLinkState.hive);
  const [hivePublicKey, setHivePublicKey] = useSessionStorage(
    "PL-hivePublicKey"
  ) as [string, (value: string) => void];
  const [hiveUserName, setHiveUserName] = useSessionStorage(
    "PL-hiveUserName"
  ) as [string, (value: string) => void];
  const { ethereum, connect } = useMetaMask();

  const { localStorageAccount, id } = useUserContext();
  const { buildAddingSidechainTransaction } = useSidechainTransactionBuilder();

  const connectToMetaMask = async () => {
    const accounts = await connect();
    if (accounts?.length) {
      if (ethereum) {
        setMetaMask({
          isConnected: ethereum.selectedAddress ? true : false,
          selectedAddress: ethereum.selectedAddress,
        });
      }
    }
    if (localStorageAccount !== "") {
      buildAddingSidechainTransaction(
        id,
        metaMask.selectedAddress,
        metaMask.selectedAddress,
        metaMask.selectedAddress,
        metaMask.selectedAddress,
        "ethereum"
      );
    }
  };

  const connectToHive = async () => {
    console.log("connect to hive");
    const args = {
      title: "Sign In",
      message: `Click "Confirm" to sign in with Hive Keychain`,
      key: "Posting",
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
              setHivePublicKey(response.publicKey);
              setHive({
                isConnected: true,
                userName: response.data.username,
                publicKey: response.publicKey,
              });
            }
          },
          args.rpc,
          args.title
        );
        if (localStorageAccount !== "") {
          buildAddingSidechainTransaction(
            id,
            hivePublicKey,
            hiveUserName,
            hivePublicKey,
            hiveUserName,
            "hive"
          );
        }
      } else {
        console.warn("Hive keychain is not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ethereum) {
      setMetaMask({
        isConnected: ethereum.selectedAddress ? true : false,
        selectedAddress: ethereum.selectedAddress,
      });
    }
  }, [ethereum]);

  useEffect(() => {
    if (hiveUserName && hivePublicKey) {
      setHive({
        isConnected: true,
        userName: hiveUserName,
        publicKey: hivePublicKey,
      });
    }
  }, [hiveUserName, hivePublicKey]);

  return (
    <PeerLinkContext.Provider
      value={{ metaMask, hive, connectToMetaMask, connectToHive }}
    >
      {children}
    </PeerLinkContext.Provider>
  );
};

export const usePeerLinkContext = (): PeerLinkContextType => {
  return useContext<PeerLinkContextType>(PeerLinkContext);
};
