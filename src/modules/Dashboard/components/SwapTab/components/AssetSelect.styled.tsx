import { LogoSelectOption } from "../../../../../common/components";
import { CardFormButton, styled } from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { mixIns } from "../../../../../ui/src/mixins";

import { AssetSelect } from "./components";

export const AssetSwapWrapper = styled.div`
  margin: 25px 10px;
  ${mixIns.borderRadius}
  border: 1px solid ${colors.borderColorBase};
  ${breakpoint.sm} {
    margin: 35px 30px;
  }
`;
