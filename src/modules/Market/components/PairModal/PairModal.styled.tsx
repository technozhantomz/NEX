import {
  styled,
  CardFormButton as UIButton,
  CardForm as UIForm,
  Modal as UIModal,
} from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const PairModal = styled(UIModal)`
  border-radius: 4px;
  ${breakpoint.md} {
    min-width: 600px;
  }
  .ant-modal-content {
    border-radius: 4px;
  }
  .ant-modal-header {
    padding: 35px 30px;
    border-radius: 4px;
    border-bottom: unset;
    margin-bottom: 20px;
    .ant-modal-title {
      font-size: 18px;
      ${breakpoint.sm} {
        font-size: 22px;
      }
    }
  }
  .ant-modal-close {
    top: 16px;
    right: 5px;
    color: ${colors.headingColor};
    font-weight: bolder;
  }
  .ant-modal-body {
    padding: 0 30px;
    margin-bottom: 60px;
  }
  .ant-modal-footer {
    border-top: unset;
    .ant-btn + .ant-btn:not(.ant-dropdown-trigger) {
      margin-left: auto;
    }
    .ant-btn:first-child {
      margin-bottom: 8px;
    }
    .ant-btn:last-child {
      margin-bottom: 16px;
    }
    .ant-btn[disabled],
    .ant-btn[disabled]:hover,
    .ant-btn[disabled]:focus,
    .ant-btn[disabled]:active {
      background: unset;
    }
    .cancel {
      border: unset;
      color: ${colors.linkColor};
    }
  }
`;
export const PairModalForm = styled(UIForm)`
  ${breakpoint.sm} {
    .ant-form-item-control-input-content {
      height: 45px;
    }
    .ant-select,
    .ant-select-selector {
      height: 100% !important;
    }
    .ant-select-selector {
      display: flex;
      align-items: center;
    }
    .ant-input-affix-wrapper {
      height: 100%;
      align-items: center;
    }
  }
  .ant-form-item {
    margin-bottom: 16px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-radius: 4px;
  }
`;
export const PairModalFormButton = styled(UIButton)``;
