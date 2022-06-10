import counterpart from "counterpart";
import Link from "next/link";

import { InfoCircleOutlined, Tag, Tooltip } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetsColumns = [
  {
    title: counterpart.translate(`tableHead.id`),
    dataIndex: "id",
    key: "id",
  },
  {
    title: counterpart.translate(`tableHead.symbol`),
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol: string): JSX.Element => (
      <Tag key={symbol} bgColor={colors.assetTag}>
        {symbol}
      </Tag>
    ),
  },
  {
    title: counterpart.translate(`tableHead.max_supply`),
    dataIndex: "maxSupply",
    key: "maxSupply",
  },
  {
    title: counterpart.translate(`tableHead.precision`),
    dataIndex: "precision",
    key: "precision",
  },
  {
    title: counterpart.translate(`tableHead.issuer`),
    dataIndex: "issuer",
    key: "issuer",
    render: (issuer: string): JSX.Element => (
      <Link href={`/user/${issuer}`}>{issuer}</Link>
    ),
  },
  {
    title: counterpart.translate(`tableHead.info`),
    dataIndex: "info",
    key: "info",
    render: (info: string): JSX.Element => (
      <Tooltip placement="top" title={info}>
        <InfoCircleOutlined />
      </Tooltip>
    ),
  },
];
