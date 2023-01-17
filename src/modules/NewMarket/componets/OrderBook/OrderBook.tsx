import counterpart from "counterpart";

import { useViewportContext } from "../../../../common/providers";
import { Scroll } from "../../../../common/types";
import { DownOutlined, Tooltip } from "../../../../ui/src";
import { Order, OrderRow, OrderType, PairAssets } from "../../types";

import * as Styled from "./OrderBook.styled";
import { SpreadRow } from "./components";
import { useOrderBook } from "./hooks";

type Props = {
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  loadingAsksBids: boolean;
  bids: Order[];
  asks: Order[];
};

export const OrderBook = ({
  selectedAssets,
  loadingSelectedPair,
  loadingAsksBids,
  bids,
  asks,
}: Props): JSX.Element => {
  const { md } = useViewportContext();
  const {
    orderType,
    orderColumns,
    threshold,
    handleThresholdChange,
    handleFilterChange,
    askRows,
    bidRows,
  } = useOrderBook({
    selectedAssets,
    loadingSelectedPair,
    asks,
    bids,
  });

  // Add state variable to keep track of the selected filter type

  const types: OrderType[] = ["total", "sell", "buy"];

  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      <Styled.ThresholdMenu.Item key={"0.001"}>0.001</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key={"0.005"}>0.005</Styled.ThresholdMenu.Item>
      <Styled.ThresholdMenu.Item key={"0.01"}>0.01</Styled.ThresholdMenu.Item>
    </Styled.ThresholdMenu>
  );

  // Use the filterType state variable to decide which orders to display
  const dataSource = [...askRows, ...bidRows];

  // const desktopScrollForOrders =
  //   dataSource.length > 20
  //     ? { y: undefined, x: undefined, scrollToFirstRowOnChange: false }
  //     : { x: 300, scrollToFirstRowOnChange: false };

  // const desktopScroll = desktopScrollForOrders;

  // const mobileScroll =
  //   dataSource.length > 6
  //     ? ({ y: 300, x: undefined, scrollToFirstRowOnChange: false } as Scroll)
  //     : ({ x: undefined, scrollToFirstRowOnChange: false } as Scroll);

  // const scroll = md ? mobileScroll : (desktopScroll as Scroll);

  const desktopScrollForOrders =
    dataSource.length > 8
      ? {
          y: 140,
          scrollToFirstRowOnChange: false,
        }
      : { y: 140, scrollToFirstRowOnChange: false };

  const desktopScroll = desktopScrollForOrders;

  const mobileScroll =
    dataSource.length > 6
      ? ({ y: 300, x: true, scrollToFirstRowOnChange: false } as Scroll)
      : ({ x: true, scrollToFirstRowOnChange: false } as Scroll);
  const scroll = md ? mobileScroll : (desktopScroll as Scroll);

  const lastTradeType = dataSource[0]
    ? dataSource[0].isBuyOrder
      ? "buy"
      : "sell"
    : "";
  const lastTradePrice = dataSource[0] ? parseFloat(dataSource[0].quote) : 0;
  const lastTradeAmount = dataSource[0] ? parseFloat(dataSource[0].amount) : 0;
  const spread =
    bids[0] && asks[0]
      ? parseFloat(bids[0].quote) - parseFloat(asks[0].quote)
      : 0;

  return (
    <>
      <Styled.OrderBookContainer>
        <Styled.Heading>Order Book</Styled.Heading>

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
                <Styled.ThresholdLabel>
                  {counterpart.translate(`field.labels.threshold`)}
                </Styled.ThresholdLabel>
                <Styled.ThresholdValue>{threshold}</Styled.ThresholdValue>
                <DownOutlined />
              </a>
            </Styled.ThresholdDropdown>
          </Styled.Flex>
        </Styled.FilterContainer>
        {orderType !== "sell" && (
          <Styled.Table
            loading={loadingAsksBids}
            pagination={false}
            columns={orderColumns}
            bordered={false}
            scroll={scroll}
            dataSource={bidRows}
            rowClassName={(record) => {
              const item = record as OrderRow;
              const orderDepthRatio = Math.ceil(bids.length / item.orderDepth);
              const orderDepthClass = `order-depth-${orderDepthRatio}`;
              return `buy ${orderDepthClass}`;
            }}
          ></Styled.Table>
        )}
        <SpreadRow
          lastTradeType={lastTradeType}
          lastTradePrice={lastTradePrice}
          lastTradeFiatValue={lastTradeAmount}
          spread={spread}
        />
        {orderType !== "buy" && (
          <Styled.AskTable
            loading={loadingAsksBids}
            showHeader={false}
            pagination={false}
            columns={orderColumns}
            bordered={false}
            scroll={scroll}
            dataSource={askRows}
            rowClassName={"sell"}
          ></Styled.AskTable>
        )}
      </Styled.OrderBookContainer>
    </>
  );
};
