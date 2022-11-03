import { CardForm, Select, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
// import { CardForm, CardFormButton, Form, Input, styled } from "../../../ui/src";

const { Option } = Select;

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
      padding: 15px 30px !important;
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
export const BlockchainSelector = styled(Select)``;
export const BlockchainOptionWrapper = styled.div`
  height: 50px;
`;
export const BlockchainOption = styled(Option)``;
export const IconWrapper = styled.div``;

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
