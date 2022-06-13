import { LogoSelectOption } from "../../../../common/components";
import { CardFormButton, styled } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";
import { colors } from "../../../../ui/src/colors";
import { mixIns } from "../../../../ui/src/mixins";
import { AssetSelect } from './components';

export const SwapContainer = styled.div`
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
  border: none;
  opacity: 1;
  max-width: 95%;
  display: flex;
  align-items: center;
  width: 35%;
  margin: 2px;
  ${breakpoint.sm} {
    height: 65px;
  }
`;