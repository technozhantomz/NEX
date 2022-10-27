import counterpart from "counterpart";
import { CSSProperties, ReactNode } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { TableHeading } from "../../../../common/components";
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

  const columns = [
    {
      title: (): JSX.Element => <TableHeading heading={"asset"} />,
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"available"} />,
      dataIndex: "available",
      key: "available",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"quote_asset"} />,
      dataIndex: "quoteAsset",
      key: "quoteAsset",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"price"} />,
      dataIndex: "price",
      key: "price",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"change"} />,
      dataIndex: "change",
      key: "change",
    },
    {
      title: (): JSX.Element => <TableHeading heading={"volume"} />,
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "",
      dataIndex: "transfer",
      key: "transfer",
      render: (_value: any, record: any) => (
        <AssetActionButton
          txt={counterpart.translate(`transaction.trxTypes.transfer.title`)}
          href={`/wallet/${record.asset}?tab=transfer`}
        />
      ),
    },
    {
      title: "",
      dataIndex: "withdraw",
      key: "withdraw",
      render: (_value: any, record: any) => {
        const hasWithdraw = sidechainAssets
          .map((asset) => asset.symbol)
          .includes(record.asset);
        if (hasWithdraw) {
          return (
            <AssetActionButton
              txt={counterpart.translate(`buttons.withdraw`)}
              href={`/wallet/${record.asset}?tab=withdraw`}
            />
          );
        } else {
          return "";
        }
      },
    },
    {
      title: "",
      dataIndex: "deposit",
      key: "deposit",
      render: (_value: any, record: any) => {
        const hasDeposit = sidechainAssets
          .map((asset) => asset.symbol)
          .includes(record.asset);
        if (hasDeposit) {
          return (
            <AssetActionButton
              txt={counterpart.translate(`buttons.deposit`)}
              href={`/wallet/${record.asset}?tab=deposit`}
            />
          );
        }
      },
    },
  ];

  const renderAssetsActions = (item: IAssetRow) => {
    if (sidechainAssets.map((asset) => asset.symbol).includes(item.asset)) {
      return [
        <AssetActionButton
          txt={counterpart.translate(`transaction.trxTypes.transfer.title`)}
          href={`/wallet/${item.asset}?tab=transfer`}
        />,
        <AssetActionButton
          txt={counterpart.translate(`buttons.withdraw`)}
          href={`/wallet/${item.asset}?tab=withdraw`}
        />,
        <AssetActionButton
          txt={counterpart.translate(`buttons.deposit`)}
          href={`/wallet/${item.asset}?tab=deposit`}
        />,
      ];
    } else {
      return [
        <AssetActionButton
          txt={counterpart.translate(`transaction.trxTypes.transfer.title`)}
          href={`/wallet/${item.asset}?tab=transfer`}
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
            content={() => <p></p>}
          />
          {` / `}
          <CSVLink
            filename={"FeesTable.csv"}
            data={""}
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
              : tableAssets.filter((item) => item.asset === fillterAsset)
          }
          loading={loading}
          renderItem={(item) => (
            <Styled.AssetListItem
              key={item.key}
              actions={showActions ? renderAssetsActions(item) : []}
            >
              <AssetTitle symbol={item.asset} />
              <Styled.AssetsItemContent>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof columns[1].title === "string"
                      ? columns[1].title
                      : columns[1].title()}
                  </span>
                  <span className="asset-info-value">{item.available}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof columns[2].title === "string"
                      ? columns[2].title
                      : columns[2].title()}
                  </span>
                  <span className="asset-info-value">{item.quoteAsset}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof columns[3].title === "string"
                      ? columns[3].title
                      : columns[3].title()}
                  </span>
                  <span className="asset-info-value">{item.price}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof columns[4].title === "string"
                      ? columns[4].title
                      : columns[4].title()}
                  </span>
                  <span className="asset-info-value">{item.change}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">
                    {typeof columns[5].title === "string"
                      ? columns[5].title
                      : columns[5].title()}
                  </span>
                  <span className="asset-info-value">{item.volume}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          columns={assetsTabColumns}
          dataSource={tableAssets}
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
    </>
  );
};
