import { useAsset } from "../../../../../common/hooks";
import { useUser } from "../../../../../context";

import { IUseAssets } from "./useAsstes.type";

export function useAssets(): IUseAssets {
  const { accountData } = useUser();
  const { setPrecision } = useAsset();
  const columns = [
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Price (BTC)",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Change (24 hrs)",
      dataIndex: "change",
      key: "change",
    },
    {
      title: "Value (BTC)",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "",
      dataIndex: "transfer",
      key: "transfer",
    },
    {
      title: "",
      dataIndex: "withdraw",
      key: "withdraw",
    },
    {
      title: "",
      dataIndex: "deposit",
      key: "deposit",
    },
  ];

  const assetData = accountData.assets.map((asset) => {
    return {
      key: asset.id,
      asset: asset.symbol,
      available: setPrecision(true, asset.amount, asset.precision),
      price: 0,
      change: 0,
      value: "Infinity",
      transfer: "",
      withdraw: "",
      deposit: "",
    };
  });

  return {
    columns,
    assetData,
  };
}
