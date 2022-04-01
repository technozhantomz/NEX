import Link from "next/link";

import * as Styled from "./BlockDetails.styled";
import { useBlockDetails } from "./hooks";

type Props = {
  block: string;
};
export const BlockDetails = ({ block }: Props): JSX.Element => {
  const { blockDetails } = useBlockDetails(block as string);

  return (
    <Styled.BlockWrapper>
      <Styled.BlockNumber>
        <span>Block #{block}</span>
        <span>
          <Link href={`/blockchain/${Number(block) - 1}`}>Previous</Link> |{" "}
          <Link href={`/blockchain/${Number(block) + 1}`}>Next</Link>
        </span>
      </Styled.BlockNumber>
      <Styled.BlockTime>{blockDetails.time}</Styled.BlockTime>
      <Styled.BlockInfoTitle>Block Information</Styled.BlockInfoTitle>
      <Styled.BlockInfo>
        <span>Transactions</span>
        <span>{blockDetails.transaction}</span>
      </Styled.BlockInfo>
      <Styled.BlockInfo>
        <span>Witness</span>
        <span>
          <Link href={`/user/${blockDetails.witness}`}>
            {blockDetails.witness}
          </Link>
        </span>
      </Styled.BlockInfo>
    </Styled.BlockWrapper>
  );
};
