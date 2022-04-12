import { FormDisclamer as FD } from "../../../../common/components/FormDisclamer";
import { Card, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const LoginFormCard = styled(Card)`
  max-width: 355px;
  min-height: 245px;
  padding-top: 10px;
  border-radius: 4px;
  opacity: 1;
  ${breakpoint.sm} {
    max-width: 600px;
    min-height: 325px;
    padding-top: 10px;
    border-radius: 4px;
    opacity: 1;
  }
`;

export const FormDisclamer = styled(FD)`
  margin-top: 35px;
`;
