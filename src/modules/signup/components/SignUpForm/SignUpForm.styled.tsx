import {
  CardFormButton,
  CardFrom,
  styled,
  Checkbox as UICheckbox,
  Input as UIInput,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const GeneratedPassordInput = styled(UIInput.Password)`
  .ant-input-password-icon {
    color: #b9b9b9;
    display: flex;
    justify-content: space-between;
    width: 38px;
  }
`;

export const Checkbox = styled(UICheckbox)`
   {
    align-items: flex-start;
    .ant-checkbox-inner {
      width: 30px;
      height: 30px;
      &::after {
        left: 35%;
      }
    }
  }
  ${breakpoint.xs} {
     {
      align-items: flex-start;
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &::after {
          left: 25%;
        }
      }
    }
  }
`;

export const SignupForm = styled(CardFrom)``;
export const SignupFormButton = styled(CardFormButton)``;
