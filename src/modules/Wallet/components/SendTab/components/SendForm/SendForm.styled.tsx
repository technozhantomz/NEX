import {
  CardForm,
  CardFormButton,
  Form,
  Input,
  Option,
  Select,
  styled,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

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

export const MemoWrapper = styled.div`
  margin-bottom: 15px;
`;
export const MemoFormItem = styled(Form.Item)`
  .ant-form-item-control-input-content {
    height: 65px;
  }
`;

export const Memo = styled(Input.TextArea)`
  resize: none;
  scroll: auto;
  height: 100% !important;
`;

export const TransferFormButton = styled(CardFormButton)`
  height: 100%;
  ${breakpoint.sm} {
    width: 290px;
  }
`;

export const FormItem = styled(CardForm.Item)`
  margin-left: auto;
  margin-right: auto;
  .ant-form-item-control-input-content {
    height: 35px;
  }
  .ant-btn-lg {
    padding: 0px;
  }
  ${breakpoint.sm} {
    .ant-form-item-control-input-content {
      height: 45px;
    }
  }
`;

export const TransactionDetails = styled.div`
  margin-bottom: 24px;
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
