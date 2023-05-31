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
  .ant-input-group.ant-input-group-compact {
    display: flex;
  }
  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border-color: transparent !important;
  }
  .ant-form-item-explain {
    display: none;
  }

  .ant-form-item .ant-form-item-margin-offset {
    margin-bottom: -24px !important;
  }

  .ant-input-group.ant-input-group-compact {
    display: flex;
    align-items: center;
    height: 70px;
    border: 1px solid ${colors.borderColorBase};
    border-radius: 4px;
    ${breakpoint.sm} {
      height: 85px;
    }
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input:focus,
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input-focused,
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input,
    .ant-input-status-error:not(.ant-input-disabled):not(
        .ant-input-borderless
      ).ant-input:hover {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-input {
      border: none;
      box-shadow: none;
      text-align: right;
      direction: ltr;
      padding-right: 30px;
    }
    .ant-input[disabled] {
      background-color: unset;
    }
  }
`;

export const SwapItem = styled(swapForm.Item)`
  .ant-input-affix-wrapper {
    background: ${colors.white} 0% 0% no-repeat padding-box;
    ${mixIns.borderRadius}
    min-height: 65px;

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
  margin-bottom: 0;
  min-width: 200px;
  ${breakpoint.sm} {
    min-width: 240px;
  }
  width: fit-content;
  .ant-select {
    width: 100%;
  }
`;

export const Balance = styled.div`
  text-align: left;
  font-size: 14px;
  padding-left: 15px;
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
  margin-top: 66px;
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

export const FeeInfo = styled.div`
  font-size: 12px;
  ${breakpoint.sm} {
    font-size: 14px;
  }
  margin-bottom: 20px;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  font-size: 12px;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const DetailsLabelWrapper = styled.div`
  min-width: 150px;
`;

export const AmountsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionDetails = styled.div`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
  text-align: left;
`;
