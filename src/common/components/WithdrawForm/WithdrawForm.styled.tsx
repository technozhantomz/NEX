import { CardForm, CardFormButton, Form, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const WithdrawForm = styled(CardForm)`
  .form-input {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 20px;
    }
  }
`;

type AssetAmountProps = {
  withassetselector: boolean;
};

export const WithdrawFormAssetAmount = styled(CardForm.Item)<AssetAmountProps>`
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
  .ant-input-affix-wrapper {
    padding: 0;
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
      padding-right: 30px;
      font-size: 16px;
      ${breakpoint.sm} {
        font-size: 20px;
      }
      height: 70px !important;
      ${breakpoint.sm} {
        height: 85px !important;
      }
    }
    .ant-select-status-error.ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: transparent !important;
    }
  }
`;
export const WithdrawFormAsset = styled.div`
  width: 100%;
  margin-bottom: 0;
  &.ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: none !important;
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
  padding-left: 50px;
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
