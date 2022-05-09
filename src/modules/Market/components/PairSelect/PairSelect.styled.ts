import { Button, Row, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const PairSelectContainer = styled.div`
  padding: 25px 30px 0 30px;
  margin-bottom: 0;
  ${breakpoint.sm} {
    margin-bottom: 26px;
    padding: 30px 30px 0 30px;
  }
`;

export const PairButtonRow = styled(Row)`
  margin-bottom: 0;
  ${breakpoint.sm} {
    margin-bottom: 20px;
  }
`;

export const PairButton = styled(Button)`
  font-size: 20px;
  font-weight: 700;
  border: none;
  box-shadow: none;
  padding: 4px 0;
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    box-shadow: none;
    outline: none;
    border: none;
    color: ${colors.textColor};
    background: #fff;
  }
`;

export const PairInfoLabel = styled.span`
  font-size: 12px;
  color: #6c6c6c;
`;

export const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
