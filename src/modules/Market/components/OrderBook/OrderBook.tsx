import { Asset } from "../../../../common/types";
import { DownOutlined, Tooltip } from "../../../../ui/src";

import * as Styled from "./OrderBook.styled";
import { OrderType } from "./hooks/uesOrderBook.types";
import { useOrderBook } from "./hooks/useOrderBook";

type Props = {
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  forUser?: boolean;
};

export const OrderBook = ({
  forUser = false,
  currentBase,
  currentQuote,
  loadingSelectedPair,
}: Props): JSX.Element => {
  const {
    orderType,
    threshold,
    ordersRows,
    userOrdersRows,
    handleThresholdChange,
    handleFilterChange,
    loadingOrderRows,
    loadingUserOrderRows,
    orderColumns,
    userOrderColumns,
  } = useOrderBook({ currentBase, currentQuote, loadingSelectedPair });
  const dataSource = forUser ? userOrdersRows : ordersRows;

  const types: OrderType[] = ["total", "sell", "buy"];

  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      <Styled.ThresholdMenu.Item key="0.001">0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.005">0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key="0.01">0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  return (
    <>
      {forUser ? (
        ""
      ) : (
        <Styled.FilterContainer>
          <Styled.Flex>
            {types.map((type) => (
              <Tooltip
                placement="top"
                title={type.toUpperCase() + " ORDERS"}
                key={`${type}_tooltip`}
              >
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
              </Tooltip>
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
      )}
      <Styled.TableContainer forUser={forUser}>
        <Styled.Table
          loading={forUser ? loadingUserOrderRows : loadingOrderRows}
          pagination={false}
          columns={forUser ? userOrderColumns : orderColumns}
          dataSource={dataSource}
          rowClassName={(record: any) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
