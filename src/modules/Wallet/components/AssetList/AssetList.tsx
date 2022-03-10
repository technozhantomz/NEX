import { List } from "antd";

import { defaultToken } from "../../../../api/params/networkparams";
import { AssetActionButton } from "../AssetActionButton";
import { AssetColumns as columns } from "../AssetColums";
import { AssetTitle } from "../AssetTitle";
import { useAssetsTable } from "../AssetsTable/hooks";

import * as Styled from "./AssetList.styled";

type Props = {
  fillterAsset?: string;
  showActions?: boolean;
};

export const AssetList = ({
  fillterAsset = "",
  showActions = false,
}: Props): JSX.Element => {
  const { tableAssets, loading } = useAssetsTable();
  return (
    <List
      itemLayout="vertical"
      dataSource={
        fillterAsset === ""
          ? tableAssets
          : tableAssets.filter((item) => item.asset === fillterAsset)
      }
      loading={loading}
      renderItem={(item) => (
        <Styled.AssetListItem
          key={item.key}
          actions={
            showActions
              ? [
                  <AssetActionButton
                    txt="Transfer"
                    href={`/wallet/${item.asset}?tab=transfer`}
                  />,
                  <>
                    {item.asset === defaultToken ? (
                      ""
                    ) : (
                      <AssetActionButton
                        txt="Withdraw"
                        href={`/wallet/${item.asset}?tab=withdraw`}
                      />
                    )}
                  </>,
                  <>
                    {item.asset === defaultToken ? (
                      ""
                    ) : (
                      <AssetActionButton
                        txt="Deposit"
                        href={`/wallet/${item.asset}?tab=deposit`}
                      />
                    )}
                  </>,
                ]
              : []
          }
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
  );
};
