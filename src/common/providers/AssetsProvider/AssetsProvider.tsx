import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePeerplaysApiContext } from "..";
import { defaultToken } from "../../../api/params";
import { useAsset } from "../../hooks";
import { Asset, GlobalProperties } from "../../types";

import { AssetsContextType } from "./AssetsProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultAssetsState: AssetsContextType = {
  defaultAsset: undefined,
  sidechainAssets: [],
  loadingSidechainAssets: true,
  loadingDefaultAsset: true,
};

const AssetsContext = createContext<AssetsContextType>(defaultAssetsState);

export const AssetsProvider = ({ children }: Props): JSX.Element => {
  const [defaultAsset, setDefaultAsset] = useState<Asset>();
  const [sidechainAssets, setSidechainAssets] = useState<Asset[]>([]);
  const [loadingSidechainAssets, setLoadingSidechainAssets] =
    useState<boolean>(true);
  const [loadingDefaultAsset, setLoadingDefaultAsset] = useState<boolean>(true);

  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById, getAssetBySymbol } = useAsset();

  const getDefaultAsset = useCallback(async () => {
    try {
      setLoadingDefaultAsset(true);
      const defaultAsset = await getAssetBySymbol(defaultToken as string);
      setDefaultAsset(defaultAsset);
      setLoadingDefaultAsset(false);
    } catch (e) {
      console.log(e);
      setLoadingDefaultAsset(false);
    }
  }, [getAssetBySymbol, setDefaultAsset]);

  const getSidechainAssets = useCallback(async () => {
    try {
      setLoadingSidechainAssets(true);
      const globalProperties: GlobalProperties = await dbApi(
        "get_global_properties"
      );

      const btcAssetId = globalProperties.parameters.extensions
        .btc_asset as string;
      const hbdAssetId = globalProperties.parameters.extensions
        .hbd_asset as string;
      const hiveAssetId = globalProperties.parameters.extensions
        .hive_asset as string;

      const sidechainAssetsIds = [btcAssetId, hbdAssetId, hiveAssetId];

      const sidechainAssets = await Promise.all(
        sidechainAssetsIds.map(getAssetById)
      );
      setSidechainAssets(sidechainAssets);
      setLoadingSidechainAssets(false);
    } catch (e) {
      console.log(e);
      setLoadingSidechainAssets(false);
    }
  }, [dbApi, getAssetById, setSidechainAssets, setLoadingSidechainAssets]);

  useEffect(() => {
    getDefaultAsset();
  }, [getDefaultAsset]);

  useEffect(() => {
    getSidechainAssets();
  }, [getSidechainAssets]);

  return (
    <AssetsContext.Provider
      value={{
        defaultAsset,
        sidechainAssets,
        loadingSidechainAssets,
        loadingDefaultAsset,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssetsContext = (): AssetsContextType => {
  return useContext<AssetsContextType>(AssetsContext);
};
