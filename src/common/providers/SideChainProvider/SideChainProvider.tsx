import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { useSessionStorage } from "../../hooks";
import { BitcoinSidechainAccounts, SidechainAcccount } from "../../types";
import { usePeerplaysApiContext } from "../PeerplaysApiProvider";
import { useUserContext } from "../UserProvider";

import { SideChainContextType } from "./SideChainProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultSideChainState: SideChainContextType = {
  sidechainAccounts: [],
  hasBTCDepositAddress: false,
  hasBTCWithdrawPublicKey: false,
  hasHiveAddress: false,
  hasEthereumAddress: false,
  bitcoinSidechainAccounts: undefined,
  bitcoinSidechainAccount: undefined,
  hiveSidechainAccount: undefined,
  ethereumSidechainAccount: undefined,
  loadingSidechainAccounts: true,
  setBitcoinSidechainAccounts: function (value: BitcoinSidechainAccounts) {
    throw new Error(`Function not implemented. ${value},`);
  },
  getSidechainAccounts: function (accountId: string) {
    throw new Error(`Function not implemented. ${accountId},`);
  },
};

const SideChainContext = createContext<SideChainContextType>(
  defaultSideChainState
);

export const SideChainProvider = ({ children }: Props): JSX.Element => {
  const { dbApi } = usePeerplaysApiContext();
  const { id } = useUserContext();
  const [sidechainAccounts, setSidechainAccounts] = useState<
    SidechainAcccount[]
  >([]);
  const [bitcoinSidechainAccount, setBitcoinSidechainAccount] =
    useState<SidechainAcccount>();
  const [hiveSidechainAccount, setHiveSidechainAccount] =
    useState<SidechainAcccount>();
  const [ethereumSidechainAccount, setEthereumSidechainAccount] =
    useState<SidechainAcccount>();
  const [loadingSidechainAccounts, setLoadingSidechainAccounts] =
    useState<boolean>(true);
  const [hasBTCDepositAddress, setHasBTCDepositAddress] =
    useState<boolean>(false);
  const [hasBTCWithdrawPublicKey, setHasBTCWithdrawPublicKey] =
    useState<boolean>(false);
  const [hasHiveAddress, setHasHiveAddress] = useState<boolean>(false);
  const [hasEthereumAddress, setHasEthereumAddress] = useState<boolean>(false);
  const [bitcoinSidechainAccounts, setBitcoinSidechainAccounts] =
    useSessionStorage("bitcoinSidechainAccounts") as [
      BitcoinSidechainAccounts,
      (value: BitcoinSidechainAccounts) => void
    ];

  const getSidechainAccounts = useCallback(
    async (accountId: string) => {
      try {
        setLoadingSidechainAccounts(true);
        const accounts = (await dbApi("get_sidechain_addresses_by_account", [
          accountId,
        ])) as SidechainAcccount[];
        setSidechainAccounts(accounts);
        if (accounts && accounts.length) {
          accounts.forEach((account) =>
            setSideChainAccountBySidechain(account)
          );
        }
        setLoadingSidechainAccounts(false);
      } catch (e) {
        console.log(e);
        setLoadingSidechainAccounts(false);
      }
    },
    [
      dbApi,
      setSidechainAccounts,
      setHasBTCDepositAddress,
      setLoadingSidechainAccounts,
      setHasBTCWithdrawPublicKey,
    ]
  );

  const setSideChainAccountBySidechain = useCallback(
    (sidechainAccount: SidechainAcccount) => {
      switch (sidechainAccount.sidechain) {
        case "bitcoin":
          setBitcoinSidechainAccount(sidechainAccount);
          if (
            sidechainAccount.deposit_address &&
            sidechainAccount.deposit_address !== ""
          ) {
            setHasBTCDepositAddress(true);
          }
          if (
            sidechainAccount.withdraw_public_key &&
            sidechainAccount.withdraw_public_key !== ""
          ) {
            setHasBTCWithdrawPublicKey(true);
          }
          break;
        case "hive":
          setHiveSidechainAccount(sidechainAccount);
          if (
            sidechainAccount.deposit_address &&
            sidechainAccount.deposit_address !== ""
          ) {
            setHasHiveAddress(true);
          }
          break;
        case "ethereum":
          setEthereumSidechainAccount(sidechainAccount);
          if (
            sidechainAccount.deposit_address &&
            sidechainAccount.deposit_address !== ""
          ) {
            setHasEthereumAddress(true);
          }
          break;
        default:
          break;
      }
    },
    [setBitcoinSidechainAccount]
  );

  const updateSidechainAccounts = useCallback(
    (
      sidechainAccounts: SidechainAcccount[],
      bitcoinSidechainAccount: SidechainAcccount | undefined,
      hasBTCDepositAddress: boolean,
      hasBTCWithdrawPublicKey: boolean,
      hasHiveAddress: boolean,
      hasEthereumAddress: boolean
    ) => {
      setSidechainAccounts(sidechainAccounts);
      setBitcoinSidechainAccount(bitcoinSidechainAccount);
      setHasBTCDepositAddress(hasBTCDepositAddress);
      setHasBTCWithdrawPublicKey(hasBTCWithdrawPublicKey);
      setHasHiveAddress(hasHiveAddress);
      setHasEthereumAddress(hasEthereumAddress);
    },
    [
      setSidechainAccounts,
      setBitcoinSidechainAccount,
      setHasBTCDepositAddress,
      setHasBTCWithdrawPublicKey,
    ]
  );

  useEffect(() => {
    if (id !== null && id !== "") {
      getSidechainAccounts(id);
    } else {
      updateSidechainAccounts([], undefined, false, false, false, false);
    }
  }, [id, getSidechainAccounts]);

  return (
    <SideChainContext.Provider
      value={{
        hasBTCDepositAddress,
        hasBTCWithdrawPublicKey,
        hasHiveAddress,
        hasEthereumAddress,
        getSidechainAccounts,
        loadingSidechainAccounts,
        sidechainAccounts,
        hiveSidechainAccount,
        ethereumSidechainAccount,
        bitcoinSidechainAccount,
        bitcoinSidechainAccounts,
        setBitcoinSidechainAccounts,
      }}
    >
      {children}
    </SideChainContext.Provider>
  );
};

export const useSideChainContext = (): SideChainContextType => {
  return useContext<SideChainContextType>(SideChainContext);
};
