import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import counterpart from "counterpart";
import { max } from "lodash";

import { DownOutlined, Tooltip } from "../../../../ui/src";
import { Order, PairAssets, TradeHistoryRow } from "../../types";

import * as Styled from "./OrderBook.styled";
//import { SpreadRow } from "./components";
import { FilterType, useOrderBook } from "./hooks";

type Props = {
  currentPair: string;
  selectedAssets: PairAssets | undefined;
  loadingSelectedPair: boolean;
  loadingAsksBids: boolean;
  asks: Order[];
  bids: Order[];
  lastTradeHistory?: TradeHistoryRow;
};

export const OrderBook = ({
  currentPair,
  selectedAssets,
  loadingSelectedPair,
  loadingAsksBids,
  bids,
  asks,
  lastTradeHistory,
}: Props): JSX.Element => {
  const {
    thresholdValues,
    orderColumns,
    handleThresholdChange,
    threshold,
    asksRows,
    bidsRows,
    filter,
    handleFilterChange,
    specifyTableHeight,
    specifyTableScroll,
    specifyLastTradeClassName,
  } = useOrderBook({
    currentPair,
    asks,
    bids,
    selectedAssets,
    loadingSelectedPair,
  });

  const types: FilterType[] = ["total", "sell", "buy"];
  const thresholdMenu = (
    <Styled.ThresholdMenu onClick={handleThresholdChange}>
      {thresholdValues.map((value) => (
        <Styled.ThresholdMenu.Item key={value}>
          {value}
        </Styled.ThresholdMenu.Item>
      ))}
    </Styled.ThresholdMenu>
  );

  const bidsScroll = specifyTableScroll(bidsRows);
  const asksScroll = specifyTableScroll(asksRows);
  const lastTradeHistoryPrice =
    lastTradeHistory && lastTradeHistory.isPriceUp !== undefined ? (
      lastTradeHistory.isPriceUp ? (
        <>
          <span style={{ marginRight: "4px" }}>{lastTradeHistory.price}</span>
          <CaretUpOutlined />
        </>
      ) : (
        <>
          <span style={{ marginRight: "4px" }}>{lastTradeHistory.price}</span>
          <CaretDownOutlined />
        </>
      )
    ) : (
      <span style={{ marginRight: "4px" }}>{lastTradeHistory?.price}</span>
    );

  return (
    <>
      <Styled.OrderBookContainer>
        <Styled.Heading>
          {counterpart.translate("pages.market.order_book")}
        </Styled.Heading>
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
                    type === filter ? " active" : ""
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
        {filter !== "sell" && (
          <Styled.Table
            style={{ height: specifyTableHeight() }}
            loading={loadingAsksBids}
            pagination={false}
            columns={orderColumns}
            bordered={false}
            scroll={bidsScroll}
            dataSource={bidsRows}
            rowClassName={(record) => {
              const item = record as Order;
              const orderDepthRatio =
                Math.ceil(
                  (Number(item.quote) /
                    (max(bidsRows.map((row) => Number(row.quote))) ?? 0)) *
                    10
                ) * 10;
              const orderDepthClass = `order-depth-${orderDepthRatio}`;
              return `buy ${orderDepthClass}`;
            }}
          ></Styled.Table>
        )}
        {filter === "total" && (
          <Styled.LastTradeContainer>
            <Styled.LastTradePriceValue>
              <span className={specifyLastTradeClassName(lastTradeHistory)}>
                {lastTradeHistory ? lastTradeHistoryPrice : 0}
              </span>
            </Styled.LastTradePriceValue>
            <Styled.LastTradeValue>
              {lastTradeHistory ? lastTradeHistory.amount : 0}
            </Styled.LastTradeValue>
            <Styled.LastTradeValue>
              {lastTradeHistory
                ? (
                    Number(lastTradeHistory.amount) *
                    Number(lastTradeHistory.price)
                  ).toFixed(selectedAssets?.quote.precision || 5)
                : 0}
            </Styled.LastTradeValue>
          </Styled.LastTradeContainer>
        )}
        {filter !== "buy" && (
          <Styled.Table
            style={{ height: specifyTableHeight() }}
            loading={loadingAsksBids}
            pagination={false}
            columns={orderColumns}
            bordered={false}
            scroll={asksScroll}
            dataSource={asksRows}
            rowClassName={(record) => {
              const item = record as Order;
              const orderDepthRatio =
                Math.ceil(
                  (Number(item.quote) /
                    (max(asksRows.map((row) => Number(row.quote))) ?? 0)) *
                    10
                ) * 10;
              const orderDepthClass = `order-depth-${orderDepthRatio}`;
              return `sell ${orderDepthClass}`;
            }}
          ></Styled.Table>
        )}
      </Styled.OrderBookContainer>
    </>
  );
};
