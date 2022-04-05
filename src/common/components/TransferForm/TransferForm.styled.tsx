import {
  CardFormButton,
  CardFrom,
  styled,
  Form as UIForm,
} from "../../../ui/src";
import { breakpoint } from "../../../ui/src/breakpoints";

export const TransferForm = styled(CardFrom)`
   {
    margin: 0 20px;
  }
  ${breakpoint.sm} {
    .two-input-row {
      display: flex;
      justify-content: space-between;
      .ant-form-item {
        width: 49%;
      }
    }
  }
`;
export const TransferFormButton = styled(CardFormButton)`
  width: 100%;
`;

export const FormItem = styled(UIForm.Item)`
  width: 255px;
  margin-left: auto;
  margin-right: auto;

  ${breakpoint.sm} {
    margin-left: 245px;
    width: 290px;
    height: 45px;
  }
`;
