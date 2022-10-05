import {
  CardForm,
  CardFormButton,
  styled,
  TableSearch,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";

export const ProxyForm = styled(CardForm)`
  padding: 0 25px 0;
  max-width: 750px;
  .publish-btn {
    margin-bottom: 10px;
  }
  ${breakpoint.sm} {
    padding: 0 35px 25px;
    max-width: 720px;
    display: flex;
    flex-direction: row-reverse;
    .publish-btn {
      margin: 0;
    }
  }
`;
export const ProxyFormButton = styled(CardFormButton)`
  min-width: 185px;
  .anticon-redo {
    font-size: 15px;
    color: #b9b9b9;
  }
  ${breakpoint.sm} {
    width: unset;
  }
`;

export const ProxySearchWrapper = styled.div`
  padding: 0 25px 0;
  width: 100%;
  max-width: 720px;
  .ant-input-group-wrapper {
    margin-bottom: 0;
  }
  ${breakpoint.sm} {
    padding: 0 35px 0;
    display: flex;
    align-items: start;
    .ant-form-item.search-input {
      width: 100%;
      margin-right: 15px;
    }
  }
`;

export const ProxyFormSearch = styled(TableSearch)`
  .ant-input,
  .ant-btn {
    height: 45px;
  }
`;

export const ProxyFormActionGroup = styled.div`
  ${breakpoint.sm} {
    display: flex;
    .ant-form-item {
      width: 100%;
    }
  }
`;
export const ProxyFormSubmitGroup = styled.div`
  ${breakpoint.sm} {
    display: flex;
    flex-direction: row-reverse;
  }
`;
