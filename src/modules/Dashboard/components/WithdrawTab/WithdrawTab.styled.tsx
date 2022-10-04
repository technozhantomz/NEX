import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const Button = styled(CardFormButton)``;

export const WithdrawContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  color: ${colors.textColor};
  font-size: 20px;
  width: 600px;
  margin: 10px;
  padding: 25px 20px 0 20px;
  ${breakpoint.xs} {
    padding: 35px 30px 0 30px;
  }
  .label {
    font-size: 12px;
    letter-spacing: 0px;
    color: ${colors.textColorSecondary};
    margin-top: 30px;
    ${breakpoint.sm} {
      font-size: 14px;
    }
  }
  .ant-form {
    .ant-form-item {
      .ant-input-affix-wrapper-status-error .ant-input-prefix {
        color: ${colors.textColor};
      }
      .ant-input {
        height: 50px;
        ${breakpoint.sm} {
          height: 65px;
        }
      }
    }
    .ant-form-item:nth-child(2) .ant-input {
      height: 70px !important;
      ${breakpoint.sm} {
        height: 85px !important;
      }
    }
  }
`;
