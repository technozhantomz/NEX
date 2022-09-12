import counterpart from "counterpart";
// import { SetStateAction, useState } from "react";

import { useViewportContext } from "../../../../common/providers";
import { InfoCircleOutlined, List, Tag } from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

import { FeesColumns } from "./FeesColumns";
// import { FeesMenu } from "./FeesMenu";
import * as Styled from "./FeesTab.styled";
import { FeesTableRow, useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const {
    loading,
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows,
    // searchValue,
    handleSearch,
  } = useFeesTab();
  const { sm } = useViewportContext();
  const fullFeesRows = [].concat(
    generalFeesRows,
    assetFeesRows,
    accountFeesRows,
    businessFeesRows,
    gameFeesRows,
    marketFeesRows
  );

  return (
    <Styled.FeesTabWrapper>
      <div>
        <Styled.FeesHeader>
          {counterpart.translate(`pages.blocks.fees.fees`)}{" "}
          <InfoCircleOutlined />
        </Styled.FeesHeader>
        {/* <Styled.FeesDropdown overlay={FeesMenu}></Styled.FeesDropdown> */}
        <Styled.FeesSearch
          size="large"
          placeholder={counterpart.translate(`pages.blocks.fees.search_fees`)}
          onSearch={handleSearch}
          loading={loading}
        />
      </div>
      <Styled.Section>
        {sm ? (
          <List
            itemLayout="vertical"
            dataSource={fullFeesRows}
            pagination={{
              pageSize: 10,
            }}
            loading={loading}
            renderItem={(item: FeesTableRow) => (
              <Styled.FeeListItem key={item.operation}>
                <Styled.FeeItemContent>
                  <div className="fee-info">
                    <span className="fee-info-title">
                      {FeesColumns[0].title()}
                    </span>
                    <Styled.FeeTypeOrValueContainer>
                      <span key={`${item.category}`} className="fee-info-value">
                        {item.category}
                      </span>
                    </Styled.FeeTypeOrValueContainer>
                  </div>
                  {item.operation === "" ? (
                    ""
                  ) : (
                    <div className="fee-info">
                      <span className="fee-info-title">
                        {FeesColumns[1].title()}
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
                      {FeesColumns[2].title()}
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
                      {FeesColumns[3].title()}
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
        ) : (
          <Styled.FeesTable
            // bordered={true}
            dataSource={fullFeesRows}
            columns={FeesColumns}
            loading={loading}
          />
        )}
      </Styled.Section>
    </Styled.FeesTabWrapper>
  );
};
