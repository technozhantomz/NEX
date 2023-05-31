import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const SendTabWrapper = styled.div`
  margin: 14px 20px 15px 20px;
  ${breakpoint.sm} {
    margin: 14px 25px 20px 25px;
  }
  .no-margin {
    margin: 0;
  }
`;

export const SendFormWrapper = styled.div`
  max-width: 710px;
  margin-bottom: 40px;
  ${breakpoint.sm} {
    margin-bottom: 60px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  ${breakpoint.sm} {
    margin-bottom: 20px;
  }
`;

export const Header = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

export const ClearForm = styled.div`
  font-size: 14px;
  color: ${colors.linkColor};
`;
