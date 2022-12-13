import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  sidechains: string[];
};

export const PeerLinkConnect = ({
  account,
  fee,
  sidechains,
}: Props): JSX.Element => {
  return (
    <>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.placeholder.from`)}</p>
        <Link href={`/user/${account}`}>
          <a>{account}</a>
        </Link>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.sidechain`)}</p>
        {sidechains.forEach((sidechain) => {
          <p>{sidechain}</p>;
        })}
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
