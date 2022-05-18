import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  receiver: string;
  amount: string;
};

export const Transfer = ({
  fee,
  account,
  receiver,
  amount,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>From</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>To</p>
        <Link href={`/user/${receiver}`}>{receiver}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Amount</p>
        <p>{amount}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
