import { useUpdateExchanges } from "../../../../common/hooks";
import { Asset } from "../../../../common/types";
import { Col, DownOutlined, Row } from "../../../../ui/src";

import { PairModal } from "./PairModal";
import * as Styled from "./PairSelect.styled";
import { usePairModal, usePairStats } from "./hooks";

type Props = {
  currentPair: string;
  currentBase: Asset | undefined;
  currentQuote: Asset | undefined;
  loadingSelectedPair: boolean;
  showStats?: boolean;
};

export const PairSelect = ({
  currentPair,
  currentBase,
  currentQuote,
  loadingSelectedPair,
  showStats = true,
}: Props): JSX.Element => {
  const { exchanges } = useUpdateExchanges();

  const { latest, change, volume } = usePairStats({
    currentBase,
    currentQuote,
    loadingAssets: loadingSelectedPair,
  });

  const {
    isVisible,
    pairModalForm,
    formValdation,
    allAssetsSymbols,
    useResetFormOnCloseModal,
    handleCancel,
    handleSelectPair,
    handleClickOnPair,
    handleSelectRecent,
  } = usePairModal();

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
        isVisible={isVisible}
        handleCancel={handleCancel}
        exchanges={exchanges}
        pairModalForm={pairModalForm}
        formValdation={formValdation}
        allAssetsSymbols={allAssetsSymbols}
        useResetFormOnCloseModal={useResetFormOnCloseModal}
        handleSelectPair={handleSelectPair}
        handleSelectRecent={handleSelectRecent}
      />
    </Styled.PairSelectContainer>
  );
};
