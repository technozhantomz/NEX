import counterpart from "counterpart";
import Link from "next/link";

import * as Styled from "../TransactionModal.styled";

type Props = {
  fee: string;
  account: string;
  asset: string;
  withdrawAddress: string;
  amount: string;
};

export const Withdraw = ({
  account,
  fee,
  asset,
  withdrawAddress,
  amount,
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
        <p>
          {asset === "BTC"
            ? counterpart.translate(`field.placeholder.withdraw_address`)
            : counterpart.translate(
                `field.placeholder.hive_blockchain_account`
              )}
        </p>
        <span>{withdrawAddress}</span>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.placeholder.amount`)}</p>
        <p>{amount}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`tableHead.asset`)}</p>
        <p>{asset}</p>
      </Styled.DetailContainer>
      <Styled.DetailContainer>
        <p>{counterpart.translate(`field.labels.fee`)}</p>
        <p>{`${fee}`}</p>
      </Styled.DetailContainer>
    </>
  );
};
