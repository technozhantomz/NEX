import { List } from "antd";
import { ColumnsType } from "antd/es/table";

import { useViewport } from "../../../../context";
import { breakpoints } from "../../../../ui/src/breakpoints";
import AssetActionButton from "../AssetActionButton";
import AssetTitle from "../AssetTitle";

import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";
import { IAssetData } from "./hooks/useAssetsTab.type";

export const columns: ColumnsType<IAssetData> = [
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
    render: (value, record) => (
      <AssetActionButton
        txt="Transfer"
        href={`/wallet/${record.asset}?tab=transfer`}
      />
    ),
  },
  {
    title: "",
    dataIndex: "withdraw",
    key: "withdraw",
    render: (value, record) => (
      <AssetActionButton
        txt="Withdraw"
        href={`/wallet/${record.asset}?tab=withdraw`}
      />
    ),
  },
  {
    title: "",
    dataIndex: "deposit",
    key: "deposit",
    render: (value, record) => (
      <AssetActionButton
        txt="Deposit"
        href={`/wallet/${record.asset}?tab=deposit`}
      />
    ),
  },
];

const AssetsTab = (): JSX.Element => {
  const { assets } = useAssetsTab();
  const { width } = useViewport();

  return (
    <>
      {width > breakpoints.xs ? (
        <Styled.AssetsTable
          columns={columns}
          {...assets}
          pagination={false}
          size="small"
        />
      ) : (
        <List
          itemLayout="vertical"
          {...assets}
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={[
                <AssetActionButton
                  txt="Transfer"
                  href={`/wallet/${item.asset}?tab=transfer`}
                />,
                <AssetActionButton
                  txt="Withdraw"
                  href={`/wallet/${item.asset}?tab=withdraw`}
                />,
                <AssetActionButton
                  txt="Deposit"
                  href={`/wallet/${item.asset}?tab=deposit`}
                />,
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
