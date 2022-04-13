import { LogoSelectOption } from "../../../../common/components";
import { styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";

export const LogoSelect = styled(LogoSelectOption)`
  height: 65px;
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border: 1px solid ${colors.borderColorBase};
  border-radius: 4px;
  opacity: 1;
  max-width: 95%;
  display: flex;
  align-items: center;
  margin: 25px 20px;
  ${breakpoint.sm} {
    margin: 35px 30px;
  }
`;

export const DepositFormContainer = styled.div`
  background: ${colors.white} 0% 0% no-repeat padding-box;
  border-radius: 4px;
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
  margin: 25px 20px;
  ${breakpoint.sm} {
    margin: 35px 30px;
  }
`;

export const HIVEDepositContainer = styled.div``;
