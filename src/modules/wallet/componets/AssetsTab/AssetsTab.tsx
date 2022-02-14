import { List } from "antd";
import { ColumnsType } from "antd/es/table";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAsset } from "../../../../common/hooks";
import { useUser, useViewport } from "../../../../context";
import { breakpoints } from "../../../../ui/src/breakpoints";
import AssetActionButton from "../AssetActionButton";
import AssetTitle from "../AssetTitle";

import * as Styled from "./AssetsTab.styled";

interface IAssetData {
  key: string;
  asset: string;
  available: number;
  price: number;
  change: number;
  value: string;
}

const columns: ColumnsType<IAssetData> = [
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
    render: record => <AssetActionButton txt="Transfer" href="/" />,
  },
  {
    title: "",
    dataIndex: "withdraw",
    key: "withdraw",
    render: record => <AssetActionButton txt="Withdraw" href="/" />,
  },
  {
    title: "",
    dataIndex: "deposit",
    key: "deposit",
    render: record => <AssetActionButton txt="Deposit" href="/" />,
  },
];

const AssetsTab = (): JSX.Element => {
  const { setPrecision } = useAsset();
  const { accountData } = useUser();
  const { width } = useViewport();
  const router = useRouter();

  const assetData = accountData?.assets.map((asset) => {
    return {
      key: asset.id,
      asset: asset.symbol,
      available: setPrecision(true, asset.amount, asset.precision),
      price: 0,
      change: 0,
      value: "Infinity",
    };
  });

  useEffect(() => {
    if (accountData === undefined) router.push("/login");
  }, []);

  return (
    <>
      {width > breakpoints.xs ? (
        <Styled.AssetsTable
          columns={columns}
          dataSource={assetData}
          pagination={false}
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={assetData}
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={[
                <AssetActionButton txt="Transfer" href="/" />,
                <AssetActionButton txt="Withdraw" href="/" />,
                <AssetActionButton txt="Deposit" href="/" />,
              ]}
            >
              <AssetTitle symbol={item.asset} />
              <Styled.AssetsItemContent>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[1].title}</span>
                  <span className="asset-info-value">{item.available}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[2].title}</span>
                  <span className="asset-info-value">{item.price}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[3].title}</span>
                  <span className="asset-info-value">{item.change}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[4].title}</span>
                  <span className="asset-info-value">{item.value}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      )}
    </>
  );
};

export default AssetsTab;
