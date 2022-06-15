import counterpart from "counterpart";
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
  console.log("desirede", desiredMembers);
  return (
    <>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.account_name`)}</p>
        <Link href={`/user/${account}`}>{account}</Link>
      </Styled.DetailContainer>
      {generatedKeys
        ? generatedKeys.map((key) => (
            <Styled.DetailContainer>
              <p>{key.label}</p>
              <p>{counterpart.translate(`field.labels.true`)}</p>
            </Styled.DetailContainer>
          ))
        : ""}
      {proxy && (
        <Styled.DetailContainer>
          <p>{counterpart.translate(`field.labels.proxy_voting_account`)}</p>
          <p>
            {proxy.id !== DEFAULT_PROXY_ID
              ? proxy.name
              : counterpart.translate(`field.labels.no_proxy`)}
          </p>
        </Styled.DetailContainer>
      )}
      {desiredMembers !== undefined && desiredMembers >= 0 ? (
        <Styled.DetailContainer>
          <p>{`Desired ${memberType}`}</p>
          <p>{`${desiredMembers}`}</p>
        </Styled.DetailContainer>
      ) : (
        ""
      )}
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
