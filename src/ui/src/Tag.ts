import styled from "styled-components";

import { colors } from "./colors";
import { mixIns } from "./mixins";

export interface ITag {
  bgColor?: string;
  color?: string;
}

export const Tag = styled.span<ITag>`
  background: ${(props: ITag) =>
    props.bgColor ? props.bgColor : colors.successTag};
  color: ${(props: ITag) => (props.color ? props.color : colors.textColor)};
  border: none;
  ${mixIns.borderRadius}
  padding: 5px 21px;
`;
