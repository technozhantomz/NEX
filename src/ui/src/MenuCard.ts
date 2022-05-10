import { Card as AntdCard } from "antd";
import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

export const MenuCard = styled(AntdCard)`
   {
    top: 25px;
    height: 93%;
    border-radius: 4px;
    opacity: 1;

    .ant-switch-small {
      margin-right: 8px;
    }

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
    }
    .menu-icon {
      color: ${colors.borderColorBase};
      margin-right: 20px;
    }
    .advanced {
      border: none;
      // margin: 30px 0;
      padding: 0;
      border: none;
    }
    .logout {
      // position: absolute;
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
