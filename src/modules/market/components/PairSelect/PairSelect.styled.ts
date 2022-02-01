import { Button, DownOutlined, styled } from "../../../../ui/src";

export const PairSelectContainer = styled.div`
  padding: 30px 30px 0 30px;
`;

export const PairButton = styled(Button)`
  font-size: 20px;
  font-weight: 700;
  border: none;
  padding: 4px 0;
`;

export const PairButtonDownOutlined = styled(DownOutlined)`
  vertical-align: baseline;
  margin-left: 16px !important;
  &.anticon.anticon-down svg {
    width: 14px;
    height: 10px;
  }
`;

export const PairInfoLabel = styled.span`
  font-size: 12px;
  color: #6c6c6c;
`;
