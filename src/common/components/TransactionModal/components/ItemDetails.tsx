import * as Styled from "../TransactionModal.styled";

type Props = {
  label: string;
  value: string;
};

export const ItemDetails = ({ label, value }: Props): JSX.Element => {
  return (
    <Styled.DetailContainer>
      <p>{label}</p>
      <p>{value}</p>
    </Styled.DetailContainer>
  );
};
