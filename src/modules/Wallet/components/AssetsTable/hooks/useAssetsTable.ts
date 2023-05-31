import { sum, uniq } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [searchDataSource, setSearchDataSource] = useState<AssetTableRow[]>([]);
  const [fullAccount, _setFullAccount] = useState<FullAccount | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const { assets, localStorageAccount } = useUserContext();
  const { getFullAccount } = useAccount();
  const { setPrecision, limitByPrecision } = useAsset();

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
        name: utils.getNativeBlockchainFromAssetSymbol(asset.symbol),
        available: available,
        inOrders: limitByPrecision(inOrders, asset.precision),
      };
    },
    [fullAccount, setPrecision]
  );

  const assetsTableRows = useMemo(() => {
    if (fullAccount && assets && assets.length) {
      const assetsRows = assets
        .filter((asset) => asset.symbol !== filterAsset)
        .map(formAssetRow);
      setSearchDataSource(assetsRows);
      return assetsRows;
    } else {
      return [];
    }
  }, [fullAccount, assets, assets.length, filterAsset, formAssetRow]);

  const assetsColumns = useMemo(() => {
    const symbols = assetsTableRows.map((assetRow) => assetRow.symbol);
    const allNames = assetsTableRows.map((assetRow) => assetRow.name);
    const uniqNames = uniq(allNames);
    const updatedColumns: AssetColumnType[] = createAssetsColumns(
      actionType
    ).map((column) => {
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
    return updatedColumns;
  }, [assetsTableRows, createAssetsColumns, actionType]);

  useEffect(() => {
    let ignore = false;
    async function setFullAccount() {
      setLoading(true);
      const fullAccount = await getFullAccount(localStorageAccount, false);
      if (!ignore) {
        _setFullAccount(fullAccount);
        setLoading(false);
      }
    }
    setFullAccount();
    return () => {
      ignore = true;
    };
  }, [setLoading, getFullAccount, localStorageAccount, _setFullAccount]);

  return {
    loading,
    assetsColumns,
    assetsTableRows,
    searchDataSource,
    setSearchDataSource,
  };
}
