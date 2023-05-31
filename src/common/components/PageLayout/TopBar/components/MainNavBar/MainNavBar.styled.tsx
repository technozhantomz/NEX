import {
  styled,
  Avatar as UiAvatar,
  Button as UiButton,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
import { mixIns } from "../../../../../../ui/src/mixins";

export const MainNavBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: ${colors.white};
  .hambuger {
    font-size: 2.4em;
    font-weight: bold;
    margin-left: 8px;
  }
  .ant-avatar {
    background: ${colors.successTag};
    margin-left: 8px;
  }
  .ant-badge-dot {
    width: 8px;
    min-width: 6px;
    height: 8px;
    box-shadow: none;
    transform: translate(-80%, 70%);
  }

  .ant-avatar.ant-avatar-circle.ant-avatar-icon {
    background: bottom;
  }

  .ant-avatar.ant-avatar-icon {
    margin-top: 1.5px;
  }
  .bell {
    font-size: 1.2em;
    font-weight: bold;
    margin-right: 10px;
  }
`;

export const MenuWrapper = styled.div`{
  cursor: pointer;
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  color: ${colors.textColor};
  z-index: 1100;
  padding-top: 95px;
  &.open{
    display: block;
    flex-direction: column;
  }
  ${breakpoint.sm} {
      position: absolute;
      top:75px;
      height: inherit;
      width: 210px;
      background: transparent;
      padding-top: 0;
      &.main-menu-wrapper{
          right:32px;
      }
      &.profile-wrapper{
          right:60px;
      }
      &.notification-menu-wrapper{
          right:110px;
          width:325px;
          min-height:311px;
          ${mixIns.borderRadius}
      }
  }
`;

export const CloseButton = styled(UiButton)`
  color: ${colors.textColor};
  position: absolute;
  top: 8px;
  right: 0;
  z-index: 9999;
  text-align: center;
  margin: 50px 25px 0 20px;
  ${breakpoint.sm} {
    display: none;
  }
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${breakpoint.sm} {
    display: none;
  }
`;

export const MainNavBarAvatar = styled(UiAvatar)`
  cursor: pointer;
`;

export const PeerLinkBadgeWrapper = styled.div`
  display: flex;
`;

export const PeerLinkWalletBadge = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  ${mixIns.borderRadius}
  background-color: ${colors.successTag};
  margin-right: 14px;
  ${breakpoint.sm} {
    padding: 12px 21px;
    margin-right: 20px;
  }
`;

export const PeerLinkWalletAccount = styled.span`
  max-width: 77px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.textColor};
  font-size: 16px;
  font-weight: 400;
  margin-left: 13px;
`;
