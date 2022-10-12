import { Button } from "antd";

import { FormDisclamer as UiFormDisclamer } from "../../../../common/components";
import { LoadingOutlined, styled, Form as swapForm } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const SwapContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  text-align: center;
  font-size: 20px;
  width: 600px;
  margin: 10px;
  padding: 25px 20px 0 20px;
  ${breakpoint.sm} {
    padding: 35px 30px 0 30px;
  }
`;

export const SwapForm = styled(swapForm)`
  .ant-input-affix-wrapper-status-error .ant-input-prefix {
    color: inherit;
  }
  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: transparent !important;
  }
  .ant-form-item-with-help .ant-form-item-explain {
    display: none;
  }
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:hover {
    border-color: ${colors.borderColorBase};
  }
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper-focused {
    box-shadow: unset;
  }
  .ant-form-item .ant-form-item-margin-offset {
    margin-bottom: -24px !important;
  }
`;

export const SwapItem = styled(swapForm.Item)`
  .ant-input-affix-wrapper {
    background: ${colors.white} 0% 0% no-repeat padding-box;
    ${mixIns.borderRadius}
    min-height: 65px;
    .ant-input-prefix {
      min-width: 200px;
      ${breakpoint.sm} {
        min-width: 240px;
      }
      width: fit-content;
    }
    .ant-input {
      text-align: right;
      direction: ltr;
    }
    ${breakpoint.sm} {
      min-height: 85px;
    }
  }
  z-index: 1;
`;

export const SwapSellItem = styled(SwapItem)`
  margin: 0;
  margin-bottom: 24px;
`;

export const AssetSelectContainer = styled.div`
  width: 100%;
  margin-bottom: 0;
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0;
  }
`;

export const Balance = styled.div`
  text-align: left;
  padding-left: 40px;
  font-size: 14px;
`;

export const SwapButtonFormItem = styled(swapForm.Item)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;

export const SwapButton = styled(Button)`
  transform: rotate(90deg);
  position: absolute;
  z-index: 2;
  margin-top: 60px;
  ${breakpoint.sm} {
    margin-top: 80px;
  }
`;

export const PriceContainer = styled.div`
  text-align: right;
  font-size: 14px;
  color: ${colors.textColorSecondary};
  margin-bottom: 24px;
  min-height: 22px;
  .anticon {
    margin-left: 16px;
    svg {
      color: ${colors.warningColor};
    }
  }
`;

export const PriceLoadingOutlined = styled(LoadingOutlined)`
  margin-right: 4px;
`;

export const FormDisclamer = styled(UiFormDisclamer)`
  margin-top: 25px;
  ${breakpoint.sm} {
    margin-top: 35px;
  }
`;
