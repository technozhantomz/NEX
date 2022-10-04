import { styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const AddressDownloadLink = styled.a`
  color: ${colors.primaryColor};
  font-size: 14px;
  ${breakpoint.sm} {
    font-size: 16px;
  }
`;

export const DisclaimerFooter = styled.p`
  color: ${colors.textColorSecondary};
  text-align: left;
  font-size: 12px;
  max-width: 100%;
  margin-bottom: 0;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const InfoBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  .anticon {
    display: flex;
    align-items: center;
  }
  .anticon svg {
    height: 15px;
    margin-right: 10px;
    color: ${colors.warningColor};
    ${breakpoint.sm} {
      margin-right: 15px;
    }
  }
`;

export const AddressLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
