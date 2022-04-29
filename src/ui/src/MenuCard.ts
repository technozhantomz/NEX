import { Card as AntdCard } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

export const MenuCard = styled(AntdCard)`
   {
    height: 93%;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        ${mixIns.hairline}
        padding: 0 0 10px 0;
        margin: 10px 0 0 0;
      }
    }
    .menu-item {
      display: flex;
      justify-content: space-between;
      color: ${colors.textColor};
      &.active {
        .menu-icon {
          color: ${colors.primaryColor};
        }
      }
    }
    .menu-icon {
      color: ${colors.borderColorBase};
    }
    .advanced {
      border: none;
      margin: 30px 0;
      padding: 0;
      border: none;
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
  }
  ${breakpoint.xs} {
    height: inherit;
    .ant-card-body {
      padding: 20px;
    }
    ul {
      li {
        border-bottom: none;
      }
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
