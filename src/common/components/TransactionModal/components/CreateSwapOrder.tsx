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
};

export const CreateSwapOrder = ({
  account,
  fee,
  price,
  sell,
  buy,
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
          <p>{counterpart.translate(`field.labels.sell_amount`)}</p>
          <p>{sell}</p>
        </Styled.DetailContainer>
      )}
      {buy && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.buy_amount`)}</p>
          <p>{buy}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.seller`)}</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
