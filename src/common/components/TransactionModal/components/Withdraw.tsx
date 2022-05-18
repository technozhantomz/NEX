import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  amount: string;
  address?: string;
};

export const Withdraw = ({
  fee,
  account,
  amount,
  address,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>Account</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Amount</p>
        <p>{amount}</p>
      </Styled.DetailContainer>
      {address ? (
        <Styled.DetailContainer>
          <p>To Address</p>
          <p>{address}</p>
        </Styled.DetailContainer>
      ) : (
        ""
      )}
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
