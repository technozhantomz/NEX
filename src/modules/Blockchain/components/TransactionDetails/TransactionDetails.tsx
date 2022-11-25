import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import counterpart from "counterpart";
import Link from "next/link";

import { LoadingIndicator } from "../../../../common/components";
import { StatsCard } from "../../common";

import * as Styled from "./TransactionDetails.styled";
import { OperationsTable } from "./components";
import { useTransactionDetails } from "./hooks";

type Props = {
  block: number;
  transaction: string;
};
export const TransactionDetails = ({
  block,
  transaction,
}: Props): JSX.Element => {
  const {
    blockTransactions,
    transactionDetails,
    hasNextTransition,
    hasPreviousTransition,
    loading,
  } = useTransactionDetails(block, parseInt(transaction));

  const renderPreviousTransaction = hasPreviousTransition ? (
    <Link href={`/blockchain/${Number(block)}/${Number(transaction) - 1}`}>
      <a>
        <LeftOutlined />
      </a>
    </Link>
  ) : (
    ""
  );
  const renderNextTransaction = hasNextTransition ? (
    <Link href={`/blockchain/${Number(block)}/${Number(transaction) + 1}`}>
      <a>
        <RightOutlined />
      </a>
    </Link>
  ) : (
    ""
  );

  return (
    <>
      <Styled.BlockWrapper>
        {loading ? (
          <Styled.LoadingContainer>
            <LoadingIndicator type="circle" />
          </Styled.LoadingContainer>
        ) : (
          <Styled.BlockNav>
            <span>{renderPreviousTransaction}</span>
            <Styled.BlockNavItem>
              <Styled.BlockNumber>
                <span>
                  {counterpart.translate(
                    `pages.blocks.transaction_detials.transaction`
                  )}
                  {transaction} of {blockTransactions.length}
                </span>
              </Styled.BlockNumber>
              <Styled.BlockNumber>
                <span>
                  {counterpart.translate(`pages.blocks.blockchain.block`)} #
                  {block}
                </span>
              </Styled.BlockNumber>
            </Styled.BlockNavItem>
            <span>{renderNextTransaction}</span>
          </Styled.BlockNav>
        )}

        <Styled.StatsCardsDeck>
          <StatsCard
            noData={block === 0}
            title={counterpart.translate(
              `pages.blocks.block_details.block_num`
            )}
            data={`${block}`}
            statsData={[block]}
          />
          <StatsCard
            noData={transactionDetails.expiration === ""}
            title={counterpart.translate(`tableHead.expiration`)}
            data={`${transactionDetails.expiration}`}
            statsData={[0]}
          />
          <StatsCard
            noData={transactionDetails.operations.length === 0}
            title={counterpart.translate(`tableHead.operations`)}
            data={`${transactionDetails.operations.length}`}
            statsData={[transactionDetails.operations.length]}
          />
        </Styled.StatsCardsDeck>
        {/* <Styled.BlockInfo>
          <Styled.BlockInfoTitle>
            {counterpart.translate(
              `pages.blocks.transaction_detials.transaction_id`
            )}
          </Styled.BlockInfoTitle>
          <p>{transactionDetails.id}</p>
        </Styled.BlockInfo> */}
        <Styled.TwoColumns>
          <Styled.BlockInfo>
            <Styled.BlockInfoTitle>
              {counterpart.translate(
                `pages.blocks.transaction_detials.ref_block_prefix`
              )}
            </Styled.BlockInfoTitle>
            <p>{transactionDetails.refBlockPrefix}</p>
          </Styled.BlockInfo>
          <Styled.BlockInfo>
            <Styled.BlockInfoTitle>
              {counterpart.translate(
                `pages.blocks.transaction_detials.ref_block_num`
              )}
            </Styled.BlockInfoTitle>
            <p>{transactionDetails.refBlockNum}</p>
          </Styled.BlockInfo>
        </Styled.TwoColumns>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>
            {counterpart.translate(`tableHead.extensions`)}
          </Styled.BlockInfoTitle>
          <p>
            {transactionDetails.extensions.length > 0
              ? transactionDetails.extensions.length
              : "-"}
          </p>
        </Styled.BlockInfo>
        <Styled.BlockInfo>
          <Styled.BlockInfoTitle>
            {counterpart.translate(
              `pages.blocks.transaction_detials.signatures`
            )}
          </Styled.BlockInfoTitle>
          <ol>
            {transactionDetails.signatures.map(
              (signature: string): JSX.Element => {
                return <li key={signature}>{signature}</li>;
              }
            )}
          </ol>
        </Styled.BlockInfo>
      </Styled.BlockWrapper>
      <OperationsTable transactionRow={transactionDetails} />
    </>
  );
};
