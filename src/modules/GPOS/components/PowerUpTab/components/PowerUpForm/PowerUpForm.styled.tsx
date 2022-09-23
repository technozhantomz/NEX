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
      font-size: 20px;
      height: 25px;
    }
  }
  .ant-input-affix-wrapper-lg {
    padding: 0 15px;
    font-size: 16px;
    ${breakpoint.sm} {
      padding: 20px;
      font-size: 20px;
    }
  }

  .ant-input-number-group-wrapper {
    width: 100%;
    .ant-input-number-lg input {
      text-align: center;
      height: 50px;
      ${breakpoint.sm} {
        text-align: left;
        font-size: 20px;
        height: 65px;
        padding: 0 20px;
      }
    }
    .ant-input-number-group-addon {
      background-color: #e3ebf8;
      .ant-btn-text {
        display: flex;
        align-items: center;
      }
      .ant-btn-text:hover,
      .ant-btn-text:focus {
        background: #e3ebf8;
      }
      ${breakpoint.sm} {
        .ant-btn-text > span {
          font-size: 28px;
        }
      }
    }
  }
  .ant-form-item:nth-child(3) {
    margin-bottom: 24px;
  }
  .ant-form-item:nth-child(4) {
    margin-bottom: 45px;
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
