import Link from "next/link";

import { DEFAULT_PROXY_ID, defaultToken } from "../../../../api/params";
import { GeneratedKey, Proxy } from "../../../types";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  desiredMembers?: number;
  proxy?: Proxy;
  memberType?: string;
  generatedKeys?: GeneratedKey[];
};

export const AccountUpdate = ({
  account,
  fee,
  desiredMembers,
  memberType,
  proxy,
  generatedKeys,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>Account name</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      {generatedKeys && generatedKeys.length > 0
        ? generatedKeys.map((key) => (
            <Styled.DetailContainer>
              <p>{key.label}</p>
              <p>true</p>
            </Styled.DetailContainer>
          ))
        : ""}
      {proxy && (
        <Styled.DetailContainer>
          <p>Proxy Voting Account</p>
          <p>{proxy.id !== DEFAULT_PROXY_ID ? proxy.name : "No Proxy"}</p>
        </Styled.DetailContainer>
      )}
      {desiredMembers && (
        <Styled.DetailContainer>
          <p>{`Desired ${memberType}`}</p>
          <p>{`${desiredMembers}`}</p>
        </Styled.DetailContainer>
      )}
      <Styled.DetailContainer>
        <p>Fee</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
