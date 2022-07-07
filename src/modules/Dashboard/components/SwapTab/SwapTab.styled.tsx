import { Button } from "antd";

import {
  styled,
  Form as swapForm,
  Tooltip as tooltip,
} from "../../../../ui/src";

export const SwapContainer = styled.div`
  background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  color: white;
  font-size: 20px;
  width: 600px;
  // height: 354px;
  margin: 10px;
  padding: 30px 10px 10px;
  text-align: center;
  .ant-form-item-explain {
    position: absolute;
    right: 20px;
    bottom: 0px;
  }
  .ant-form-item-with-help {
    margin-bottom: 24px !important;
  }
`;

export const SwapForm = styled(swapForm)`
  padding: 1rem;
`;
export const InfoDiv = styled.div`
  text-align: right;
  font: normal normal normal 14px/17px Inter;
  letter-spacing: 0px;
  color: #6c6c6c;
  opacity: 1;
  margin-right: 30px;
  // display:flex;
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
  color: var(---text-icons);
  text-align: left;
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
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
    background: var(---text-icons-ffffff) 0% 0% no-repeat padding-box;
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #c1c2c4;
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
  margin-bottom: 24px;
`;

export const button = styled(Button)`
  transform: rotate(90deg);
  position: absolute;
  z-index: 2;
  margin-top: 60px;
`;

export const Tooltip = styled(tooltip)`
  margin-left: 30px;
`;
export const TooltipPara = styled.p`
  padding: 1rem;
  padding-bottom: 0px;
  color: var(---text-icons);
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  color: #212121;
  opacity: 1;
  @media (max-width: 500px) {
    font-size: 11px;
  }
`;
