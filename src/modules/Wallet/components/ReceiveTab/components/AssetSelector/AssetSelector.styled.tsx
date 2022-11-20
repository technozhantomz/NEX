import { Select, styled } from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";

const { Option } = Select;

export const AssetSelector = styled(Select)`
  height: 50px;
  min-width: 100%;
  margin-bottom: 24px;
  ${breakpoint.sm} {
    min-width: 350px;
  }
  .ant-select-selector {
    height: 100% !important;
    display: flex;
    align-items: center;
    border-radius: 4px !important;
    padding: 15px 30px !important;
  }
  .ant-select-selection-item {
    font-size: 16px !important;
  }
`;

export const AssetOption = styled(Option)``;
