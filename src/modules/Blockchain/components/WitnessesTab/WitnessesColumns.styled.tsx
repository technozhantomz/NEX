import { LinkOutlined, styled } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const LastBlock = styled.span`
  color: ${colors.successColor};
`;
export const MissedBlocks = styled.span`
  color: ${colors.missedColor};
`;

export const urlIcon = styled(LinkOutlined)`
  color: ${colors.linkColor};
`;
