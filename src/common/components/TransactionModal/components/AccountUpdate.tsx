import Link from "next/link";

import { DEFAULT_PROXY_ID, defaultToken } from "../../../../api/params";
import { Proxy } from "../../../types";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  desiredMembers: number;
  proxy: Proxy;
  memberType: string;
};

export const AccountUpdate = ({
  account,
  fee,
  desiredMembers,
  memberType,
  proxy,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>Account name</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Proxy Voting Account</p>
        <p>{proxy.id !== DEFAULT_PROXY_ID ? proxy.name : "No Proxy"}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{`Desired ${memberType}`}</p>
        <p>{`${desiredMembers}`}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
