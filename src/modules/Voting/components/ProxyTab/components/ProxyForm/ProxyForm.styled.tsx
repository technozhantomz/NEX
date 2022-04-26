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
  ${breakpoint.sm} {
    padding: 0 35px 0;
  }
`;
export const ProxyFormButton = styled(CardFormButton)`
  .anticon-redo {
    font-size: 15px;
    color: #b9b9b9;
  }
`;

export const ProxyFormSearch = styled(TableSearch)``;
