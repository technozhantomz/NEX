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
  font-size: 14px;
  ${breakpoint.sm} {
    font-size: 16px;
  }
`;

export const DisclaimerFooter = styled.p`
  color: ${colors.textColor};
  text-align: left;
  font-size: 12px;
  max-width: 100%;
  margin-bottom: 0;
  ${breakpoint.sm} {
    font-size: 14px;
  }
`;

export const GeneratedBitcoinAddress = styled(Input)`
  height: 50px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  padding: 10px;
  margin-bottom: ${(props) => (!props.downloaded ? "25px" : "0px")};
  ${breakpoint.sm} {
    margin-bottom: ${(props) => (!props.downloaded ? "35px" : "0px")};
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
  display: flex;
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

export const AddressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
`;

export const IconDiv = styled.div`
  display: flex;
`;
