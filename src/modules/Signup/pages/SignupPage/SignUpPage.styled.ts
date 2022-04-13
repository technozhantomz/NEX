import { Card, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const SignUpFormCard = styled(Card)`
  .ant-card-body {
    padding: 25px 20px;
    ${breakpoint.sm} {
      padding: 35px 30px;
    }
  }
  border-radius: 4px;
  opacity: 1;
  height: 487px;
  max-width: 600px;
  ${breakpoint.sm} {
    min-height: 610px;
  }
`;

export const FormDisclamerDiv = styled.div`
  margin-top: 5px;
  ${breakpoint.sm} {
    margin-top: 20px;
  }
`;
