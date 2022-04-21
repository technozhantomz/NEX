import { FormDisclamer as UiFormDisclamer } from "../../../../common/components";
import { Card, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const LoginFormCard = styled(Card)`
  max-width: 335px;
  min-height: 245px;
  padding-top: 10px;
  ${mixIns.borderRadius}
  ${breakpoint.xs} {
    max-width: 600px;
    min-height: 345px;
  }
`;

export const FormDisclamer = styled(UiFormDisclamer)`
  margin-top: 35px;
`;
