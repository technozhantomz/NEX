import { Button, List } from "antd";

import { useViewport } from "../../../../context";
import { breakpoints } from "../../../../ui/src/breakpoints";
import AssetTitle from "../AssetTitle";

import * as Styled from "./AssetsTab.styled";
import { useAssets } from "./hooks";

const AssetsTab = (): JSX.Element => {
  const { columns, assetData } = useAssets();
  const { width } = useViewport();

  return (
    <>
      {width > breakpoints.xs ? (
        <Styled.AssetsTable columns={columns} dataSource={assetData} />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={assetData}
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={[
                <Styled.AssetActionButton type="text">
                  Transfer
                </Styled.AssetActionButton>,
                <Styled.AssetActionButton type="text">
                  Withdraw
                </Styled.AssetActionButton>,
                <Styled.AssetActionButton type="text">
                  Deposit
                </Styled.AssetActionButton>,
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
