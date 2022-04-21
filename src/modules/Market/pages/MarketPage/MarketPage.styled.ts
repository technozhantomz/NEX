import { styled } from "../../../../ui/src";
import { mixIns } from "../../../../ui/src/mixins";

export const Container = styled.div`
  background-color: #fff;
  ${mixIns.borderRadius}
`;

export const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
