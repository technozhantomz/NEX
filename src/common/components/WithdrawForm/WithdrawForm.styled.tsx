import { CardFormButton, CardFrom, styled } from "../../../ui/src";

export const WithdrawForm = styled(CardFrom)`
  margin: 0 20px;
`;
export const WithdrawFormAssetAmount = styled(CardFrom.Item)`
  .ant-input-affix-wrapper {
    padding: 0;
    .ant-input-prefix {
      min-width: 135px;
      width: 33%;
    }
    .ant-input {
      text-align: right;
    }
  }
`;
export const WithdrawFormAsset = styled(CardFrom.Item)`
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
export const WithdrawFormButton = styled(CardFormButton)``;
