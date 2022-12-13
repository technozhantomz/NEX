import styled from "styled-components";

import { Modal } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
import { mixIns } from "../../../../../../ui/src/mixins";

export const ChoiceModal = styled(Modal)`
  ${mixIns.borderRadius}
  ${breakpoint.md} {
    min-width: 600px;
  }
  .ant-modal-content {
    ${mixIns.borderRadius}
  }
  .ant-modal-header {
    padding: 35px 30px;
    ${mixIns.borderRadius}
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
