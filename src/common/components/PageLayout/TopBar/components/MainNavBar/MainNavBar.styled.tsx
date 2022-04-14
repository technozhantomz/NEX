import {
  styled,
  Avatar as UiAvatar,
  Button as UiButton,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";

export const MainNavBar = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: ${colors.white};
    .hambuger {
      font-size: 2em;
      font-weight: bold;
      margin-left: 10px;
    }
    .bell {
      font-size: 1.2em;
      font-weight: bold;
      margin-right: 20px;
    }
  }
`;

export const MenuWrapper = styled.div`{
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${colors.white};
  color: ${colors.textColor};
  z-index: 2;
  &.open{
    display: block;
    flex-direction: column;
  }
  ${breakpoint.xs} {
      position: absolute;
      top:75px;
      height: inherit;
      width: 210px;
      background: transparent;
      &.main-menu-wrapper{
          right:32px;
      }
      &.profile-wrapper{
          right:60px;
      }
      &.notification-menu-wrapper{
          right:110px;
      }
  }
`;

export const CloseButton = styled(UiButton)`
  color: ${colors.textColor};
  position: relative;
  text-align: center;
  margin: 20px 20px 0 20px;
  ${breakpoint.xs} {
    display: none;
  }
`;

export const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${breakpoint.xs} {
    display: none;
  }
`;

export const MainNavBarAvitar = styled(UiAvatar)``;
