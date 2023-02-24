import { CardForm, CardFormButton, Form, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const WithdrawForm = styled(CardForm)`
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

export const WithdrawFormAsset = styled.div`
  width: 100%;
  margin-bottom: 0;
  min-width: 200px;
  ${breakpoint.sm} {
    min-width: 240px;
  }
  width: fit-content;
  .ant-select-status-error.ant-select:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    border: none;
  }
`;

export const WithdrawFormAssetAmount = styled(CardForm.Item)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;

export const WithdrawFormButton = styled(CardFormButton)`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;

export const FormItem = styled(Form.Item)`
  width: 255px;
  margin-left: auto;
  margin-right: auto;
  height: 35px;
  ${breakpoint.sm} {
    width: 399px;
    height: 44px;
  }
`;

export const ButtonFormItem = styled(FormItem)`
  margin-bottom: 0;
`;

export const Balance = styled.div`
  text-align: left;
  padding-left: 15px;
  font-size: 14px;
`;

export const WithdrawalInstruction = styled.div`
  display: flex;
  margin-bottom: 24px;
  span {
    color: ${colors.textColorSecondary};
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 14px;
    }
  }
`;

export const IconWrapper = styled.div`
  margin-right: 16px;
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
  margin-bottom: 24px;
`;

export const LoadingIndicatorContainer = styled.div`
  text-align: center;
  display: "flex";
  justifycontent: "center";
`;
