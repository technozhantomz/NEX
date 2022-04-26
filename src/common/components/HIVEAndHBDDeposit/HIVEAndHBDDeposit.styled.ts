import { FormDisclamer as UiFormDisclamer } from "..";
import { CardFormButton, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const Container = styled.div`
  display: flex;
  padding-left: 8px;
  align-items: center;
  margin: 25px 20px;
  ${breakpoint.sm} {
    margin: 35px 30px;
  }
`;

export const LogoContainer = styled.div`
  padding-right: 20px;
`;

export const AccountContainer = styled.span`
  color: ${colors.linkColor};
  font-style: italic;
`;
export const DepositInstruction = styled.div`
  color: ${colors.textColor};
  text-align: left;
  font-size: 14px;
`;

export const LoginContainer = styled.div``;

export const Button = styled(CardFormButton)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;

export const FormDisclamer = styled(UiFormDisclamer)`
  margin-bottom: 15px;
  ${breakpoint.xs} {
    margin-bottom: 25px;
  }
`;
