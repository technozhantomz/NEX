import { Input, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const DepositHeader = styled.p`
  margin-left: 10px;
  margin-top: 7px;
  color: ${colors.textColor};
  text-align: center;
  font: normal normal medium 16px/20px Inter;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 16px;
  ${breakpoint.sm} {
    margin-top: 3px;
  }
`;

export const AddressDownloadLink = styled.a`
  color: ${colors.primaryColor};
  text-align: center;
  font: normal normal normal 16px/40px Inter;
  letter-spacing: 0px;
  opacity: 1;
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
  background: ${colors.textColor} 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  opacity: 1;
  text-align: left;
  padding: 10px;

  ${breakpoint.sm} {
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

export const AddressLinkContainer = styled.div`
  margin-top: 15px;
  text-align: center;
`;

export const AddressContainer = styled.div`
   {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    text-align: center;
  }
`;

export const IconDiv = styled.div``;
