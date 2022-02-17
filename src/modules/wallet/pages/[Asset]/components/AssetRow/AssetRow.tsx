import { List } from "antd";

import { useViewport } from "../../../../../../context";
import { breakpoints } from "../../../../../../ui/src/breakpoints";
import AssetTitle from "../../../../componets/AssetTitle";
import { columns } from "../../../../componets/AssetsTab";
import { useAssetsTab } from "../../../../componets/AssetsTab/hooks";

import * as Styled from "./AssetRow.styled";

type Props = {
  asset: string;
};

const AssetRow = ({ asset }: Props): JSX.Element => {
  const { assets } = useAssetsTab();
  const { width } = useViewport();

  return (
    <>
      {width > breakpoints.xs ? (
        <Styled.AssetTable
          columns={columns.filter((item) => item.title !== "")}
          dataSource={assets.dataSource?.filter((item) => item.asset === asset)}
          loading={assets.loading}
          pagination={false}
          size="small"
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={assets.dataSource?.filter((item) => item.asset === asset)}
          loading={assets.loading}
          renderItem={(item) => (
            <Styled.AssetListItem key={item.key}>
              <AssetTitle symbol={item.asset} />
              <Styled.AssetItemContent>
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
              </Styled.AssetItemContent>
            </Styled.AssetListItem>
          )}
        />
      )}
    </>
  );
};

export default AssetRow;
