import { Col, Flex, Row } from "../../../../ui/src";

import * as Styled from "./PairSelect.styled";

export const PairSelect = (): JSX.Element => {
  return (
    <Styled.PairSelectContainer>
      <Row>
        <Styled.PairButton>
          BTC/PPY <Styled.PairButtonDownOutlined />
        </Styled.PairButton>
      </Row>
      <Row>
        <Col span={10}>
          <Flex flexDirection="column">
            <span>0</span>
            <Styled.PairInfoLabel>Current price</Styled.PairInfoLabel>
          </Flex>
        </Col>
        <Col span={7}>
          <Flex flexDirection="column">
            <span>0</span>
            <Styled.PairInfoLabel>Change</Styled.PairInfoLabel>
          </Flex>
        </Col>
        <Col span={7}>
          <Flex flexDirection="column">
            <span>0</span>
            <Styled.PairInfoLabel>Volume</Styled.PairInfoLabel>
          </Flex>
        </Col>
      </Row>
    </Styled.PairSelectContainer>
  );
};
