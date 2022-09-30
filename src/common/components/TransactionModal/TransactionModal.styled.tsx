import { CardForm, CardFormButton, Modal, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const TransactionModal = styled(Modal)`
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
    margin-bottom: 25px;
    .ant-modal-title {
      font-size: 18px;
      ${breakpoint.sm} {
        font-size: 24px;
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
    margin-bottom: 100px;
  }
  .ant-modal-footer {
    border-top: unset;
    .ant-btn + .ant-btn:not(.ant-dropdown-trigger) {
      margin-x: auto;
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
export const TransactionModalForm = styled(CardForm)``;
export const TransactionModalFormButton = styled(CardFormButton)``;

export const TransactionError = styled.span`
  color: ${colors.errorColor};
`;

export const TransactionSuccess = styled.span`
  color: ${colors.successColor};
`;

export const TransactionType = styled.span`
  margin-bottom: 15px;
  font-weight: bold;
  font-size: 16px;
`;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  word-break: break-word;
  margin-bottom: 12px;
  a {
    font-style: italic;
  }
`;
