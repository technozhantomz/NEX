import counterpart from "counterpart";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import {
  Layout,
  LoadingIndicator,
  TradingPairCard,
} from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { PairNameAndMarketStats } from "../../../../common/types";
import { Col, Row } from "../../../../ui/src";
import {
  LimitOrderForm,
  OrderTabs,
  PairModal,
  PairSelect,
} from "../../components";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { md } = useViewportContext();
  const { pair } = router.query;
  const {
    tradingPairsStats,
    loadingTradingPairsStats,
    handleClickOnPair,
    selectedAssets,
    loadingSelectedPair,
    isPairModalVisible,
    setIsPairModalVisible,
    exchanges,
    asks,
    bids,
    loadingAsksBids,
    userOrdersRows,
    loadingUserOrderRows,
    orderHistoryRows,
    loadingOrderHistoryRows,
    userOrderHistoryRows,
    loadingUserHistoryRows,
    buyOrderForm,
    sellOrderForm,
    onOrderBookRowClick,
    pageLoaded,
  } = useMarketPage({ currentPair: pair as string });
  const limitOrderTabItems = [
    {
      label: counterpart.translate(`pages.market.buy`),
      key: "buy",
      children: (
        <LimitOrderForm
          activePair={pair as string}
          selectedAssets={selectedAssets}
          loadingSelectedPair={loadingSelectedPair}
          isBuyOrder={true}
          showTitle={false}
          orderForm={buyOrderForm}
        />
      ),
    },
    {
      label: counterpart.translate(`pages.market.sell`),
      key: "sell",
      children: (
        <LimitOrderForm
          activePair={pair as string}
          selectedAssets={selectedAssets}
          loadingSelectedPair={loadingSelectedPair}
          isBuyOrder={false}
          orderForm={sellOrderForm}
        />
      ),
    },
  ];

  return loadingTradingPairsStats && !pageLoaded ? (
    <LoadingIndicator />
  ) : (
    <Layout
      title="market"
      type="card-lrg"
      heading={counterpart.translate(`pages.market.heading`)}
      description={`Market Page | ${pair}`}
      layout="dex"
    >
      {/* Mobile and tablet UI */}
      {md ? (
        <>
          <Row>
            <Col className="gutter-row" span={24}>
              <Styled.MarketContainer>
                <Styled.Div>
                  <Row gutter={[16, 16]}>
                    {tradingPairsStats.slice(0, 4).map((pairStats, _index) => (
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
                    currentPairStats={
                      tradingPairsStats.find(
                        (stats) =>
                          stats.tradingPair ===
                          (pair as string).replace("_", "/")
                      ) ||
                      ({
                        tradingPair: (pair as string).replace("_", "/"),
                        marketPairStats: {
                          latest: "0",
                          percentChange: "0",
                          volume: "0",
                        },
                      } as PairNameAndMarketStats)
                    }
                    showStats={false}
                  />
                  <OrderTabs
                    selectedAssets={selectedAssets}
                    loadingSelectedPair={loadingSelectedPair}
                    asks={asks}
                    bids={bids}
                    loadingAsksBids={loadingAsksBids}
                    userOrdersRows={userOrdersRows}
                    loadingUserOrderRows={loadingUserOrderRows}
                    orderHistoryRows={orderHistoryRows}
                    loadingOrderHistoryRows={loadingOrderHistoryRows}
                    userOrderHistoryRows={userOrderHistoryRows}
                    loadingUserHistoryRows={loadingUserHistoryRows}
                    onOrderBookRowClick={onOrderBookRowClick}
                  />
                </Styled.ColumnFlex>
              </Styled.Container>
            </Col>
            <Col className="gutter-row" span={24}>
              <Styled.Container>
                <OrderTabs
                  selectedAssets={selectedAssets}
                  loadingSelectedPair={loadingSelectedPair}
                  forUser={true}
                  asks={asks}
                  bids={bids}
                  loadingAsksBids={loadingAsksBids}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                  onOrderBookRowClick={onOrderBookRowClick}
                />
              </Styled.Container>
            </Col>
            <Col className="gutter-row" span={24}>
              <Styled.Container>
                <Styled.Tabs items={limitOrderTabItems} />
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
        // Desktop UI
        <Styled.Container>
          <Row>
            {/* Left side (Market orders and current pair) */}
            <Col span={7}>
              <Styled.ColumnFlex>
                <PairSelect
                  handleClickOnPair={handleClickOnPair}
                  currentPair={pair as string}
                  currentPairStats={
                    tradingPairsStats.find(
                      (stats) =>
                        stats.tradingPair === (pair as string).replace("_", "/")
                    ) ||
                    ({
                      tradingPair: (pair as string).replace("_", "/"),
                      marketPairStats: {
                        latest: "0",
                        percentChange: "0",
                        volume: "0",
                      },
                    } as PairNameAndMarketStats)
                  }
                />
                <OrderTabs
                  selectedAssets={selectedAssets}
                  loadingSelectedPair={loadingSelectedPair}
                  asks={asks}
                  bids={bids}
                  loadingAsksBids={loadingAsksBids}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                  onOrderBookRowClick={onOrderBookRowClick}
                />
              </Styled.ColumnFlex>
            </Col>

            {/* Right side (Market stats, Limit order forms and User orders) */}
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
                    selectedAssets={selectedAssets}
                    loadingSelectedPair={loadingSelectedPair}
                    isBuyOrder={true}
                    orderForm={buyOrderForm}
                  />
                </Col>
                <Col span={12}>
                  <LimitOrderForm
                    activePair={pair as string}
                    selectedAssets={selectedAssets}
                    loadingSelectedPair={loadingSelectedPair}
                    isBuyOrder={false}
                    orderForm={sellOrderForm}
                  />
                </Col>
              </Row>
              <Row>
                <OrderTabs
                  selectedAssets={selectedAssets}
                  loadingSelectedPair={loadingSelectedPair}
                  forUser={true}
                  asks={asks}
                  bids={bids}
                  loadingAsksBids={loadingAsksBids}
                  userOrdersRows={userOrdersRows}
                  loadingUserOrderRows={loadingUserOrderRows}
                  orderHistoryRows={orderHistoryRows}
                  loadingOrderHistoryRows={loadingOrderHistoryRows}
                  userOrderHistoryRows={userOrderHistoryRows}
                  loadingUserHistoryRows={loadingUserHistoryRows}
                  onOrderBookRowClick={onOrderBookRowClick}
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
