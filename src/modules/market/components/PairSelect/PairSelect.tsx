import { Col, DownOutlined, Row } from "../../../../ui/src";

import * as Styled from "./PairSelect.styled";

export const PairSelect = (): JSX.Element => {
  return (
    <Styled.PairSelectContainer>
      <Styled.PairButton>
        Button <DownOutlined />
      </Styled.PairButton>
    </Styled.PairSelectContainer>
  );
};
