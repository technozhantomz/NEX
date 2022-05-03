import {
  CardForm,
  CardFormButton,
  styled,
  TableSearch,
} from "../../../../../../ui/src";
import { breakpoint } from "../../../../../../ui/src/breakpoints";
import { colors } from "../../../../../../ui/src/colors";
import { mixIns } from "../../../../../../ui/src/mixins";

export const ProxyForm = styled(CardForm)`
  padding: 0 25px 0;
  max-width: 750px;
  ${breakpoint.sm} {
    padding: 0 35px 0;
  }
`;
export const ProxyFormButton = styled(CardFormButton)`
  min-width: 185px;
  .anticon-redo {
    font-size: 15px;
    color: #b9b9b9;
  }
`;

export const ProxyFormSearch = styled(TableSearch)``;
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
