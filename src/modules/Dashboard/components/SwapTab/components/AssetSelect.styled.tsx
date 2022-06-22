import { LogoSelectOption } from "../../../../../common/components";
import { CardForm, CardFormButton, styled } from "../../../../../ui/src";
import { breakpoint } from "../../../../../ui/src/breakpoints";
import { colors } from "../../../../../ui/src/colors";
import { mixIns } from "../../../../../ui/src/mixins";

import { AssetSelect } from "./components";

export const AssetSwapWrapper = styled.div`
  margin: 25px 10px;
  ${mixIns.borderRadius}
  border: 1px solid ${colors.borderColorBase};
  .ant-form-item {
    margin-bottom: 0;
  }
  ${breakpoint.sm} {
    margin: 35px 30px;
  }
`;

export const SwapFormAmmount = styled(CardForm.Item)`
  .ant-input-affix-wrapper {
    padding: 0;
    .ant-input-prefix {
      min-width: 135px;
      width: 33%;
    }
    .ant-input {
      text-align: right;
      padding-right: 30px;
      font-size: 16px;
      ${breakpoint.sm} {
        font-size: 20px;
      }
    }
  }
`;

export const SwapFormAsset = styled(CardForm.Item)`
  width: 100%;
  margin-bottom: 0;
  &.ant-form-item-has-error
    .ant-select:not(.ant-select-disabled):not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: none !important;
  }
`;
