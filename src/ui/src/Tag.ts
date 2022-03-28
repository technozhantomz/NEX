import { Tag as AntdTag } from "antd";
import styled from "styled-components";

import { colors } from "./colors";

export const Tag = styled(AntdTag)`
  background: ${colors.successTag};
  color: ${colors.textColor};
  border: none;
  border-radius: 4px;
  padding: 5px 21px;
`;
