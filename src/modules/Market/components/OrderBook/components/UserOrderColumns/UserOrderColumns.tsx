import counterpart from "counterpart";

import { DeleteOutlined } from "../../../../../../ui/src";
import { OrderColumn } from "../../../../types";

import * as Styled from "./UserOrderColumns.styled";

export const showUserOrderColumns = (
  quoteSymbol: string,
  baseSymbol: string,
  handleClick: (orderId: string) => void
): OrderColumn[] => {
  const columns = [
    {
      title: counterpart.translate(`tableHead.price`),
      dataIndex: "price",
      key: "price",
    },
    {
      title: quoteSymbol,
      dataIndex: "quote",
      key: "quote",
    },
    {
      title: baseSymbol,
      dataIndex: "base",
      key: "base",
    },
    {
      title: counterpart.translate(`tableHead.expiration`),
      dataIndex: "expiration",
      key: "expiration",
    },
    {
      title: counterpart.translate(`tableHead.action`),
      dataIndex: "cancel",
      key: "cancel",
      render: (_value: string, record: any) => (
        <Styled.DeleteIconContainer
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleClick(record.key);
          }}
        >
          <DeleteOutlined />
        </Styled.DeleteIconContainer>
      ),
    },
  ];
  return columns;
};
