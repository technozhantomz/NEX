import { LogoSelectOption } from "../../../../common/components";
import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";

export const LogoSelect = styled(LogoSelectOption)`
  height: 50px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  ${mixIns.borderRadius}
  opacity: 1;
  max-width: 95%;
  display: flex;
  align-items: center;
  margin: 25px 20px;
  ${breakpoint.sm} {
    height: 65px;
    margin: 35px 30px;
  }
`;

export const DepositFormContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  ${mixIns.borderRadius}
  opacity: 1;
  font-size: 25px;
  text-align: center;
  width: 600px;
  margin: 10px;
  padding: 10px;
  .ant-form {
    width: 90%;
    margin: 0 auto;
    .ant-input {
      height: 62px;
    }
  }
`;

export const AddressGeneratedContainer = styled.div`
  margin: 0px 20px 15px 20px;
  ${breakpoint.sm} {
    margin: 0px 30px 25px 30px;
  }
`;

export const HIVEDepositContainer = styled.div``;
