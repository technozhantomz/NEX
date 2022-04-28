import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const Button = styled(CardFormButton)``;

export const WithdrawContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  opacity: 1;
  color: ${colors.textColor};
  font-size: 20px;
  width: 600px;
  margin: 10px;
  padding: 30px 10px 10px;
  .label {
    font-size: 12px;
    letter-spacing: 0px;
    color: #6c6c6c;
    opacity: 1;
    margin-top: 30px;
    ${breakpoint.xs} {
      font-size: 14px;
    }
  }
  .ant-form {
    width: 90%;
    margin: 0 auto;
    .ant-input {
      height: 62px;
    }
  }
`;
