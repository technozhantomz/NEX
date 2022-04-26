import { CardFormButton, CardForm, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

export const PowerUpForm = styled(CardForm)`
  .ant-input {
    text-align: right;
    height: 65px;
  }
  .ant-input[disabled] {
    color: ${colors.textColor};
    background: ${colors.white};
  }
  .ant-input-number-group-wrapper {
    width: 100%;
    .ant-input-number-lg input {
      text-align: center;
      height: 65px;
    }
  }

  ${breakpoint.sm} {
  }
`;

export const PowerUpFormButton = styled(CardFormButton)`
  height: 45px;
`;

export const StatusMsg = styled.p`
  &.success {
    color: ${colors.successColor};
  }
  &.error {
    color: ${colors.errorColor};
  }
`;
