import counterpart from "counterpart";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  vestingAmount?: string;
  account?: string;
};

export const CreateVestingBalance = ({
  fee,
  vestingAmount,
  account,
}: Props): JSX.Element => {
  const prevVestingAmount = useRef<string>();
  useEffect(() => {
    if (vestingAmount || !prevVestingAmount.current) {
      prevVestingAmount.current = vestingAmount;
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

      {prevVestingAmount && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.vesting_amount`)}</p>
          <p>{`${
            !vestingAmount ? prevVestingAmount.current : vestingAmount
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
