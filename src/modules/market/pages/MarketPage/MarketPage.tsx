import React from "react";

import { Col, Flex, Row } from "../../../../ui/src";
import { OrderTabs } from "../../components/OrderTabs";
import { PairSelect } from "../../components/PairSelect";

import * as Styled from "./MarketPage.styled";

const MarketPage: React.FC = () => {
  return (
    <>
      <Styled.Container>
        <Row>
          <Col span={6}>
            <Flex flexDirection="column">
              <PairSelect />
              <OrderTabs />
            </Flex>
          </Col>
          <Col span={18}>
            <Row>
              <Col span={12}></Col>
              <Col span={12}></Col>
            </Row>
          </Col>
        </Row>
      </Styled.Container>
    </>
  );
};

export default MarketPage;
