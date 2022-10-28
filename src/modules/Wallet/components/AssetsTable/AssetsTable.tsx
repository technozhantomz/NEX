import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { CSSProperties, ReactInstance, ReactNode, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import {
  useAssetsContext,
  useViewportContext,
} from "../../../../common/providers";
import { DownloadOutlined, List } from "../../../../ui/src";
import { AssetActionButton } from "../AssetActionButton";
import { AssetTitle } from "../AssetTitle";

import * as Styled from "./AssetsTable.styled";
import { IAssetRow, useAssetsTable } from "./hooks";

type Props = {
  showActions?: boolean;
  fillterAsset?: string;
};

export const AssetsTable = ({
  showActions = true,
  fillterAsset = "",
}: Props): JSX.Element => {
  const { tableAssets, loading, assetsTabColumns } = useAssetsTable();
  const { sm } = useViewportContext();
  const { sidechainAssets } = useAssetsContext();
  const componentRef = useRef<HTMLDivElement>(null);

  const renderAssetsActions = (item: IAssetRow) => {
    if (sidechainAssets.map((asset) => asset.symbol).includes(item.symbol)) {
      return [
        <AssetActionButton
          txt={counterpart.translate(`buttons.send`)}
          href={`/wallet/${item.symbol}?tab=transfer`}
        />,
        <AssetActionButton
          txt={counterpart.translate(`buttons.receive`)}
          href={`/wallet/${item.symbol}?tab=withdraw`}
        />,
        <AssetActionButton
          txt={counterpart.translate(`buttons.deposit`)}
          href={`/wallet/${item.symbol}?tab=deposit`}
        />,
      ];
    } else {
      return [
        <AssetActionButton
          txt={counterpart.translate(`buttons.send`)}
          href={`/wallet/${item.symbol}?tab=transfer`}
        />,
      ];
    }
  };

  return (
    <>
      <Styled.AssetTabHeader>
        <Styled.AssetHeader>
          {counterpart.translate(`field.labels.coins_token`)}
        </Styled.AssetHeader>

        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />
          {` / `}
          <CSVLink
            filename={"AssetsTable.csv"}
            data={tableAssets}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.AssetTabHeader>
      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={
            fillterAsset === ""
              ? tableAssets
              : tableAssets.filter((item) => item.symbol === fillterAsset)
          }
          loading={loading}
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={showActions ? renderAssetsActions(item) : []}
            >
              <AssetTitle symbol={item.symbol} />
              <Styled.AssetsItemContent>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof assetsTabColumns[2].title === "string"
                      ? assetsTabColumns[2].title
                      : assetsTabColumns[2].title()}
                  </span>
                  <span className="asset-info-value">{item.available}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof assetsTabColumns[3].title === "string"
                      ? assetsTabColumns[3].title
                      : assetsTabColumns[3].title()}
                  </span>
                  <span className="asset-info-value">{item.inOrders}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          columns={
            showActions
              ? (assetsTabColumns as ColumnsType<IAssetRow>)
              : (assetsTabColumns.filter(
                  (item) => item.dataIndex !== "actions"
                ) as ColumnsType<IAssetRow>)
          }
          dataSource={
            fillterAsset === ""
              ? tableAssets
              : tableAssets.filter((item) => item.symbol === fillterAsset)
          }
          loading={loading}
          pagination={{
            position: ["bottomRight"],
            size: "small",
            pageSize: 5,
            itemRender: (
              _page: number,
              type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
              element: ReactNode
            ) => {
              if (type === "prev") {
                return (
                  <a style={{ marginRight: "8px" } as CSSProperties}>
                    {counterpart.translate(`buttons.previous`)}
                  </a>
                );
              }
              if (type === "next") {
                return (
                  <a style={{ marginLeft: "8px" } as CSSProperties}>
                    {counterpart.translate(`buttons.next`)}
                  </a>
                );
              }
              return element;
            },
          }}
          size="small"
        />
      )}

      <Styled.PrintTable>
        <div ref={componentRef}>
          <Styled.AssetsTable
            dataSource={
              fillterAsset === ""
                ? tableAssets
                : tableAssets.filter((item) => item.symbol === fillterAsset)
            }
            columns={
              showActions
                ? (assetsTabColumns as ColumnsType<IAssetRow>)
                : (assetsTabColumns.filter(
                    (item) => item.dataIndex !== "actions"
                  ) as ColumnsType<IAssetRow>)
            }
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </>
  );
};
