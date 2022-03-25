import { Col, Form, styled, Row as UiRow } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const DepositForm = styled(Form)`
  padding-top: 10px;
`;

export const Row = styled(UiRow)`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  opacity: 1;
  height: 65px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  font: normal normal medium 20px/24px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  font-size: 20px;
`;

export const SelectOptionCol = styled(Col)`
  margin-top: 15px;
  margin-bottom: auto;
`;

export const SonError = styled.span`
  color: ${colors.errorColor};
`;
