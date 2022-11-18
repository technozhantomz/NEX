import { Alert, Button, Divider as UiDivider } from "antd";

import { LogoSelectOption } from "../../../../common/components";
import {
  Card,
  styled,
  Form as transferForm,
  Col as UiCol,
  Row as UiRow,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const TransferCard = styled(Card)`
  max-width: 700px;
  min-height: 291px;
`;

export const Row = styled(UiRow)`
  justify-content: center;
  padding-left: 0px;
  padding-right: 0px;
  ${breakpoint.md} {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const FromCol = styled(UiCol)`
  width: 100%;
  justify-content: center;
  padding-bottom: 30px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-color: #c9c9c9;
  ${breakpoint.md} {
    padding-bottom: 25px;
    border-right-style: solid;
    border-right-width: 1px;
    border-bottom-width: 0;
    border-bottom-style: none;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const ToCol = styled(UiCol)`
  width: 100%;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 20px;
  ${breakpoint.sm} {
    padding-top: 30px;
    padding-left: 8px;
    padding-right: 8px;
  }
  ${breakpoint.md} {
    padding-top: 0px;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

export const Col = styled(UiCol)`
  justify-content: center;
  ${breakpoint.md} {
    padding-left: 0px;
    padding-right: 0px;
  }
  padding-bottom: 0px;
`;

export const SwapButton = styled(Button)`
  transform: rotate(90deg);
  position: absolute;
  z-index: 2;
  margin-top: 320px;
  background-color: ${colors.primaryColor};
  color: white;
  ${breakpoint.sm} {
    margin-top: 260px;
  }
  ${breakpoint.md} {
    margin-top: 10px;
    transform: rotate(0deg);
  }
`;

export const Heading = styled.p`
  text-align: center;
  color: ${colors.textColor};
  font-size: 22px;
  font-weight: 500;
  ${breakpoint.sm} {
    font-size: 18px;
  }
`;

export const SubHeading = styled.p`
  text-align: left;
  color: ${colors.textColorSecondary};
  font-size: 16px;
  margin-top: 5px;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const BodyText = styled.p`
  text-align: left;
  color: ${colors.textColor};
  font-weight: 400;
  font-size: 12px;
  margin-top: 5px;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const LeftSubText = styled.p`
  text-align: left;
  color: ${colors.textColorSecondary};
  font-size: 12px;
  margin-top: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
`;

export const RightSubText = styled.p`
  text-align: right;
  color: ${colors.textColorSecondary};
  font-size: 12px;
  margin-top: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
`;

export const SubTextContainer = styled(UiRow)`
  margin-top: 5px;
  ${breakpoint.md} {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const FeesContainer = styled.div`
  ${breakpoint.sm} {
    margin-top: 25px;
  }
`;

export const SpacedTextContainer = styled(UiRow)`
  justify-content: space-between;
  ${breakpoint.md} {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const LogoSelect = styled(LogoSelectOption)`
  height: 65px;
  width: 100%;
  font-size: 10px !important;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  background-size: 50%;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    background-size: 50%;
    height: 50px;
    margin-bottom: 15px;
  }
  svg {
    height: 60%;
  }
  span {
    font-size: 12px;
  }
`;

export const HIVETransferContainer = styled.div``;

export const TransferForm = styled(transferForm)`
  .ant-input-group.ant-input-group-compact {
    display: flex;
    padding: 4px 11px;
  }
  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: transparent !important;
  }
  .ant-form-item-explain {
    display: none;
  }

  .ant-form-item {
    margin-bottom: 0px;
    width: 100%;
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
      height: 50px;
    }
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:focus,
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input-focused,
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
    .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input:hover {
      border: none !important;
      box-shadow: none !important;
    }
    .ant-input {
      border: none;
      box-shadow: none;
      direction: ltr;
      padding-right: 30px;
      font-size: 16px;
      ${breakpoint.sm} {
        font-size: 20px;
      }
    }
  }
`;

export const TransferItem = styled(transferForm.Item)`
  .ant-input-affix-wrapper {
    background: ${colors.white} 0% 0% no-repeat padding-box;
    ${mixIns.borderRadius}
    min-height: 65px;

    ${breakpoint.sm} {
      min-height: 50px;
    }
  }
  z-index: 1;
`;

export const TransferInputItem = styled(TransferItem)`
  font-size: 14px;
  margin-bottom: 15px;
`;

export const AssetSelectContainer = styled.div`
  margin-bottom: 0;
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    padding: 0;
  }
  min-width: 200px;
  ${breakpoint.sm} {
    min-width: 240px;
  }
  width: fit-content;
  .ant-select {
    width: 100%;
  }
`;

export const TransferButtonFormItem = styled(transferForm.Item)`
  width: 100%;
  .ant-btn {
    height: 45px;
    width: 100%;
  }
  ${breakpoint.sm} {
    margin-top: 25px;
  }
`;

export const TransferLinkFormItem = styled(transferForm.Item)`
  width: 100%;
  margin-bottom: 15px;
  ${breakpoint.sm} {
    margin-top: 10px;
    margin-bottom: 25px;
  }

  span {
    font-size: 14px;
  }
`;

export const Divider = styled(UiDivider)`
  .ant-divider ant-divider-vertical {
    height: 100% !important;
  }
  ${breakpoint.sm} {
    .ant-divider ant-divider-vertical {
      height: 100% !important;
    }
  }
`;

export const MaxButton = styled(Button)`
  border: none;
`;

export const ErrorMessageContainer = styled(Row)`
  justify-content: center;
  padding-left: 0px;
  padding-right: 0px;
  ${breakpoint.md} {
    justify-content: start;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ErrorMessage = styled(Alert)`
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
`;
