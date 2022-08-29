import counterpart from "counterpart";
import { SetStateAction, useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { List, Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

import { FeesColumns } from "./FeesColumns";
import * as Styled from "./FeesTab.styled";
import { FeesTableRow, useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const [generalFull, setGeneralFull] = useState<boolean>(false);
  const [assetFull, setAssetFull] = useState<boolean>(false);
  const [accountFull, setAccountFull] = useState<boolean>(false);
  const [marketFull, setMarketFull] = useState<boolean>(false);
  const [businessFull, setBusinessFull] = useState<boolean>(false);
  const [gameFull, setGameFull] = useState<boolean>(false);
  const {
    loading,
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows,
  } = useFeesTab();
  const { sm } = useViewportContext();
  const feesGroupsHeadings = [
    counterpart.translate(`pages.blocks.fees.general`),
    counterpart.translate(`pages.blocks.fees.asset_specific`),
    counterpart.translate(`pages.blocks.fees.account_specific`),
    counterpart.translate(`pages.blocks.fees.market_specific`),
    counterpart.translate(`pages.blocks.fees.business_administration`),
    counterpart.translate(`pages.blocks.fees.game_specific`),
  ];
  const feesRows = [
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows,
  ];
  const showMores = [
    generalFull,
    assetFull,
    accountFull,
    marketFull,
    businessFull,
    gameFull,
  ];
  const setShowMores = [
    setGeneralFull,
    setAssetFull,
    setAccountFull,
    setMarketFull,
    setBusinessFull,
    setGameFull,
  ];

  const renderShowMoreLink = (
    showMore: boolean,
    setShowMore: (value: SetStateAction<boolean>) => void
  ) => {
    return showMore ? (
      <a onClick={() => setShowMore(false)}>
        {counterpart.translate(`pages.blocks.fees.show_less`)}
      </a>
    ) : (
      <a onClick={() => setShowMore(true)}>
        {counterpart.translate(`pages.blocks.fees.show_more`)}
      </a>
    );
  };

  const renderFeesGroupAsList = (
    showMore: boolean,
    feesRows: FeesTableRow[],
    setShowMore: (value: SetStateAction<boolean>) => void
  ) => {
    return (
      <>
        <List
          itemLayout="vertical"
          dataSource={showMore ? feesRows : feesRows.slice(0, 3)}
          loading={loading}
          renderItem={(item) => (
            <Styled.FeeListItem key={item.operation}>
              <Styled.FeeItemContent>
                {item.operation === "" ? (
                  ""
                ) : (
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[0].title()}
                    </span>
                    <span className="fee-info-value">
                      <Tag key={item.operation} bgColor={colors.assetTag}>
                        {item.operation}
                      </Tag>
                    </span>
                  </div>
                )}
                <div className="fee-info">
                  <span className="fee-info-title">
                    {FeesColumns[1].title()}
                  </span>
                  <Styled.FeeTypeOrValueContainer>
                    {item.types.map((type) => (
                      <span
                        key={`${item.operation}-${type}`}
                        className="fee-info-value"
                      >
                        {type}
                      </span>
                    ))}
                  </Styled.FeeTypeOrValueContainer>
                </div>
                <div className="fee-info">
                  <span className="fee-info-title">
                    {FeesColumns[2].title()}
                  </span>
                  <Styled.FeeTypeOrValueContainer>
                    {item.fees.map((fee, index) => (
                      <span
                        key={`${item.operation}-${item.types[index]}-${fee}`}
                        className="fee-info-value"
                      >
                        {fee}
                      </span>
                    ))}
                  </Styled.FeeTypeOrValueContainer>
                </div>
              </Styled.FeeItemContent>
            </Styled.FeeListItem>
          )}
        />
        {loading ? "" : renderShowMoreLink(showMore, setShowMore)}
      </>
    );
  };
  const renderFeesGroupAsTable = (
    showMore: boolean,
    feesRows: FeesTableRow[],
    setShowMore: (value: SetStateAction<boolean>) => void
  ) => {
    return (
      <>
        <Styled.FeesTable
          bordered={false}
          dataSource={showMore ? feesRows : feesRows.slice(0, 3)}
          columns={FeesColumns}
          loading={loading}
          pagination={false}
        />
        {renderShowMoreLink(showMore, setShowMore)}
      </>
    );
  };
  const renderFeesGroup = (
    groupHeading: string,
    feesRows: FeesTableRow[],
    showMore: boolean,
    setShowMore: (value: SetStateAction<boolean>) => void
  ) => {
    return (
      <Styled.Section>
        <Styled.FeeSpecificHeader>{groupHeading}</Styled.FeeSpecificHeader>
        {sm
          ? renderFeesGroupAsList(showMore, feesRows, setShowMore)
          : renderFeesGroupAsTable(showMore, feesRows, setShowMore)}
      </Styled.Section>
    );
  };

  return (
    <Styled.FeesTabWrapper>
      {feesGroupsHeadings.map((heading, index) => {
        return renderFeesGroup(
          heading,
          feesRows[index],
          showMores[index],
          setShowMores[index]
        );
      })}
    </Styled.FeesTabWrapper>
  );
};
