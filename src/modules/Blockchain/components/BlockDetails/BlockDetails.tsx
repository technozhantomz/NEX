import counterpart from "counterpart";
import Link from "next/link";

import { StatsCard } from "../../common";

import * as Styled from "./BlockDetails.styled";
import { useBlockDetails } from "./hooks";

type Props = {
  block: number;
};
export const BlockDetails = ({ block }: Props): JSX.Element => {
  const { blockDetails, hasNextBlock, hasPreviousBlock, loadingSideBlocks } =
    useBlockDetails(block);

  return (
    <Styled.BlockWrapper>
      <Styled.BlockNav>
        {!loadingSideBlocks && hasPreviousBlock ? (
          <Link href={`/blockchain/${Number(block) - 1}`}>
            {/* {counterpart.translate(`buttons.previous`)} */}
            {"<"}
          </Link>
        ) : (
          <span>{"<"}</span>
        )}
        <Styled.BlockNavItem>
          <Styled.BlockNumber>
            <span>
              {counterpart.translate(`pages.blocks.blockchain.block`)} #{block}
            </span>
          </Styled.BlockNumber>
          <Styled.BlockTime>{blockDetails.time}</Styled.BlockTime>
        </Styled.BlockNavItem>
        <span>
          {!loadingSideBlocks && hasNextBlock ? (
            <Link href={`/blockchain/${Number(block) + 1}`}>
              {/* {counterpart.translate(`buttons.next`)} */}
              {">"}
            </Link>
          ) : (
            <span>{">"}</span>
          )}
        </span>
      </Styled.BlockNav>
      <Styled.StatsCardsDeck>
        <StatsCard
          noData={block === 0}
          title="Block Number"
          data={`${block}`}
          statsData={[block]}
        />
        <StatsCard
          noData={blockDetails.witness === ""}
          title="Witness"
          data={
            <Link href={`/user/${blockDetails.witness}`}>
              {blockDetails.witness}
            </Link>
          }
          statsData={[0]}
        />
        <StatsCard
          noData={false}
          title="Transactions"
          data={`${blockDetails.transactions.length}`}
          statsData={[blockDetails.transactions.length]}
        />
      </Styled.StatsCardsDeck>
      {/* <Styled.BlockInfoTitle>
        {counterpart.translate(`pages.blocks.blockchain.block_information`)}
      </Styled.BlockInfoTitle> */}
      <Styled.TwoColumns>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Block ID</Styled.BlockInfoTitle>
          <p>{blockDetails.blockID}</p>
        </Styled.BlockInfo>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Merkle root</Styled.BlockInfoTitle>
          <p>{blockDetails.merkleRoot}</p>
        </Styled.BlockInfo>
      </Styled.TwoColumns>
      <Styled.TwoColumns>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Previous Secret</Styled.BlockInfoTitle>
          <p>{blockDetails.previousSecret}</p>
        </Styled.BlockInfo>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>Next Secret</Styled.BlockInfoTitle>
          <p>{blockDetails.nextSecret}</p>
        </Styled.BlockInfo>
      </Styled.TwoColumns>
      <Styled.BlockInfo>
        <Styled.BlockInfoTitle>witness signature</Styled.BlockInfoTitle>
        <p>{blockDetails.witnessSignature}</p>
      </Styled.BlockInfo>
      {/* <Styled.BlockInfo>
        <Styled.BlockInfoTitle>
          {counterpart.translate(`pages.blocks.blockchain.transactions`)}
        </Styled.BlockInfoTitle>
        <p>{blockDetails.transactions.length}</p>
      </Styled.BlockInfo>
      <Styled.BlockInfo>
        <Styled.BlockInfoTitle>
          {counterpart.translate(`pages.blocks.blockchain.witness`)}
        </Styled.BlockInfoTitle>
        <Link href={`/user/${blockDetails.witness}`}>
          {blockDetails.witness}
        </Link>
      </Styled.BlockInfo> */}
    </Styled.BlockWrapper>
  );
};
