import { useSettingsContext } from "../../../../common/providers";
import { Col, DownOutlined, Row } from "../../../../ui/src";
import { Form } from "../LimitOrderForm/LimitOrderForm.styled";

import { PairModal } from "./PairModal";
import * as Styled from "./PairSelect.styled";
import { usePairSelect, usePairStats } from "./hooks";

type Props = {
  currentPair: string;
  showStats?: boolean;
};

export const PairSelect = ({
  currentPair,
  showStats = true,
}: Props): JSX.Element => {
  const {
    loading: loadingAssets,
    currentBase,
    currentQuote,
  } = usePairSelect(currentPair);

  const { exchanges } = useSettingsContext();

  const { latest, change, volume } = usePairStats({
    currentBase,
    currentQuote,
    loadingAssets,
  });

  return (
    <Styled.PairSelectContainer>
      <Styled.PairButtonRow>
        <Styled.PairButton onClick={handleClickOnPair}>
          {currentPair.split("_").join("/")} <DownOutlined />
        </Styled.PairButton>
      </Styled.PairButtonRow>
      {showStats ? (
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
      ) : (
        ""
      )}
      <PairModal
        visible={isPairModalVisible}
        onCancel={handleCanclePairModal}
        recentPairs={exchanges.list}
      />
    </Styled.PairSelectContainer>
  );
};
