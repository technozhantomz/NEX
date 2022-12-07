//done
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
  const [loadingDefaultAsset, setLoadingDefaultAsset] = useState<boolean>(true);
  const [defaultAsset, _setDefaultAsset] = useState<Asset>();
  const [loadingSidechainAssets, setLoadingSidechainAssets] =
    useState<boolean>(true);
  const [sidechainAssets, _setSidechainAssets] = useState<
    (Asset | undefined)[]
  >([]);

  const { dbApi } = usePeerplaysApiContext();
  const { getAssetById, getAssetBySymbol } = useAsset();

  const getDefaultAsset = useCallback(async () => {
    try {
      const defaultAsset = await getAssetBySymbol(defaultToken as string);
      return defaultAsset;
    } catch (e) {
      console.log(e);
    }
  }, [getAssetBySymbol]);

  const getSidechainAssets = useCallback(async () => {
    try {
      const globalProperties: GlobalProperties = await dbApi(
        "get_global_properties"
      );
      const btcAssetId = globalProperties.parameters.extensions.btc_asset;
      const hbdAssetId = globalProperties.parameters.extensions.hbd_asset;
      const hiveAssetId = globalProperties.parameters.extensions.hive_asset;

      const sidechainAssetsIds = [btcAssetId, hbdAssetId, hiveAssetId];

      const sidechainAssets = await Promise.all(
        sidechainAssetsIds.map(getAssetById)
      );
      return sidechainAssets;
    } catch (e) {
      console.log(e);
    }
  }, [dbApi, getAssetById]);

  useEffect(() => {
    let ignore = false;
    async function setDefaultAsset() {
      setLoadingDefaultAsset(true);
      const defaultAsset = await getDefaultAsset();
      if (!ignore) {
        _setDefaultAsset(defaultAsset);
        setLoadingDefaultAsset(false);
      }
    }
    setDefaultAsset();
    return () => {
      ignore = true;
    };
  }, [getDefaultAsset, setLoadingDefaultAsset, _setDefaultAsset]);

  useEffect(() => {
    let ignore = false;

    async function setSidechainAssets() {
      setLoadingSidechainAssets(true);
      const sidechainAssets = await getSidechainAssets();
      if (!ignore) {
        if (sidechainAssets) {
          _setSidechainAssets(sidechainAssets);
        }
        setLoadingSidechainAssets(false);
      }
    }

    setSidechainAssets();

    return () => {
      ignore = true;
    };
  }, [getSidechainAssets, setLoadingSidechainAssets, _setSidechainAssets]);

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
