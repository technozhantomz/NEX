import { styled, Checkbox as UICheckbox } from "../../../../ui/src";
import { breakpoint } from "../../../../ui/src/breakpoints";

export const Checkbox = styled(UICheckbox)`
   {
    align-items: flex-start;
    .ant-checkbox-inner {
      width: 30px;
      height: 30px;
      &::after {
        left: 35%;
      }
    }
  }
  ${breakpoint.xs} {
     {
      align-items: flex-start;
      .ant-checkbox-inner {
        width: 20px;
        height: 20px;
        &::after {
          left: 25%;
        }
      }
    }
  }
`;
