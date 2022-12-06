import {
  styled,
  CardFormButton as UIButton,
  CardForm as UIForm,
  Modal as UIModal,
} from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const PasswordModal = styled(UIModal)`
  border-radius: 4px;
  .ant-modal-content {
    border-radius: 4px;
  }
  .ant-modal-content {
    border-radius: 4px;
  }
  ${breakpoint.md} {
    min-width: 600px;
  }
  .ant-modal-header {
    padding: 35px 30px;
    border-radius: 4px;
    border-bottom: unset;
    ${breakpoint.sm} {
      margin-bottom: 20px;
    }
    .ant-modal-title {
      font-size: 18px;
      margin-right: 8px;
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
    padding: 0 30px 26px 30px;
  }
`;
export const PasswordModalForm = styled(UIForm)`
  ${breakpoint.sm} {
    .ant-form-item-control-input-content {
      height: 45px;
    }
    .ant-input {
      height: 100%;
      padding: 15px 30px;
    }
    .ant-input-affix-wrapper {
      height: 100%;
      align-items: center;
    }
  }
`;
export const PasswordModalFormButton = styled(UIButton)``;
