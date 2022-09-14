import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { useViewportContext } from "../../../../common/providers";
import {
  DownloadOutlined,
  InfoCircleOutlined,
  List,
  SearchOutlined,
  Tag,
} from "../../../../ui/src";
import { colors } from "../../../../ui/src/colors";

import { FeesColumns } from "./FeesColumns";
import { FeesPrintTable } from "./FeesPrintTable";
import * as Styled from "./FeesTab.styled";
import { FeesTableRow, useFeesTab } from "./hooks";

export const FeesTab = (): JSX.Element => {
  const { loading, searchDataSource, fullFeesRows, setSearchDataSource } =
    useFeesTab();
  const { sm } = useViewportContext();
  const componentRef = useRef();

  return (
    <Styled.FeesTabWrapper>
      <Styled.FeesHeaderBar>
        <Styled.FeesHeader>
          {counterpart.translate(`pages.blocks.fees.fees`)}
          <InfoCircleOutlined />
        </Styled.FeesHeader>
        <SearchTableInput
          columns={FeesColumns}
          dataSource={fullFeesRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(`pages.blocks.fees.search_fees`),
            suffix: <SearchOutlined />,
          }}
        />
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current}
          />
          {` / `}
          <CSVLink
            filename={"FeesTable.csv"}
            data={fullFeesRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.FeesHeaderBar>
      <Styled.Section>
        {sm ? (
          <List
            itemLayout="vertical"
            dataSource={searchDataSource}
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
            dataSource={searchDataSource}
            columns={FeesColumns}
            loading={loading}
          />
        )}
        <Styled.PrintTable ref={componentRef}>
          <Styled.FeesTable
            dataSource={fullFeesRows}
            columns={FeesColumns}
            loading={loading}
            pagination={false}
          />
        </Styled.PrintTable>
      </Styled.Section>
      <Styled.PrintTable>
        <FeesPrintTable ref={componentRef} />
      </Styled.PrintTable>
    </Styled.FeesTabWrapper>
  );
};
