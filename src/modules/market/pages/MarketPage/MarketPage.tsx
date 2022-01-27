import React from "react";

import { Col, Row } from "../../../../ui/src";
import { PairSelect } from "../../components/PairSelect";

import * as Styled from "./MarketPage.styled";

const MarketPage: React.FC = () => {
  return (
    <>
      <Styled.Container>
        <Row>
          <Col span={6}>
            <PairSelect />
          </Col>
          <Col span={18}>salam</Col>
        </Row>
      </Styled.Container>
    </>
  );
};

export default MarketPage;
