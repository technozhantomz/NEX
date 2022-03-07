import { useViewportContext } from "../../../../common/components/ViewportProvider";
import { List } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { AssetActionButton } from "../AssetActionButton";
import { AssetTitle } from "../AssetTitle";

import * as Styled from "./AssetsTab.styled";
import { useAssetsTab } from "./hooks";

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
    title: "Volume",
    dataIndex: "volume",
    key: "volume",
  },
  {
    title: "",
    dataIndex: "transfer",
    key: "transfer",
    render: () => <AssetActionButton txt="Transfer" href="/" />,
  },
  {
    title: "",
    dataIndex: "withdraw",
    key: "withdraw",
    render: () => <AssetActionButton txt="Withdraw" href="/" />,
  },
  {
    title: "",
    dataIndex: "deposit",
    key: "deposit",
    render: () => <AssetActionButton txt="Deposit" href="/" />,
  },
];

export const AssetsTab = (): JSX.Element => {
  const { tableAssets, loading } = useAssetsTab();
  const { width } = useViewportContext();

  return (
    <>
      {width > breakpoints.xs ? (
        <Styled.AssetsTable
          loading={loading}
          columns={columns}
          dataSource={tableAssets}
          pagination={false}
          size="small"
        />
      ) : (
        <List
          loading={loading}
          itemLayout="vertical"
          dataSource={tableAssets}
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
                  <span className="asset-info-value">{item.volume}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      )}
    </>
  );
};
