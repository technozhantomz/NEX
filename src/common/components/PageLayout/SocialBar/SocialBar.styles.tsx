import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const SocialBarWrapper = styled.div`
  position: fixed;
  bottom: 51px;
  width: 100%;
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 265px;
  margin: 0 auto;
  ${breakpoint.sm} {
    max-width: 596px;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  .anticon {
    color: ${colors.white};
    font-size: 30px;
    margin-right: 11px;
  }
  .link-text {
    display: none;
    color: ${colors.white};
    ${breakpoint.sm} {
      display: block;
    }
  }
`;
