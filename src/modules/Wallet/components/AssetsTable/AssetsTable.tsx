import counterpart from "counterpart";

import { useAsset } from "../../../../common/hooks";
import { useViewportContext } from "../../../../common/providers";
import { List } from "../../../../ui/src";
import { AssetActionButton } from "../AssetActionButton";
import { AssetTitle } from "../AssetTitle";

import * as Styled from "./AssetsTable.styled";
import { useAssetsTable } from "./hooks";

type Props = {
  showActions?: boolean;
  fillterAsset?: string;
};

export const AssetsTable = ({
  showActions = true,
  fillterAsset = "",
}: Props): JSX.Element => {
  const { tableAssets, loading } = useAssetsTable();
  const { sm } = useViewportContext();
  const { sidechainAssets } = useAsset();
  const columns = [
    {
      title: counterpart.translate(`tableHead.asset`),
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: counterpart.translate(`tableHead.available`),
      dataIndex: "available",
      key: "available",
    },
    {
      title: counterpart.translate(`tableHead.quote_asset`),
      dataIndex: "quoteAsset",
      key: "quoteAsset",
    },
    {
      title: counterpart.translate(`tableHead.price`),
      dataIndex: "price",
      key: "price",
    },
    {
      title: counterpart.translate(`tableHead.change`),
      dataIndex: "change",
      key: "change",
    },
    {
      title: counterpart.translate(`tableHead.volume`),
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "",
      dataIndex: "transfer",
      key: "transfer",
      render: (_value: any, record: any) => (
        <AssetActionButton
          txt={counterpart.translate(`transaction.trxTypes.transfer`)}
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
              txt={counterpart.translate(`buttons,withdraw`)}
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
  return (
    <>
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
              actions={
                showActions
                  ? sidechainAssets
                      .map((asset) => asset.symbol)
                      .includes(item.asset)
                    ? [
                        <AssetActionButton
                          txt={counterpart.translate(
                            `transaction.trxTypes.transfer`
                          )}
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
                      ]
                    : [
                        <AssetActionButton
                          txt={counterpart.translate(
                            `transaction.trxTypes.transfer`
                          )}
                          href={`/wallet/${item.asset}?tab=transfer`}
                        />,
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
                  <span className="asset-info-value">{item.quoteAsset}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[3].title}</span>
                  <span className="asset-info-value">{item.price}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[4].title}</span>
                  <span className="asset-info-value">{item.change}</span>
                </div>
                <div className="asset-info">
                  <span className="asset-info-title">{columns[5].title}</span>
                  <span className="asset-info-value">{item.volume}</span>
                </div>
              </Styled.AssetsItemContent>
            </Styled.AssetListItem>
          )}
        />
      ) : (
        <Styled.AssetsTable
          columns={
            showActions ? columns : columns.filter((item) => item.title !== "")
          }
          dataSource={
            fillterAsset === ""
              ? tableAssets
              : tableAssets.filter((item) => item.asset === fillterAsset)
          }
          loading={loading}
          pagination={false}
          size="small"
        />
      )}
    </>
  );
};
