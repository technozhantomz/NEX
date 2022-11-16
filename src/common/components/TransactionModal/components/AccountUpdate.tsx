import counterpart from "counterpart";
import Link from "next/link";

import { DEFAULT_PROXY_ID, defaultToken } from "../../../../api/params";
import { GeneratedKey, Proxy } from "../../../types";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  proxy?: Proxy;
  memberType?: string;
  generatedKeys?: GeneratedKey[];
  approvedMembers?: number;
  removedMembers?: number;
};

export const AccountUpdate = ({
  account,
  fee,
  memberType,
  proxy,
  generatedKeys,
  approvedMembers,
  removedMembers,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.account_name`)}</p>
        <Link href={`/user/${account}`}>
          <a>{account}</a>
        </Link>
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
      {approvedMembers !== undefined && approvedMembers > 0 ? (
        <Styled.DetailContainer>
          <p>
            {counterpart.translate(`field.labels.approved`)} {memberType}
          </p>
          <p>{`${approvedMembers}`}</p>
        </Styled.DetailContainer>
      ) : (
        ""
      )}

      {removedMembers !== undefined && removedMembers > 0 ? (
        <Styled.DetailContainer>
          <p>
            {counterpart.translate(`field.labels.removed`)} {memberType}
          </p>
          <p>{`${removedMembers}`}</p>
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
