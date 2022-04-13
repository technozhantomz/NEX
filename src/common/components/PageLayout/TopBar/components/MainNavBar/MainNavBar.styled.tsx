import { styled, Avatar as UiAvatar } from "../../../../../../ui/src";
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
  }
  .close{
      color: ${colors.textColor};
      position: relative;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      margin: 30px 20px 0 0;
  }
  ${breakpoint.xs} {
      position: absolute;
      top:75px;
      height: inherit;
      width: 210px;
      background: transparent;
      .close{
          display: none;
      }
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

export const MainNavBarAvitar = styled(UiAvatar)``;
