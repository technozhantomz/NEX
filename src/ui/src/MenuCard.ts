import { Card as AntdCard } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

export const MenuCard = styled(AntdCard)`
  height: 93%;
  overflow-y: auto;
  ${mixIns.borderRadius}
  .ant-card-body > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 0 25px 10px;
      margin: 10px 0 0 0;
    }
    li:not(:last-child) {
      ${mixIns.hairline}
    }
  }
  .menu-item {
    display: flex;
    font-weight: 500;
    justify-content: space-between;
    color: ${colors.textColor};
    &.active {
      .menu-icon {
        color: ${colors.primaryColor};
        fill: ${colors.primaryColor};
      }
      .menu-icon g {
        color: ${colors.primaryColor};
        fill: ${colors.primaryColor};
      }
    }
  }
  .menu-icon {
    color: ${colors.borderColorBase};
    margin-right: 20px;
    &.avitar {
      height: 15px;
      width: 15px;
      background: ${colors.borderColorBase};
      color: ${colors.white};
      border-radius: 50%;
      svg {
        padding: 2px;
      }
    }
  }
  .advanced {
    display: flex;
    align-items: center;
    border: none;
    margin: 30px 0;
    padding: 0 15px 0;
    border: none;
    .ant-switch {
      margin-right: 10px;
    }
  }
  .logout {
    position: absolute;
    bottom: 40px;
    border: none;
  }
  .link {
    margin-top: 25px;
    border: none;
  }

  ${breakpoint.sm} {
    height: inherit;
    .ant-card-body {
      padding: 20px;
    }
    .ant-card-body > ul {
      li {
        border-bottom: none !important;
        padding: 0 0 10px 0;
      }
    }
    .menu-item {
      font-weight: 300;
    }
    .menu-item-arrow {
      display: none;
    }
    .advanced {
      border: none;
      margin: 10px 0 30px 0;
      padding: 0;
      border: none;
    }
    .logout {
      position: relative;
      bottom: 0;
    }
    .link {
      margin-top: 0;
    }
  }
`;
