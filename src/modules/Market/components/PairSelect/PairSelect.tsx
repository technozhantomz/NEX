import counterpart from "counterpart";

import { PairNameAndMarketStats } from "../../../../common/types";
import { Col, DownOutlined, Row } from "../../../../ui/src";

import * as Styled from "./PairSelect.styled";

type Props = {
  currentPair: string;
  currentPairStats: PairNameAndMarketStats;
  showStats?: boolean;
  handleClickOnPair: () => void;
};

export const PairSelect = ({
  handleClickOnPair,
  currentPair,
  currentPairStats,
  showStats = true,
}: Props): JSX.Element => {
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
              <span>{currentPairStats.marketPairStats.latest}</span>
              <Styled.PairInfoLabel>
                {counterpart.translate(`tableHead.current_price`)}
              </Styled.PairInfoLabel>
            </Styled.ColumnFlex>
          </Col>
          <Col span={7}>
            <Styled.ColumnFlex>
              <span>{currentPairStats.marketPairStats.percentChange}%</span>
              <Styled.PairInfoLabel>
                {counterpart.translate(`tableHead.market_change`)}
              </Styled.PairInfoLabel>
            </Styled.ColumnFlex>
          </Col>
          <Col span={7}>
            <Styled.ColumnFlex>
              <span>{currentPairStats.marketPairStats.volume}</span>
              <Styled.PairInfoLabel>
                {counterpart.translate(`tableHead.volume`)}
              </Styled.PairInfoLabel>
            </Styled.ColumnFlex>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Styled.PairSelectContainer>
  );
};
