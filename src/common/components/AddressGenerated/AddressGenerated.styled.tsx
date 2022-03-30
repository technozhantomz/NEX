import { Input, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";
import { colors } from "../../../ui/src/colors";

export const DepositHeader = styled.p`
  margin-left: 10px;
  margin-top: 3px;
  color: ${colors.textColor};
  text-align: center;
  font: normal normal medium 16px/20px Inter;
  letter-spacing: 0px;
  opacity: 1;
  font-size: 16px;
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
  font: normal normal normal 14px/20px Inter;
  letter-spacing: 0px;
  opacity: 1;
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
`;

export const InfoBox = styled.div`
   {
    display: flex;
    margin: 10px;
  }
  .anticon {
    color: var(--ant-warning-color);
    margin-right: 20px;
    margin-left: 20px;

    ${breakpoint.sm} {
      margin-right: 5px;
      margin-left: 5px;
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
