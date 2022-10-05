import { FormDisclamer as UiFormDisclamer } from "..";
import { CardFormButton, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const LoginContainer = styled.div`
  margin-top: 25px;
  ${breakpoint.sm} {
    margin-top: 35px;
  }
`;

export const Button = styled(CardFormButton)``;

export const FormDisclamer = styled(UiFormDisclamer)`
  margin-top: 25px;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-top: 35px;
    margin-bottom: 35px;
  }
`;
