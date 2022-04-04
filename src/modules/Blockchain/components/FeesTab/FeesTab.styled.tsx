import { styled, Table as UiTable } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

export const FeesTabWrapper = styled.div`
  margin: 0 25px;
`;

export const FeesTable = styled(UiTable)`
  .ant-table-thead > tr > th {
    color: ${colors.textColorSecondary};
    background: ${colors.white};
    border: none;
    font-size: 0.9em;
    font-weight: 300;
    &:before {
      display: none;
    }
  }
  .ant-table-tbody > tr > td {
    border: none;
    div:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .ant-tag {
    padding: 5px 15px;
    background: ${colors.assetTag};
    border: none;
    color: ${colors.textColor};
    text-transform: capitalize;
  }
`;

export const FeeSpecificHeader = styled.h3`
  margin-top: 30px;
  margin-bottom: 30px;
  padding-left: 16px;
`;
