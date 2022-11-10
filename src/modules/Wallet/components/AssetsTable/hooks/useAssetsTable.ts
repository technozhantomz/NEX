import { sum, uniq } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { utils } from "../../../../../api/utils";
import { useAccount, useAsset } from "../../../../../common/hooks";
import { useUserContext } from "../../../../../common/providers";
import { Asset, FullAccount } from "../../../../../common/types";
import { AssetColumnType, createAssetsColumns } from "../../AssetsColumns";

import { AssetTableRow, UseAssetsTabResult } from "./useAssetsTable.types";

type Args = {
  actionType?: "send_receive" | "receive_select" | "send_select";
  filterAsset?: string;
};

export function useAssetsTable({
  filterAsset,
  actionType,
}: Args): UseAssetsTabResult {
  const [assetsTableRows, _setAssetsTableRows] = useState<AssetTableRow[]>([]);
  const [searchDataSource, setSearchDataSource] = useState<AssetTableRow[]>([]);
  const [assetsColumns, setAssetsColumns] = useState<AssetColumnType[]>([]);
  const [fullAccount, _setFullAccount] = useState<FullAccount | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const { assets, localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();
  const { setPrecision } = useAsset();

  const formAssetRow = useCallback(
    (asset: Asset): AssetTableRow => {
      const available = asset.amount as number;
      let inOrders = 0;
      if (fullAccount) {
        const limitOrders = fullAccount.limit_orders;
        const limitOrdersForTheAsset = limitOrders.filter((limitOrder) => {
          const orderAssetsIds = [limitOrder.sell_price.base.asset_id];
          return orderAssetsIds.includes(asset.id);
        });
        const limitOrdersAmountsForTheAsset = limitOrdersForTheAsset.map(
          (order) => setPrecision(false, order.for_sale, asset.precision)
        );
        inOrders = sum(limitOrdersAmountsForTheAsset);
      }
      return {
        key: asset.id,
        symbol: asset.symbol,
        name: utils.getBlockchainFromSymbol(asset.symbol),
        available: available,
        inOrders: inOrders,
      };
    },
    [fullAccount, setPrecision]
  );

  const setAssetsTableRows = useCallback(() => {
    if (fullAccount && assets && assets.length) {
      try {
        setLoading(true);
        const assetsRows = assets
          .filter((asset) => asset.symbol !== filterAsset)
          .map(formAssetRow);

        const symbols = assetsRows.map((asset) => asset.symbol);
        const allNames = assetsRows.map((row) => row.name);
        const uniqNames = uniq(allNames);
        const updatedColumns = createAssetsColumns(actionType).map((column) => {
          switch (true) {
            case column.key === "symbol":
              column.filters = symbols.map((symbol) => {
                return { text: symbol, value: symbol };
              });
              break;
            case column.key === "name":
              column.filters = uniqNames.map((name) => {
                return { text: name, value: name };
              });
              break;
          }
          return { ...column };
        });
        setAssetsColumns(updatedColumns);
        _setAssetsTableRows(assetsRows);
        setSearchDataSource(assetsRows);

        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    } else {
      setLoading(false);
    }
  }, [
    formAssetRow,
    _setAssetsTableRows,
    createAssetsColumns,
    setLoading,
    assets,
    setAssetsColumns,
    filterAsset,
    setSearchDataSource,
    fullAccount,
  ]);

  const setFullAccount = useCallback(async () => {
    const fullAccount = await getFullAccount(localStorageAccount, false);
    _setFullAccount(fullAccount);
  }, [getFullAccount, localStorageAccount, _setFullAccount]);

  useEffect(() => {
    setFullAccount();
  }, [setFullAccount]);

  useEffect(() => {
    setAssetsTableRows();
  }, [setAssetsTableRows]);

  return {
    loading,
    assetsColumns,
    assetsTableRows,
    searchDataSource,
    setSearchDataSource,
  };
}
