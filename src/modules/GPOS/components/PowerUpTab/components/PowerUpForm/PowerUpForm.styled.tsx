import { CardFormButton, CardFrom, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";

export const PowerUpForm = styled(CardFrom)`
  .form-input {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 20px;
    }
  }
`;

export const PowerUpFormButton = styled(CardFormButton)`
  width: 100%;
`;
