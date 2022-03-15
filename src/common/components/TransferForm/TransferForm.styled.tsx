import { CardFormButton, CardFrom, styled } from "../../../ui/src";
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
export const TransferFormButton = styled(CardFormButton)``;
