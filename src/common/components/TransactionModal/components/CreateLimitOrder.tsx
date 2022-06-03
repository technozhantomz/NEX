import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  price?: string;
  sell?: string;
  buy?: string;
  expiration?: string;
};

export const CreateLimitOrder = ({
  account,
  fee,
  price,
  sell,
  buy,
  expiration,
}: Props): JSX.Element => {
  return (
    <>
      {price && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.placeholder.price`)}</p>
          <p>{price}</p>
        </Styled.DetailContainer>
      )}
      {sell && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.buttons.sell`)}</p>
          <p>{sell}</p>
        </Styled.DetailContainer>
      )}
      {buy && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.buy_at_least`)}</p>
          <p>{buy}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.seller`)}</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      {expiration && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.tableHead.expiration`)}</p>
          <p>{expiration}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
