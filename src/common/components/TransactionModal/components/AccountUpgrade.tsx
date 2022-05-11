import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
};

export const AccountUpgrade = ({ account, fee }: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>Account to upgrade</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Upgrade to lifetime member</p>
        <p>true</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
