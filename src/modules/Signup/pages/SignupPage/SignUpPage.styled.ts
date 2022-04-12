import { FormDisclamer as FD } from "../../../../common/components/FormDisclamer";
import { Card, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const SignUpFormCard = styled(Card)`
  .ant-card-body {
    padding: 35px 30px;
  }
  border-radius: 4px;
  opacity: 1;
  height: 487px;
  max-width: 600px;
  ${breakpoint.sm} {
    min-height: 610px;
  }
`;

export const FormDisclamer = styled(FD)`
  margin-top: 35px;
`;
