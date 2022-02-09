import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const MainNavBar = styled.div`
   {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: var(---white);
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
  background: var(---white);
  color: var(---text-color);
  z-index: 2;
  &.open{
      display: block;
  }
  .close{
      color: var(---text-color);
      position: relative;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      margin: 30px 20px 0 0;
  }
  ${breakpoint.xs} {
      .close{
          display: none;
      }
      &.main-menu-wrapper{
          position: absolute;
          top:75px;
          right:32px;
          height: inherit;
          width: 210px;
      }
      &.profile-wrapper{
          position: absolute;
          top:75px;
          right:60px;
          height: inherit;
          width: 210px;
      }
      &.notification-menu-wrapper{
          position: absolute;
          top:75px;
          right:110px;
          height: inherit;
          width: 210px;
      }
  }
`;