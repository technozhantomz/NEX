import { Col, Flex, Row } from "../../../../ui/src";

import * as Styled from "./PairSelect.styled";
import { usePairSelect } from "./hooks/usePairSelect";
import { usePairStats } from "./hooks/usePairStats";

export const PairSelect = (): JSX.Element => {
  const { activePair } = usePairSelect();
  const { latest, change, volume } = usePairStats();
  return (
    <Styled.PairSelectContainer>
      <Row>
        <Styled.PairButton>
          {activePair} <Styled.PairButtonDownOutlined />
        </Styled.PairButton>
      </Row>
      <Row>
        <Col span={10}>
          <Flex flexDirection="column">
            <span>{latest}</span>
            <Styled.PairInfoLabel>Current price</Styled.PairInfoLabel>
          </Flex>
        </Col>
        <Col span={7}>
          <Flex flexDirection="column">
            <span>{change}%</span>
            <Styled.PairInfoLabel>Change</Styled.PairInfoLabel>
          </Flex>
        </Col>
        <Col span={7}>
          <Flex flexDirection="column">
            <span>{volume}</span>
            <Styled.PairInfoLabel>Volume</Styled.PairInfoLabel>
          </Flex>
        </Col>
      </Row>
    </Styled.PairSelectContainer>
  );
};
