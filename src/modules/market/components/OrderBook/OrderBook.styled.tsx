import { Flex, Menu, styled } from "../../../../ui/src";

export const FilterContainer = styled(Flex)`
  padding-left: 30px;
  margin-bottom: 25px;
  justify-content: space-between;
`;

export const OrdersFilter = styled.button`
  display: flex;
  width: 25px;
  height: 25px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  &.active {
    border: 1px solid #c1c2c4;
  }
  & span {
    background-color: #e2444d;
    height: 2px;
    width: 14px;
  }
  &.order-filters__type--total span:nth-child(3),
  &.order-filters__type--total span:nth-child(4) {
    background-color: #1cb881;
  }
  &.order-filters__type--buy span {
    background-color: #1cb881;
  }
  & span:not(:last-child) {
    margin-bottom: 1px;
  }
`;

export const ThresholdMenu = styled(Menu)``;
