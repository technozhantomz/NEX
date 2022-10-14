import counterpart from "counterpart";
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
        <p>{counterpart.translate(`field.labels.account_to_upgrade`)}</p>
        <Link href={`/user/${account}`}>
          <a>{account}</a>
        </Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.upgrade_lifetime`)}</p>
        <p>{counterpart.translate(`field.labels.true`)}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
