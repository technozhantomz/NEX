import { CardFormButton, styled } from "../../../../../../../../ui/src";
import { breakpoint } from "../../../../../../../../ui/src/breakpoints";

export const WithdrawFormButton = styled(CardFormButton)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;
