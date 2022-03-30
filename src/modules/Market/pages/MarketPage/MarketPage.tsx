import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../../../../common/components/PageLayout";
import { TradingPairCard } from "../../../../common/components/TradingPairCard";
import { Col, Row } from "../../../../ui/src";
import { LimitOrderForm } from "../../components/LimitOrderForm";
import { OrderTabs } from "../../components/OrderTabs";
import { PairSelect } from "../../components/PairSelect";

import * as Styled from "./MarketPage.styled";
import { useMarketPage } from "./hooks";

const { TabPane } = Styled.Tabs;

const MarketPage: NextPage = () => {
  const { statPairs } = useMarketPage();
  const router = useRouter();
  const { pair } = router.query;

  return (
    <Layout
      title="market"
      type="card-lrg"
      heading="Market"
      description={`Market Page | ${pair}`}
      dexLayout={true}
    >
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
              <Styled.Tabs>
                <TabPane tab="My Open Orders" key="my-open-orders">
                  my orders here
                </TabPane>
                <TabPane tab="My Order History" key="my-order-history">
                  my history here
                </TabPane>
              </Styled.Tabs>
            </Row>
          </Col>
        </Row>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
