import { styled, Table as UiTable } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const ActivityTable = styled(UiTable)`
.ant-table-thead > tr > th {
        background: transparent;
        color: ${colors.textColorSecondary};
        font-weight: 300;
        border: none;
        &:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before{
            display:none;
        }
    }
}
.ant-table-tbody > tr > td {
    border: none;
    font-weight: 500;
 }
 .ant-table-tbody > tr > td a{
    font-style: italic;
 }
`;
