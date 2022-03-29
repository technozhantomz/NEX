import { Col, DownOutlined, Row } from "../../../../ui/src";
import { Form } from "../LimitOrderForm/LimitOrderForm.styled";

import { PairModal } from "./PairModal";
import * as Styled from "./PairSelect.styled";
import { usePairSelect, usePairStats } from "./hooks";

type Props = {
  currentPair: string;
};

export const PairSelect = ({ currentPair }: Props): JSX.Element => {
  const {
    activePair,
    visible,
    recentPairs,
    onCancel,
    onSelectPair,
    onFormFinish,
  } = usePairSelect(currentPair);
  const { latest, change, volume } = usePairStats();

  return (
    <Styled.PairSelectContainer>
      <Form.Provider onFormFinish={onFormFinish}>
        <Styled.PairButtonRow>
          <Styled.PairButton onClick={onSelectPair}>
            {activePair.split("_").join("/")} <DownOutlined />
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
        <PairModal
          visible={visible}
          onCancel={onCancel}
          recentPairs={recentPairs}
        />
      </Form.Provider>
    </Styled.PairSelectContainer>
  );
};
