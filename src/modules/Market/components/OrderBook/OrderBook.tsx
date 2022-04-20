import { useViewportContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { DownOutlined } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";

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
  const { width } = useViewportContext();
  const {
    orderType,
    threshold,
    ordersRows,
    userOrdersRows,
    handleThresholdChange,
    handleFilterChange,
    loadingOrderRows,
    columns,
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
      )}
      <Styled.TableContainer>
        <Styled.Table
          scroll={
            width > breakpoints.md
              ? dataSource.length > 24
                ? { scrollToFirstRowOnChange: false, y: 540 }
                : {}
              : {}
          }
          loading={forUser ? false : loadingOrderRows}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          rowClassName={(record) => {
            return record.isBuyOrder ? "buy" : "sell";
          }}
        ></Styled.Table>
      </Styled.TableContainer>
    </>
  );
};
