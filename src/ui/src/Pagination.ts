import { Pagination as AntdPagination } from "antd";
import styled from "styled-components";

export const Pagination = styled(AntdPagination)`
  padding-top: 35px;
  padding-bottom: 21px;
  width: 100%;
  text-align: center;
  & .ant-pagination-item-active {
    border: none;
    background: #ebf2ff;
  }
`;
