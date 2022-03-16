import * as Styled from "./BlockCard.styled";

type Props = {
  isTimeCard?: boolean;
  noData: boolean;
  title: string;
  data: string;
};

export const BlockCard = ({
  isTimeCard = false,
  noData,
  title,
  data,
}: Props): JSX.Element => {
  return (
    <Styled.BlockCard className={noData ? "no-data" : ""}>
      <Styled.BlockCardHeading>{title}</Styled.BlockCardHeading>
      <Styled.BlockCardValue>
        {data}
        {isTimeCard ? <span> seconds</span> : ""}
      </Styled.BlockCardValue>
    </Styled.BlockCard>
  );
};
