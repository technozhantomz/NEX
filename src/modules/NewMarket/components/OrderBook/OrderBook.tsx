import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import counterpart from "counterpart";
import { useCallback } from "react";

import { DownOutlined, Tooltip } from "../../../../ui/src";
import { Order, PairAssets, TradeHistoryRow } from "../../types";

import * as Styled from "./OrderBook.styled";
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
    specifyAsksTableRowClassName,
    specifyBidsTableRowClassName,
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

  const renderLastTradeHistoryPrice = useCallback(
    (lastTradeHistory: TradeHistoryRow) => {
      if (lastTradeHistory.isPriceUp !== undefined) {
        return lastTradeHistory.isPriceUp ? (
          <>
            <span style={{ marginRight: "4px" }}>{lastTradeHistory.price}</span>
            <CaretUpOutlined />
          </>
        ) : (
          <>
            <span style={{ marginRight: "4px" }}>{lastTradeHistory.price}</span>
            <CaretDownOutlined />
          </>
        );
      } else {
        return (
          <span style={{ marginRight: "4px" }}>{lastTradeHistory?.price}</span>
        );
      }
    },
    []
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
        {/* Buy table */}
        {filter !== "sell" && (
          <Styled.Table
            style={{ height: specifyTableHeight() }}
            loading={loadingAsksBids}
            pagination={false}
            columns={orderColumns as any}
            bordered={false}
            scroll={bidsScroll}
            dataSource={bidsRows}
            rowClassName={specifyBidsTableRowClassName}
          ></Styled.Table>
        )}
        {/* Last trade */}
        {filter === "total" && (
          <Styled.LastTradeContainer>
            <Styled.LastTradePriceValue>
              <span className={specifyLastTradeClassName(lastTradeHistory)}>
                {lastTradeHistory
                  ? renderLastTradeHistoryPrice(lastTradeHistory)
                  : 0}
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
        {/* Sell table */}
        {filter !== "buy" && (
          <Styled.Table
            style={{ height: specifyTableHeight() }}
            loading={loadingAsksBids}
            pagination={false}
            columns={orderColumns as any}
            bordered={false}
            scroll={asksScroll}
            dataSource={asksRows}
            rowClassName={specifyAsksTableRowClassName}
          ></Styled.Table>
        )}
      </Styled.OrderBookContainer>
    </>
  );
};
