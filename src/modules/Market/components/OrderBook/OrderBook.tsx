import { DownOutlined } from "../../../../ui/src";

import * as Styled from "./OrderBook.styled";
import { OrderType } from "./hooks/uesOrderBook.types";
import { useOrderBook } from "./hooks/useOrderBook";

export const OrderBook = (): JSX.Element => {
  const {
    bids,
    asks,
    orderType,
    threshold,
    ordersRows,
    handleThresholdChange,
    handleFilterChange,
    columns,
  } = useOrderBook();
  const types: OrderType[] = ["total", "sell", "buy"];

  console.log("this is bids", bids);
  console.log("this is asks", asks);
  console.log("this is selected", ordersRows);

  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      <Styled.ThresholdMenu.Item key="0.001">0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.005">0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.01">0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  return (
    <>
      <Styled.FilterContainer>
        <Styled.Flex>
          {types.map((type) => (
            <Styled.OrdersFilter
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`order-filters__type--${type}${
                type === orderType ? " active" : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </Styled.OrdersFilter>
          ))}
        </Styled.Flex>
        <Styled.Flex>
          <Styled.ThresholdDropdown overlay={thresholdMenu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Styled.ThresholdLabel>Threshold</Styled.ThresholdLabel>
              <Styled.ThresholdValue>{threshold}</Styled.ThresholdValue>
              <DownOutlined />
            </a>
          </Styled.ThresholdDropdown>
        </Styled.Flex>
      </Styled.FilterContainer>
      <Styled.TableContainer>
        <Styled.Table
          scroll={{ scrollToFirstRowOnChange: false, y: 600 }}
          pagination={false}
          columns={columns}
          dataSource={ordersRows}
          rowClassName={(record) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
