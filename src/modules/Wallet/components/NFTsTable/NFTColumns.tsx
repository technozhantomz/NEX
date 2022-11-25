import { Image } from "antd";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";
import { Avatar } from "../../../../ui/src";

import * as Styled from "./NFTsTable.styled";
import { NFTColumnsType, NFTRow } from "./hooks";

const headings = [
  "img",
  "name",
  "maker",
  "collection",
  // "last_price",
  "best_offer",
  "quantity",
  "on_sale",
];
const keys = [
  "img",
  "name",
  "maker",
  "collection",
  // "lastPrice",
  "bestOffer",
  "quantity",
  "onSale",
];
const renders = [
  (img: string): JSX.Element => (
    <Avatar src={<Image src={img} width="30" />}></Avatar>
  ),
  undefined,
  (maker: string): JSX.Element => (
    <Link href={`/user/${maker}`}>
      <a target="_blank">{maker}</a>
    </Link>
  ),
  undefined,
  undefined,
  // undefined,
  undefined,
  (onSale: boolean): JSX.Element => (
    <>{onSale === true ? <Styled.ActiveIcon /> : ``}</>
  ),
];
const filters = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  // undefined,
  undefined,
  undefined,
];
const filterModes = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  // undefined,
  undefined,
  undefined,
];
const filterSearch = [
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  // undefined,
  undefined,
  false,
];
const onFilters = [
  undefined,
  undefined,
  (value: string, record: NFTRow): boolean => record.maker.includes(value),
  (value: string, record: NFTRow): boolean => record.collection.includes(value),
  // undefined,
  undefined,
  (value: boolean, record: NFTRow): boolean => record.onSale === value,
];
const sorters = [
  undefined,
  undefined,
  undefined,
  undefined,
  // (a: { lastPrice: string }, b: { lastPrice: string }) => parseFloat(a.lastPrice) - parseFloat(b.lastPrice),
  (a: { bestOffer: string }, b: { bestOffer: string }) =>
    parseFloat(a.bestOffer) - parseFloat(b.bestOffer),
  (a: { quantity: number }, b: { quantity: number }) => a.quantity - b.quantity,
  undefined,
];

export const NFTColumns = headings.map((heading, index) => {
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
  } as NFTColumnsType;
});
