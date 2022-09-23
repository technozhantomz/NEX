import { styled } from "../../../../ui/src/";
import { colors } from "../../../../ui/src/colors";

export const Footer = styled.div`
  // position: fixed;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  // height: 36px;
`;

export const ConnectionStatusWrapper = styled.div`
  padding: 8px 32px;
`;

export const NoSync = styled.span`
  color: ${colors.errorColor};
  padding-right: 8px;
`;

export const NotConnected = styled.span`
  color: ${colors.white};
`;
