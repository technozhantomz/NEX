import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  orderId: string;
};

export const CancelLimitOrder = ({
  account,
  fee,
  orderId,
}: Props): JSX.Element => {
  return (
    <>
      {account && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.seller`)}</p>
          <Link href={`/user/${account}`}>{account}</Link>
        </Styled.DetailContainer>
      )}
      {orderId && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.order_to_cancel`)}</p>
          <p>{orderId}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
