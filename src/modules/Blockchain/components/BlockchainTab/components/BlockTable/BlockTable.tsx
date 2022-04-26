import Link from "next/link";
import { useRouter } from "next/router";

import { useViewportContext } from "../../../../../../common/providers";
import { List } from "../../../../../../ui/src";
import { breakpoints } from "../../../../../../ui/src/breakpoints";
import { BlockTableRow } from "../../../../types";

import { BlockColumns } from "./BlockColumns";
import * as Styled from "./BlockTable.styled";

type Props = {
  searchValue: string;
  blocks: BlockTableRow[];
  loading: boolean;
};

export const BlockTable = ({
  searchValue = "",
  blocks,
  loading,
}: Props): JSX.Element => {
  const router = useRouter();
  const { width } = useViewportContext();

  return (
    <>
      {width > breakpoints.sm ? (
        <Styled.BlockTable
          bordered={false}
          dataSource={
            searchValue === ""
              ? blocks
              : blocks.filter((item) => item.blockID.startsWith(searchValue))
          }
          columns={BlockColumns}
          rowKey={(record) => record.blockID}
          loading={loading}
          pagination={false}
          onRow={(record, _rowIndex) => {
            return {
              onClick: (_event) => {
                router.push(`/blockchain/${record.blockID}`);
              },
            };
          }}
        />
      ) : (
        <List
          itemLayout="vertical"
          dataSource={
            searchValue === ""
              ? blocks
              : blocks.filter((item) => item.blockID.startsWith(searchValue))
          }
          loading={loading}
          renderItem={(item) => (
            <Link href={`/blockchain/${item.blockID}`} passHref>
              <Styled.BlockListItem key={item.key}>
                <Styled.BlockItemContent>
                  <div className="block-info">
                    <span className="block-info-title">
                      {BlockColumns[0].title}
                    </span>
                    <span className="block-info-value">{item.blockID}</span>
                  </div>
                  <div className="block-info">
                    <span className="block-info-title">
                      {BlockColumns[1].title}
                    </span>
                    <span className="block-info-value">{item.time}</span>
                  </div>
                  <div className="block-info">
                    <span className="block-info-title">
                      {BlockColumns[2].title}
                    </span>
                    <span className="block-info-value">{item.witness}</span>
                  </div>
                  <div className="block-info">
                    <span className="block-info-title">
                      {BlockColumns[3].title}
                    </span>
                    <span className="block-info-value">{item.transaction}</span>
                  </div>
                </Styled.BlockItemContent>
              </Styled.BlockListItem>
            </Link>
          )}
        />
      )}
    </>
  );
};
