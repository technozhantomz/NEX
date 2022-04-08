import {
  CardFormButton,
  CardFrom,
  Modal,
  styled,
} from "../../../../../../ui/src";
import { colors } from "../../../../../../ui/src/colors";

export const MembershipModal = styled(Modal)``;
export const MembershipModalForm = styled(CardFrom)``;
export const MembershipModalFormButton = styled(CardFormButton)``;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TransactionError = styled.span`
  color: ${colors.errorColor};
`;

export const TransactionSuccess = styled.span`
  color: ${colors.successColor};
`;
