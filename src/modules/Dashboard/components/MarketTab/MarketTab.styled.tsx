import { styled, Col as UiCol, Row as UiRow } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const MarketContainer = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  color: white;
  width: 600px;
  margin: 10px;
  padding: 10px;
  text-align: center;
`;

export const Row = styled(UiRow)``;

export const Col = styled(UiCol)``;

export const Heading = styled.p`
  text-align: left;
  color: ${colors.textColorSecondary};
  font-size: 12px;
  margin-left: 7px;
  margin-top: 25px;
  ${breakpoint.xs} {
    font-size: 14px;
    margin-left: 30px;
  }
`;

export const Div = styled.div`
  margin: 10px;

  ${breakpoint.sm} {
    margin: 25px;
  }
`;
