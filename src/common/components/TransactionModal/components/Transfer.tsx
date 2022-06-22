import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  asset: string;
  to: string;
  quantity: number;
};

export const Transfer = ({
  account,
  fee,
  asset,
  to,
  quantity,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        {/* <p>{counterpart.translate(`field.labels.account_to_upgrade`)}</p> */}
        <p>From</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>To</p>
        <Link href={`/user/${to}`}>{to}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Quantity</p>
        <p>{quantity}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Asset</p>
        <p>{asset}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
