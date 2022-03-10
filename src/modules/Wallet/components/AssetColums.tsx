import { defaultToken } from "../../../api/params/networkparams";

import { AssetActionButton } from "./AssetActionButton";
import { IAssetRow } from "./AssetsTable/hooks/useAssetsTable.types";

export const AssetColumns = [
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
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
  },
  {
    dataIndex: "transfer",
    key: "transfer",
    render: (_value: unknown, record: IAssetRow): JSX.Element => (
      <AssetActionButton
        txt="Transfer"
        href={`/wallet/${record.asset}?tab=transfer`}
      />
    ),
  },
  {
    dataIndex: "withdraw",
    key: "withdraw",
    render: (_value: unknown, record: IAssetRow): JSX.Element => (
      <>
        {record.asset === defaultToken ? (
          ""
        ) : (
          <AssetActionButton
            txt="Withdraw"
            href={`/wallet/${record.asset}?tab=withdraw`}
          />
        )}
      </>
    ),
  },
  {
    dataIndex: "deposit",
    key: "deposit",
    render: (_value: unknown, record: IAssetRow): JSX.Element => (
      <>
        {record.asset === defaultToken ? (
          ""
        ) : (
          <AssetActionButton
            txt="Deposit"
            href={`/wallet/${record.asset}?tab=deposit`}
          />
        )}
      </>
    ),
  },
];
