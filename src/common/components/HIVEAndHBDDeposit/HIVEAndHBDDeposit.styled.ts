import { styled } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const Container = styled.div`
  display: flex;
  padding-left: 8px;
  align-items: center;
`;

export const LogoContainer = styled.div`
  padding-right: 20px;
`;

export const AccountContainer = styled.span`
  color: #0a48be;
  font-style: italic;
`;
export const DepositInstruction = styled.div`
  color: ${colors.textColor};
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  opacity: 1;
`;
