import { Card, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { mixIns } from "../../../../ui/src/mixins";

export const SignUpFormCard = styled(Card)`
  .ant-card-body {
    padding: 25px 20px;
    ${breakpoint.sm} {
      padding: 35px 30px;
    }
  }
  ${mixIns.borderRadius}
  height: auto;
  max-width: 600px;
  ${breakpoint.sm} {
    height: auto;
  }
`;

export const FormDisclamerContainer = styled.div``;
