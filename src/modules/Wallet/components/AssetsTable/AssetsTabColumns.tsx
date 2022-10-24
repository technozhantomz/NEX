import counterpart from "counterpart";

import { TableHeading } from "../../../../common/components";
// import { useAssetsContext } from "../../../../common/providers";
import { AssetActionButton } from "../AssetActionButton";

import { IAssetRow } from "./hooks";

export const AssetsTabColumns = (): {
  title: () => JSX.Element;
  dataIndex: string;
  key: string;
  render:
    | ((active: boolean) => JSX.Element)
    | ((_value: string, _record: any) => JSX.Element)
    | undefined;
  filters:
    | { text: string; value: boolean }[]
    | { text: string; value: string }[]
    | undefined;
  filterMode: string | undefined;
  filterSearch: boolean | undefined;
  onFilter:
    | ((value: boolean, record: IAssetRow) => boolean)
    | ((value: string, record: IAssetRow) => boolean)
    | undefined;
  sorter:
    | ((a: { rank: number }, b: { rank: number }) => number)
    | ((a: { votes: string }, b: { votes: string }) => number)
    | undefined;
}[] => {
  // const { sidechainAssets } = useAssetsContext();

  const headings = [
    "symbol",
    "name",
    "available",
    "change",
    "volume",
    "actions",
  ];
  const keys = ["symbol", "name", "available", "change", "volume", "actions"];
  const renders = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    (_value: any, record: any) => {
      // const hasWithdraw = sidechainAssets
      //   .map((asset) => asset.symbol)
      //   .includes(record.asset);

      return (
        <div>
          <AssetActionButton
            txt={counterpart.translate(`transaction.trxTypes.transfer.title`)}
            href={`/wallet/${record.symbol}?tab=transfer`}
          />
          <AssetActionButton
            txt={counterpart.translate(`buttons.withdraw`)}
            href={`/wallet/${record.symbol}?tab=withdraw`}
          />
        </div>
      );
    },
  ];
  const filters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const filterModes = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const filterSearch = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const onFilters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  const sorters = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];

  return headings.map((heading, index) => {
    return {
      title: (): JSX.Element => <TableHeading heading={heading} />,
      dataIndex: keys[index],
      key: keys[index],
      render: renders[index],
      filters: filters[index],
      filterMode: filterModes[index],
      filterSearch: filterSearch[index],
      onFilter: onFilters[index],
      sorter: sorters[index],
    };
  });
};
