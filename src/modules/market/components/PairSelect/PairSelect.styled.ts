import { Button, styled } from "../../../../ui/src";

export const PairSelectContainer = styled.div`
  padding: 30px 30px 0 30px;
`;

export const PairButton = styled(Button)`
  position: relative;
  margin-right: 5rem;
  padding-right: 2.5rem;
  font-weight: 700;
  color: #3c476c;
  .field__caret {
    right: 0;
  }
`;
