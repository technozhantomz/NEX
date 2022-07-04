import counterpart from "counterpart";
import Link from "next/link";

import { TableHeading } from "../../../../common/components";
import { InfoCircleOutlined, Tag, Tooltip } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const AssetsColumns = [
  {
    title: (): JSX.Element => <TableHeading heading={"id"} />,
    dataIndex: "id",
    key: "id",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"symbol"} />,
    dataIndex: "symbol",
    key: "symbol",
    render: (symbol: string): JSX.Element => (
      <Tag key={symbol} bgColor={colors.assetTag}>
        {symbol}
      </Tag>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"max_supply"} />,
    dataIndex: "maxSupply",
    key: "maxSupply",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"precision"} />,
    dataIndex: "precision",
    key: "precision",
  },
  {
    title: (): JSX.Element => <TableHeading heading={"issuer"} />,
    dataIndex: "issuer",
    key: "issuer",
    render: (issuer: string): JSX.Element => (
      <Link href={`/user/${issuer}`}>{issuer}</Link>
    ),
  },
  {
    title: (): JSX.Element => <TableHeading heading={"info"} />,
    dataIndex: "info",
    key: "info",
    render: (info: string): JSX.Element => {
      if (!info || info === "") {
        return (
          <span>{counterpart.translate(`field.labels.not_available`)}</span>
        );
      } else {
        return (
          <Tooltip placement="top" title={info}>
            <InfoCircleOutlined />
          </Tooltip>
        );
      }
    },
  },
];
