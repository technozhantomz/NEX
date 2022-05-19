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
          <p>Price</p>
          <p>{price}</p>
        </Styled.DetailContainer>
      )}
      {sell && (
        <Styled.DetailContainer>
          <p>Sell</p>
          <p>{sell}</p>
        </Styled.DetailContainer>
      )}
      {buy && (
        <Styled.DetailContainer>
          <p>Buy at least</p>
          <p>{buy}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>Seller</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      {expiration && (
        <Styled.DetailContainer>
          <p>Expiration</p>
          <p>{expiration}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
