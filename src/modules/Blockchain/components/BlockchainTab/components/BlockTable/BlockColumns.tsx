export const BlockColumns = [
  {
    title: "Block ID",
    dataIndex: "blockID",
    key: "blockID",
    onFilter: (value: unknown, record: unknown) =>
      record.blockID.startsWith(value),
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Witness",
    dataIndex: "witness",
    key: "witness",
  },
  {
    title: "Transaction",
    dataIndex: "transaction",
    key: "transaction",
  },
];
