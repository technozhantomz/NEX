import styled from "styled-components";

import { breakpoint } from "./breakpoints";
import { colors } from "./colors";
import { mixIns } from "./mixins";

type Props = {
  bgColor?: string;
  color?: string;
};

export const Tag = styled.span<Props>`
  background: ${(props) => (props.bgColor ? props.bgColor : colors.successTag)};
  color: ${(props) => (props.color ? props.color : colors.textColor)};
  border: none;
  ${mixIns.borderRadius}
  padding: 5px 21px;
  white-space: normal;
  display: inline-block;
  text-align: center;
  ${breakpoint.sm} {
    white-space: nowrap;
  }
`;
