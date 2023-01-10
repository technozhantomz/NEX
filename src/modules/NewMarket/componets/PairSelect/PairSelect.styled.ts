import { Button, Row, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const PairSelectContainer = styled.div`
  margin: 0;
`;

export const PairButtonRow = styled(Row)`
  margin-bottom: 0;
`;

export const PairButton = styled(Button)`
  font-size: 20px;
  font-weight: 700;
  border: none;
  box-shadow: none;
  width: 100%;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  padding: 0px;
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

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  ${breakpoint.sm} {
    margin-right: 10px;
  }
`;

export const Pair = styled.span`
  flex: 2;
  text-align: left;
`;
