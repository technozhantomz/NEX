import { GenerateBitcoinAddress as UiGenerateBitcoinAddress } from "../../../../common/components";
import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const AssetTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  .ant-list-item-meta {
    flex: unset;
  }
`;

export const GenerateBitcoinAddress = styled(UiGenerateBitcoinAddress)`
  .ant-form-item {
    width: 100%;
    margin: 0 !important;
    ${breakpoint.sm} {
      width: 350px;
    }
  }
`;

export const BtcNotAssociated = styled.div`
  font-size: 14px;
  color: ${colors.textColorSecondary};
  margin-bottom: 24px;
`;

export const ReceiveTabWrapper = styled.div`
  margin: 14px 20px 15px 20px;
  ${breakpoint.sm} {
    margin: 14px 25px 20px 25px;
  }
  .no-margin {
    margin: 0;
  }
`;
export const ReceiveInstructionWrapper = styled.div`
  min-height: 300px;
  max-width: 540px;
  margin-bottom: 36px;
`;

export const Header = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 16px;
  ${breakpoint.sm} {
    margin-bottom: 20px;
  }
`;

export const BTCDepositInstructionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    margin-bottom: 35px;
  }
  margin-left: 11px;
`;

export const BTCIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const BTCDepositInstruction = styled.div`
  color: ${colors.textColor};
  font-size: 14px;
`;
