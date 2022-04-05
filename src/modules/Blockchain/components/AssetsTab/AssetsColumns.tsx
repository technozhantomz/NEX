import Link from "next/link";

import { InfoCircleOutlined, Tag, Tooltip } from "../../../../ui/src";

export const AssetsColumns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol: string): JSX.Element => <Tag key={symbol}>{symbol}</Tag>,
  },
  {
    title: "Max Supply",
    dataIndex: "maxSupply",
    key: "maxSupply",
  },
  {
    title: "Percision",
    dataIndex: "percision",
    key: "percision",
  },
  {
    title: "Issuer",
    dataIndex: "issuer",
    key: "issuer",
    render: (issuer: string): JSX.Element => (
      <Link href={`/user/${issuer}`}>{issuer}</Link>
    ),
  },
  {
    title: "Info",
    dataIndex: "info",
    key: "info",
    render: (info: string): JSX.Element => (
      <Tooltip placement="top" title={info}>
        <InfoCircleOutlined />
      </Tooltip>
    ),
  },
];
