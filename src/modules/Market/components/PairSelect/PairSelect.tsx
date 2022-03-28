import { Col, DownOutlined, Row } from "../../../../ui/src";

import { PairModal } from "./PairModal";
import * as Styled from "./PairSelect.styled";
import { usePairSelect, usePairStats } from "./hooks";

export const PairSelect = (): JSX.Element => {
  const { activePair, visible, onCancel, onSelectPair } = usePairSelect();
  const { latest, change, volume } = usePairStats();

  return (
    <Styled.PairSelectContainer>
      <Styled.PairButtonRow>
        <Styled.PairButton onClick={onSelectPair}>
          {activePair} <DownOutlined />
        </Styled.PairButton>
      </Styled.PairButtonRow>
      <Row>
        <Col span={10}>
          <Styled.ColumnFlex>
            <span>{latest}</span>
            <Styled.PairInfoLabel>Current price</Styled.PairInfoLabel>
          </Styled.ColumnFlex>
        </Col>
        <Col span={7}>
          <Styled.ColumnFlex>
            <span>{change}%</span>
            <Styled.PairInfoLabel>Change</Styled.PairInfoLabel>
          </Styled.ColumnFlex>
        </Col>
        <Col span={7}>
          <Styled.ColumnFlex>
            <span>{volume}</span>
            <Styled.PairInfoLabel>Volume</Styled.PairInfoLabel>
          </Styled.ColumnFlex>
        </Col>
      </Row>
      <PairModal visible={visible} onCancel={onCancel} />
    </Styled.PairSelectContainer>
  );
};
