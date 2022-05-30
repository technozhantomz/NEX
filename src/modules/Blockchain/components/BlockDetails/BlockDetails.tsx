import counterpart from "counterpart";
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
        <span>
          {counterpart.translate(`pages.blocks.blockchain.block`)} #{block}
        </span>
        <span>
          <Link href={`/blockchain/${Number(block) - 1}`}>
            {counterpart.translate(`pages.blocks.blockchain.previous`)}
          </Link>{" "}
          |{" "}
          <Link href={`/blockchain/${Number(block) + 1}`}>
            {counterpart.translate(`pages.blocks.blockchain.next`)}
          </Link>
        </span>
      </Styled.BlockNumber>
      <Styled.BlockTime>{blockDetails.time}</Styled.BlockTime>
      <Styled.BlockInfoTitle>
        {counterpart.translate(`pages.blocks.blockchain.block_information`)}
      </Styled.BlockInfoTitle>
      <Styled.BlockInfo>
        <span>
          {counterpart.translate(`pages.blocks.blockchain.transactions`)}
        </span>
        <span>{blockDetails.transaction}</span>
      </Styled.BlockInfo>
      <Styled.BlockInfo>
        <span>{counterpart.translate(`pages.blocks.blockchain.witness`)}</span>
        <span>
          <Link href={`/user/${blockDetails.witness}`}>
            {blockDetails.witness}
          </Link>
        </span>
      </Styled.BlockInfo>
    </Styled.BlockWrapper>
  );
};
