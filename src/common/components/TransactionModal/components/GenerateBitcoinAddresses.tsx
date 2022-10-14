import counterpart from "counterpart";
import Link from "next/link";

import { defaultToken } from "../../../../api/params";
import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: number;
  account: string;
  sidechain: string;
};

export const GenerateBitcoinAddresses = ({
  account,
  fee,
  sidechain,
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
        <p>{sidechain}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee} ${defaultToken}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
