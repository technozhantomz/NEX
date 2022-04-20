import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout, TradingPairCard } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";
import { Col, Row } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { OrderTabs, PairSelect } from "../../components";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

//const { TabPane } = Styled.Tabs;

const MarketPage: NextPage = () => {
  const router = useRouter();
  const { width } = useViewportContext();
  const { pair } = router.query;
  const {
    tradingPairsStats,
    //loadingTradingPairs,
    currentBase,
    currentQuote,
    loadingSelectedPair,
  } = useMarketPage({ currentPair: pair as string });

  return (
    <Layout
      title="market"
      type="card-lrg"
      heading="Market"
      description={`Market Page | ${pair}`}
      dexLayout={true}
    >
      {width > breakpoints.md ? (
        <Styled.Container>
          <Row>
            <Col span={7}>
              <Styled.ColumnFlex>
                <PairSelect
                  currentPair={pair as string}
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
                />
                <OrderTabs
                  currentBase={currentBase}
                  currentQuote={currentQuote}
                  loadingSelectedPair={loadingSelectedPair}
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
              {/* <Row>
                <Col span={12}>
                  <LimitOrderForm isBuyOrder={true} />
                </Col>
                <Col span={12}>
                  <LimitOrderForm isBuyOrder={false} />
                </Col>
              </Row>
              <Row>
                <OrderTabs forUser={true} />
              </Row> */}
            </Col>
          </Row>
        </Styled.Container>
      ) : (
        <>
          {/* <Styled.Container>
            <Styled.StatsCardsDeck>
              {tradingPairsStats.map((pairStats, _index) => (
                <TradingPairCard
                  tradingPair={pairStats.tradingPair}
                  price={`${pairStats.marketPairStats.latest}`}
                  percentChange={`${pairStats.marketPairStats.percentChange}%`}
                  volume={`${pairStats.marketPairStats.volume}`}
                />
              ))}
            </Styled.StatsCardsDeck>
          </Styled.Container>
          <Styled.Container>
            <PairSelect currentPair={pair as string} showStats={false} />
            <OrderTabs />
          </Styled.Container>
          <Styled.Container>
            <OrderTabs forUser={true} />
          </Styled.Container>
          <Styled.Container>
            <Styled.Tabs>
              <TabPane tab="Buy" key="buy">
                <LimitOrderForm isBuyOrder={true} showTitle={false} />
              </TabPane>
              <TabPane tab="Sell" key="sell">
                <LimitOrderForm isBuyOrder={false} showTitle={false} />
              </TabPane>
            </Styled.Tabs>
          </Styled.Container> */}
        </>
      )}
    </Layout>
  );
};

export default MarketPage;
