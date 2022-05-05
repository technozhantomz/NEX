import { CardForm, CardFormButton, Modal, styled } from "../../../ui/src";
import { colors } from "../../../ui/src/colors";

export const TransactionModal = styled(Modal)``;
export const TransactionModalForm = styled(CardForm)``;
export const TransactionModalFormButton = styled(CardFormButton)``;

export const TransactionError = styled.span`
  color: ${colors.errorColor};
`;

export const TransactionSuccess = styled.span`
  color: ${colors.successColor};
`;

export const TransactionType = styled.span`
  margin-bottom: 15px;
  font-weight: 500;
`;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
