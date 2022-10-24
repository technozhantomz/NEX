import counterpart from "counterpart";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  withdrawalAmount?: string;
  account?: string;
};

export const WithdrawVestingBalance = ({
  fee,
  withdrawalAmount,
  account,
}: Props): JSX.Element => {
  const prevWithdrawalAmount = useRef<string>();
  useEffect(() => {
    if (withdrawalAmount || !prevWithdrawalAmount.current) {
      prevWithdrawalAmount.current = withdrawalAmount;
    }
  });

  return (
    <>
      {account && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.account_name`)}</p>
          <Link href={`/user/${account}`}>
            <a>{account}</a>
          </Link>
        </Styled.DetailContainer>
      )}

      {prevWithdrawalAmount && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.withdrawal_amount`)}</p>
          <p>{`${
            !withdrawalAmount ? prevWithdrawalAmount.current : withdrawalAmount
          } ${defaultToken}`}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
