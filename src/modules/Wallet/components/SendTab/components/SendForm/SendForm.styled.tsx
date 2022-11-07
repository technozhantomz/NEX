import { CardForm, Option, Select, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
// import { CardForm, CardFormButton, Form, Input, styled } from "../../../ui/src";

export const SendForm = styled(CardForm)`
  margin: 0 0 20px 0;

  .ant-form-item {
    margin-bottom: 15px;
    ${breakpoint.sm} {
      margin-bottom: 0;
    }
    input {
      height: 50px;
    }
    .ant-select-selector {
      height: 50px !important;
      border-radius: 4px !important;
      display: flex;
      align-items: center;
      padding: 0px 30px !important;
    }
    .ant-select-selection-item {
      height: 100% !important;
      display: flex;
      align-items: center;
    }
    .ant-input-lg {
      padding: 15px 30px;
    }
  }

  ${breakpoint.sm} {
    .two-input-row {
      margin-bottom: 15px;
      display: flex;
      .ant-form-item {
        flex-grow: 1;
        width: 50%;
      }
      .ant-form-item:first-child {
        margin-right: 15px;
      }
    }
  }
`;

export const AssetSelector = styled(Select)``;
export const AssetOption = styled(Option)``;

export const AvailableAssetWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
`;
export const AvailableAssetLabel = styled.div`
  color: ${colors.textColorSecondary};
  font-size: 14px;
  margin-right: 4px;
`;
export const AvailableAssetAmount = styled.div`
  color: ${colors.textColor};
  font-size: 14px;
`;

export const BlockchainSelector = styled(Select)``;
export const BlockchainOption = styled(Option)``;
export const contentWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100% !important;
`;
export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

// export const TransferFormButton = styled(CardFormButton)`
//   width: 100%;
//   height: 100%;
// `;

// export const FormItem = styled(CardForm.Item)`
//   width: 255px;
//   margin-left: auto;
//   margin-right: auto;
//   .ant-form-item-control-input-content {
//     height: 35px;
//   }
//   .ant-btn-lg {
//     padding: 0px;
//   }
//   ${breakpoint.sm} {
//     margin-left: 245px;
//     width: 290px;
//     .ant-form-item-control-input-content {
//       height: 45px;
//     }
//   }
// `;

// export const MemoFormItem = styled(Form.Item)`
//   ${breakpoint.sm} {
//     .ant-form-item-control-input-content {
//       height: 60px;
//     }
//   }
// `;

// export const Memo = styled(Input.TextArea)`
//   resize: none;
//   scroll: auto;
// `;
