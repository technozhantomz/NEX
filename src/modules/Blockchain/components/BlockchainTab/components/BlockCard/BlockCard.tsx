import * as Styled from "./BlockCard.styled";

type Props = {
  title: string;
  data: string;
};

export const BlockCard = ({ title, data }: Props): JSX.Element => {
  return (
    <Styled.BlockCard>
      <p>{title}</p>
      <p>{data}</p>
    </Styled.BlockCard>
  );
};
