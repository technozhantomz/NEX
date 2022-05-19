import { CardForm, CardFormButton, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

export const PowerDownForm = styled(CardForm)`
  .ant-form-item-label > label {
    color: ${colors.textColorSecondary};
  }
  .ant-input[disabled] {
    color: ${colors.textColor};
    background: ${colors.white};
  }
  .ant-input-affix-wrapper-disabled {
    color: ${colors.textColor};
    background-color: unset;
  }
  .ant-input {
    text-align: right;
    height: 50px;
    ${breakpoint.sm} {
      height: 25px;
    }
  }
  .ant-input-affix-wrapper-lg {
    padding: 15px;
    font-size: 16px;
    ${breakpoint.sm} {
      padding: 20px;
    }
  }

  .ant-input-number-group-wrapper {
    width: 100%;
    .ant-input-number-lg input {
      text-align: center;
      height: 50px;
      ${breakpoint.sm} {
        height: 65px;
      }
    }
  }
  .ant-form-item:nth-child(4) {
    margin-bottom: 45px;
  }
  .ant-form-item:nth-child(5) {
    margin-bottom: 10px;
  }
`;

export const PowerDownFormButton = styled(CardFormButton)`
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
