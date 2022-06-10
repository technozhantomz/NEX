import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  vestingAmount?: number;
  account?: string;
};

export const CreateVestingBalance = ({
  fee,
  vestingAmount,
  account,
}: Props): JSX.Element => {
  return (
    <>
      {account && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.account_name`)}</p>
          <Link href={`/user/${account}`}>{account}</Link>
        </Styled.DetailContainer>
      )}

      {vestingAmount && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.vesting_amount`)}</p>
          <p>{`${vestingAmount} ${defaultToken}`}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
