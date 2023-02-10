import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";

import { OrderTableRow } from "../../../../../../common/types";
import { DeleteOutlined } from "../../../../../../ui/src";

export const createOrdersColumns = (
  onCancelClick: (orderId: string) => void,
  lg: boolean
): ColumnsType<OrderTableRow> => {
  const columns: ColumnsType<OrderTableRow> = [
    {
      title: counterpart.translate("tableHead.price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: counterpart.translate("tableHead.amount"),
      dataIndex: "amount",
      key: "amount",
    },
  ];
  if (!lg) {
    columns.push({
      title: counterpart.translate("tableHead.total"),
      dataIndex: "total",
      key: "total",
    });
  }
  columns.push({
    title: counterpart.translate("tableHead.status_actions"),
    dataIndex: "statusActions",
    key: "statusActions",
    render: (_value, record) => {
      return (
        <>
          {!record.isOpenOrderRow ? (
            record.statusActions
          ) : (
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onCancelClick(record.key);
              }}
            >
              <DeleteOutlined />
            </div>
          )}
        </>
      );
    },
  });
  return columns;
};
