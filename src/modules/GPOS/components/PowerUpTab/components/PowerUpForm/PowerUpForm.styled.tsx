import { CardForm, CardFormButton, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

export const PowerUpForm = styled(CardForm)`
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
    padding: 0 15px;
    ${breakpoint.sm} {
      padding: 20px;
    }
  }

  .ant-input-group-wrapper {
    width: 100%;
    .ant-input-wrapper input {
      text-align: center;
      height: 50px;
      ${breakpoint.sm} {
        text-align: left;
        height: 65px;
        padding: 0 20px;
      }
    }
    .ant-input-group-addon {
      background-color: #e3ebf8;
      .ant-btn-text {
        display: flex;
        align-items: center;
      }
      .ant-btn-text:hover,
      .ant-btn-text:focus {
        background: #e3ebf8;
      }
    }
  }
  .ant-form-item:nth-child(3) {
    margin-bottom: 24px;
  }
  .ant-form-item:nth-child(4) {
    margin-bottom: 45px;
  }
  .ant-form-item:nth-child(5) {
    margin-bottom: 10px;
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
