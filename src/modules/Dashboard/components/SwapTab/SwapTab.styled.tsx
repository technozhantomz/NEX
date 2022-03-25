import {
  Button,
  CardFormButton,
  styled,
  Form as swapForm,
  Tooltip as tooltip,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const FormButton = styled(CardFormButton)``;

export const SwapContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: ${colors.textColor};
  font-size: 20px;
  width: 600px;
  margin: 10px;
  padding: 30px 10px 10px;
  text-align: center;
  .ant-form {
    width: 90%;
    margin: 0 auto;
  }
`;

export const SwapForm = styled(swapForm)``;
export const InfoDiv = styled.div`
  text-align: right;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: ${colors.textColorSecondary};
  opacity: 1;
  margin-right: 30px;
`;
export const InfoPara = styled.p`
  @media (max-width: 500px) {
    font-size: 12px;
  }
  font-size: 16px;
  .anticon {
    color: var(--ant-warning-color);
    margin-left: 20px;
  }
`;

export const FooterPara = styled.p`
  width: 55%;
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  margin-left: 30px;
  margin-top: 30px;
`;
export const HistoryLinkDiv = styled.div`
  margin-top: 30px;
  backgroundcolor: red;
`;

export const HistoryLink = styled.a`
  font: normal normal normal 16px/20px Inter;
  letter-spacing: 0px;
  color: #0a48be;
  opacity: 1;
`;

export const SwapFormItem = styled(swapForm.Item)`
   {
    width: 100%;
    margin-bottom: 0;
    .ant-form-item-has-error
      .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: none !important;
    }
  }
`;

export const SwapItem = styled(swapForm.Item)`
  .ant-input-affix-wrapper {
    height: 65px;
    background: ${colors.white} 0% 0% no-repeat padding-box;
    border: 1px solid ${colors.borderColorBase};
    border-radius: 4px;
    opacity: 1;
    .ant-input-prefix {
      min-width: 135px;
      width: 33%;
    }
    .ant-input {
      text-align: right;
    }
  }
  z-index: 1;
`;

export const SwapSellItem = styled(SwapItem)`
  margin: 0;
  margin-bottom: 20px;
`;

export const SwapButton = styled(Button)`
  position: absolute;
  z-index: 2;
  margin: 55px auto 0;
  height: 40px;
`;

export const Tooltip = styled(tooltip)`
  margin-left: 30px;
`;
export const TooltipPara = styled.p`
  color: ${colors.white};
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: ${colors.textColor};
  opacity: 1;
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;
