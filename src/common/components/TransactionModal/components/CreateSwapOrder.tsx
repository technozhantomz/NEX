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
  expiration?: string;
};

export const CreateSwapOrder = ({
  account,
  fee,
  price,
  swap,
  expiration,
}: Props): JSX.Element => {
  return (
    <>
      {price && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.placeholder.price`)}</p>
          <p>{price}</p>
        </Styled.DetailContainer>
      )}
      {swap && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`buttons.swap`)}</p>
          <p>{swap}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.swapper`)}</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      {expiration && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.tableHead.expiration`)}</p>
          <p>{expiration}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
