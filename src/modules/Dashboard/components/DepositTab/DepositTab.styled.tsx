import { LogoSelectOption } from "../../../../common/components";
import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const DepositFormContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  font-size: 25px;
  width: 600px;
  padding: 25px 20px;
  margin: 10px;
  ${breakpoint.xs} {
    padding: 35px 30px;
  }
  .ant-form {
    width: 90%;
    margin: 0 auto;
    .ant-input {
      height: 50px;
      ${breakpoint.sm} {
        height: 65px;
      }
    }
  }
`;

export const LogoSelect = styled(LogoSelectOption)`
  height: 50px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  ${breakpoint.sm} {
    height: 65px;
    margin-bottom: 35px;
  }
`;

export const AddressGeneratedContainer = styled.div``;

export const HIVEDepositContainer = styled.div``;
