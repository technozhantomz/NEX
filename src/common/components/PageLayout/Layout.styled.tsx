import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const Page = styled.section`
   {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    font-weight: 300;
    color: ${colors.white};
    background: transparent
      radial-gradient(
        closest-side at 50% 50%,
        ${colors.primaryColor} 0%,
        #01245f 100%
      )
      0% 0% no-repeat padding-box;
    .top-bar {
      .dex-logo {
        display: none;
      }
    }
    &.dex-layout {
      background: #f4f4f4 0% 0% no-repeat padding-box;
      .top-bar {
        background-color: #01245f;
        .dex-logo {
          display: flex;
        }
      }
      .page-heading {
        color: ${colors.textColor};
        letter-spacing: 0px;
        font-size: 24px;
        font: normal normal medium 24px/29px Inter;
      }
    }
  }
`;

export const Layout = styled.main`
   {
    &.default {
      margin: 0;
    }
    &.card-layout,
    &.card-layout__lrg {
      margin: 0 5%;
      padding-bottom: 24px;
    }
    &.card-layout__lrg > .ant-card {
      min-height: 661px;
    }
    ${breakpoint.sm} {
      &.card-layout,
      &.card-layout__lrg {
        margin: 0 auto;
        padding-left: 16px;
        padding-right: 16px;
      }
      &.card-layout {
        max-width: 600px;
      }
      &.card-layout__lrg {
        max-width: 1070px;
      }
      &.card-layout__lrg > .ant-card {
        min-height: 856px;
      }
    }
  }
`;

export const PageHeading = styled.h1`
  color: ${colors.white};
  font-size: 20px;
  font-weight: 500;
  margin: 20px 0 15px;

  ${breakpoint.sm} {
    margin: 45px 0 45px;
    font-size: 24px;
  }
`;
