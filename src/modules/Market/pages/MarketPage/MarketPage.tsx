import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout, TradingPairCard } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Col, Row } from "../../../../ui/src";
import {
  LimitOrderForm,
  OrderTabs,
  PairModal,
  PairSelect,
} from "../../components";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const { TabPane } = Styled.Tabs;

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { md } = useViewportContext();
  const { pair } = router.query;
  const {
    tradingPairsStats,
    //loadingTradingPairs,
    handleClickOnPair,
    currentBase,
    currentQuote,
    loadingSelectedPair,
    isPairModalVisible,
    setIsPairModalVisible,
    exchanges,
    getOrderBook,
    asks,
    bids,
    ordersRows,
    setOrdersRows,
    loadingOrderRows,
    getUserOrderBook,
    userOrdersRows,
    loadingUserOrderRows,
    refreshOrderBook,
    getHistory,
    orderHistoryRows,
    loadingOrderHistoryRows,
    getUserHistory,
    userOrderHistoryRows,
    loadingUserHistoryRows,
    refreshHistory,
  } = useMarketPage({ currentPair: pair as string });

  return (
    <Layout
      title="market"
      type="card-lrg"
      heading="Market"
      description={`Market Page | ${pair}`}
      dexLayout={true}
    >
      {md ? (
        <>
          <Row>
            <Col className="gutter-row" span={24}>
              <Styled.MarketContainer>
                <Styled.Div>
                  <Row gutter={[16, 16]}>
                    {tradingPairsStats.map((pairStats, _index) => (
                      <Col span={12} key={_index}>
                        <TradingPairCard
                          tradingPair={pairStats.tradingPair}
                          price={`${pairStats.marketPairStats.latest}`}
                          percentChange={`${pairStats.marketPairStats.percentChange}%`}
                          volume={`${pairStats.marketPairStats.volume}`}
                          key={`tradingPair_${_index}`}
                        />
                      </Col>
                    ))}
                  </Row>
                </Styled.Div>
              </Styled.MarketContainer>
            </Col>

            <Col className="gutter-row" span={24}>
              <Styled.Container>
                <Styled.ColumnFlex>
                  <PairSelect
                    handleClickOnPair={handleClickOnPair}
                    currentPair={pair as string}
                    currentBase={currentBase}
                    currentQuote={currentQuote}
                    loadingSelectedPair={loadingSelectedPair}
                    showStats={false}
                  />
                  <OrderTabs
                    currentBase={currentBase}
                    currentQuote={currentQuote}
                    loadingSelectedPair={loadingSelectedPair}
                    getOrderBook={getOrderBook}
                    asks={asks}
                    bids={bids}
                    ordersRows={ordersRows}
                    setOrdersRows={setOrdersRows}
                    loadingOrderRows={loadingOrderRows}
                    getUserOrderBook={getUserOrderBook}
                    userOrdersRows={userOrdersRows}
                    loadingUserOrderRows={loadingUserOrderRows}
                    getHistory={getHistory}
                    orderHistoryRows={orderHistoryRows}
                    loadingOrderHistoryRows={loadingOrderHistoryRows}
                    getUserHistory={getUserHistory}
                    userOrderHistoryRows={userOrderHistoryRows}
                    loadingUserHistoryRows={loadingUserHistoryRows}
                  />
                </Styled.ColumnFlex>
              </Styled.Container>
            </Col>

            <Col className="gutter-row" span={24}>
              <Styled.Container>
                <OrderTabs
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
                  forUser={true}
                  getOrderBook={getOrderBook}
                  asks={asks}
                  bids={bids}
                  ordersRows={ordersRows}
                  setOrdersRows={setOrdersRows}
                  loadingOrderRows={loadingOrderRows}
                  getUserOrderBook={getUserOrderBook}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  getHistory={getHistory}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  getUserHistory={getUserHistory}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                />
              </Styled.Container>
            </Col>

            <Col className="gutter-row" span={24}>
              <Styled.Container>
                <Styled.Tabs>
                  <TabPane tab="BUY" key="1">
                    <LimitOrderForm
                      activePair={pair as string}
                      currentBase={currentBase}
                      currentQuote={currentQuote}
                      loadingSelectedPair={loadingSelectedPair}
                      isBuyOrder={true}
                      refreshOrderBook={refreshOrderBook}
                      refreshHistory={refreshHistory}
                      showTitle={false}
                    />
                  </TabPane>

                  <TabPane tab="SELL" key="2">
                    <LimitOrderForm
                      activePair={pair as string}
                      currentBase={currentBase}
                      currentQuote={currentQuote}
                      loadingSelectedPair={loadingSelectedPair}
                      isBuyOrder={false}
                      refreshOrderBook={refreshOrderBook}
                      refreshHistory={refreshHistory}
                      showTitle={false}
                    />
                  </TabPane>
                </Styled.Tabs>
              </Styled.Container>
            </Col>
          </Row>
          <PairModal
            isVisible={isPairModalVisible}
            setIsVisible={setIsPairModalVisible}
            currentPair={pair as string}
            exchanges={exchanges}
          />
        </>
      ) : (
        <Styled.Container>
          <Row>
            <Col span={7}>
              <Styled.ColumnFlex>
                <PairSelect
                  handleClickOnPair={handleClickOnPair}
                  currentPair={pair as string}
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
                />
                <OrderTabs
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
                  getOrderBook={getOrderBook}
                  asks={asks}
                  bids={bids}
                  ordersRows={ordersRows}
                  setOrdersRows={setOrdersRows}
                  loadingOrderRows={loadingOrderRows}
                  getUserOrderBook={getUserOrderBook}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  getHistory={getHistory}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  getUserHistory={getUserHistory}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                />
              </Styled.ColumnFlex>
            </Col>
            <Col span={17}>
              <Row>
                <Styled.StatsCardsDeck>
                  {tradingPairsStats.map((pairStats, _index) => (
                    <TradingPairCard
                      tradingPair={pairStats.tradingPair}
                      price={`${pairStats.marketPairStats.latest}`}
                      percentChange={`${pairStats.marketPairStats.percentChange}%`}
                      volume={`${pairStats.marketPairStats.volume}`}
                      key={`tradingPair_${_index}`}
                    />
                  ))}
                </Styled.StatsCardsDeck>
              </Row>
              <Row>
                <Col span={12}>
                  <LimitOrderForm
                    activePair={pair as string}
                    currentBase={currentBase}
                    currentQuote={currentQuote}
                    loadingSelectedPair={loadingSelectedPair}
                    isBuyOrder={true}
                    refreshOrderBook={refreshOrderBook}
                    refreshHistory={refreshHistory}
                  />
                </Col>
                <Col span={12}>
                  <LimitOrderForm
                    activePair={pair as string}
                    currentBase={currentBase}
                    currentQuote={currentQuote}
                    loadingSelectedPair={loadingSelectedPair}
                    isBuyOrder={false}
                    refreshOrderBook={refreshOrderBook}
                    refreshHistory={refreshHistory}
                  />
                </Col>
              </Row>
              <Row>
                <OrderTabs
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
                  forUser={true}
                  getOrderBook={getOrderBook}
                  asks={asks}
                  bids={bids}
                  ordersRows={ordersRows}
                  setOrdersRows={setOrdersRows}
                  loadingOrderRows={loadingOrderRows}
                  getUserOrderBook={getUserOrderBook}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  getHistory={getHistory}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  getUserHistory={getUserHistory}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                />
              </Row>
            </Col>
          </Row>
          <PairModal
            isVisible={isPairModalVisible}
            setIsVisible={setIsPairModalVisible}
            currentPair={pair as string}
            exchanges={exchanges}
          />
        </Styled.Container>
      )}
    </Layout>
  );
};

export default MarketPage;
