import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { Layout } from "../../../../common/components/PageLayout";
import { Col, Row } from "../../../../ui/src";
import { LimitOrderForm } from "../../components/LimitOrderForm";
import { OrderTabs } from "../../components/OrderTabs";
import { PairSelect } from "../../components/PairSelect";

import * as Styled from "./MarketPage.styled";

const MarketPage: NextPage = () => {
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
              <Col span={12}>
                <LimitOrderForm isBuyOrder={true} />
              </Col>
              <Col span={12}>
                <LimitOrderForm isBuyOrder={false} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Styled.Container>
    </Layout>
  );
};

export default MarketPage;
