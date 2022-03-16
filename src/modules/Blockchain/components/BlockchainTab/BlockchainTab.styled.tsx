import { Input, styled } from "../../../../ui/src";

const { Search } = Input;

export const BlockCardsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0 35px;
`;

export const BlockSearch = styled(Search)`
  max-width: 520px;
  margin-bottom: 35px;
  .ant-input {
    border-radius: 4px;
  }
  > .ant-input-group
    > .ant-input-group-addon:last-child
    .ant-input-search-button {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
`;