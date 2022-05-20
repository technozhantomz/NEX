import { Option, Select, styled } from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const SelectContainer = styled(Select)``;

export const SelectOptionContainer = styled(Option)`
  font-size: 16px;
  ${breakpoint.sm} {
    font-size: 20px;
  }
`;

export const OptionDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  ${breakpoint.sm} {
    font-size: 20px;
  }
}
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const AssetName = styled.span``;
