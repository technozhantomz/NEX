import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import {
  Layout,
  TradingPairCard,
  useViewportContext,
} from "../../../../common/components";
import { Col, Row } from "../../../../ui/src";
import { breakpoints } from "../../../../ui/src/breakpoints";
import { LimitOrderForm } from "../../components/LimitOrderForm";
import { OrderTabs } from "../../components/OrderTabs";
import { PairSelect } from "../../components/PairSelect";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const { TabPane } = Styled.Tabs;

const MarketPage: NextPage = () => {
  const { statPairs } = useMarketPage();
  const router = useRouter();
  const { width } = useViewportContext();
  const { pair } = router.query;

  return (
    <Layout
      title="market"
      type="card-lrg"
      heading="Market"
      description={`Market Page | ${pair}`}
      dexLayout={true}
    >
      {width > breakpoints.sm ? (
        <Styled.Container>
          <Row>
            <Col span={7}>
              <Styled.ColumnFlex>
                <PairSelect currentPair={pair as string} />
                <OrderTabs />
              </Styled.ColumnFlex>
            </Col>
            <Col span={17}>
              <Row>
                <Styled.StatsCardsDeck>
                  {statPairs.map((statPair, _index) => (
                    <TradingPairCard
                      tradingPair={statPair.tradingPair}
                      price={`${statPair.marketPairStats.latest}`}
                      percentChange={`${statPair.marketPairStats.percentChange}%`}
                      volume={`${statPair.marketPairStats.volume}`}
                    />
                  ))}
                </Styled.StatsCardsDeck>
              </Row>
              <Row>
                <Col span={12}>
                  <LimitOrderForm isBuyOrder={true} />
                </Col>
                <Col span={12}>
                  <LimitOrderForm isBuyOrder={false} />
                </Col>
              </Row>
              <Row>
                <OrderTabs forUser={true} />
              </Row>
            </Col>
          </Row>
        </Styled.Container>
      ) : (
        <>
          <Styled.Container>
            <Styled.StatsCardsDeck>
              {statPairs.map((statPair, _index) => (
                <TradingPairCard
                  tradingPair={statPair.tradingPair}
                  price={`${statPair.marketPairStats.latest}`}
                  percentChange={`${statPair.marketPairStats.percentChange}%`}
                  volume={`${statPair.marketPairStats.volume}`}
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
          </Styled.Container>
        </>
      )}
    </Layout>
  );
};

export default MarketPage;
