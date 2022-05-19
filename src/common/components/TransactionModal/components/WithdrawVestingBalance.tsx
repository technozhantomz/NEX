import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  withdrawalAmount?: number;
  account?: string;
};

export const WithdrawVestingBalance = ({
  fee,
  withdrawalAmount,
  account,
}: Props): JSX.Element => {
  return (
    <>
      {account && (
        <Styled.DetailContainer>
          <p>Account name</p>
          <Link href={`/user/${account}`}>{account}</Link>
        </Styled.DetailContainer>
      )}

      {withdrawalAmount && (
        <Styled.DetailContainer>
          <p>Withdrawal amount</p>
          <p>{`${withdrawalAmount} ${defaultToken}`}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
