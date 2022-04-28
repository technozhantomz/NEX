import { Input, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";
import { mixIns } from "../../../ui/src/mixins";

export const DepositHeader = styled.p`
  margin-left: 10px;
  margin-bottom: 0;
  color: ${colors.textColor};
  font-size: 16px;
`;

export const AddressDownloadLink = styled.a`
  color: ${colors.primaryColor};
  font: normal normal normal 14px/40px Inter;
  ${breakpoint.xs} {
    font: normal normal normal 16px/40px Inter;
  }
`;

export const DisclaimerFooter = styled.p`
  color: ${colors.textColor};
  text-align: left;
  letter-spacing: 0px;
  opacity: 1;
  font: normal normal normal 12px/20px Inter;
  max-width: 100%;
  ${breakpoint.sm} {
    font: normal normal normal 14px/20px Inter;
  }
`;

export const GeneratedBitcoinAddress = styled(Input)`
  height: 50px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  padding: 10px;
  margin-bottom: 15px;
  ${breakpoint.sm} {
    margin-bottom: 25px;
    width: 100%;
  }
  .ant-input.ant-input-disabled.ant-input-sm {
    font-size: 12px;
    ${breakpoint.sm} {
      font-size: 14px;
    }
  }
`;

export const InfoBox = styled.div`
   {
    display: flex;
  }
  .anticon svg {
    height: 15px;
    margin-right: 10px;
    color: var(--ant-warning-color);
    ${breakpoint.sm} {
      margin-right: 15px;
    }
  }
`;

export const AddressLinkContainer = styled.div``;

export const AddressContainer = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
    ${breakpoint.xs} {
      margin-bottom: 35px;
    }
  }
`;

export const IconDiv = styled.div`
  display: flex;
`;
