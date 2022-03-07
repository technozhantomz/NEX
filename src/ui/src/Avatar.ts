import { Avatar as AntdAvatar } from "antd";
import styled from "styled-components";

import { colors } from "./colors";

export const Avatar = styled(AntdAvatar)`
  .ant-avatar-string {
    color: ${colors.textColor};
  }
`;
