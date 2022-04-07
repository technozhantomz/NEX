import { LinkOutlined, styled } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const LastBlock = styled.p`
  color: ${colors.successColor};
`;
export const MissedBlocks = styled.p`
  color: ${colors.missedColor};
`;

export const urlIcon = styled(LinkOutlined)`
  color: ${colors.additionalBlue};
`;
