import styled from "styled-components";

import { colors } from "./colors";
import { mixIns } from "./mixins";

export const Tag = styled.span`
  background: ${colors.successTag};
  color: ${colors.textColor};
  border: none;
  ${mixIns.borderRadius}
  padding: 5px 21px;
`;
