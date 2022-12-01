import { Option, styled, Select as UiSelect } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const Select = styled(UiSelect)``;

export const SelectOptionContainer = styled(Option)`
  align-items: center;
  font-size: 14px;

  ${breakpoint.sm} {
    font-size: 18px;
  }
`;

export const OptionDiv = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
  ${breakpoint.sm} {
    font-size: 14px;
    svg {
      height: 25px !important;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  ${breakpoint.sm} {
    margin-right: 10px;
  }
`;

export const AssetName = styled.span``;
