import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { CSSProperties, ReactNode, useRef } from "react";
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

import * as Styled from "./FeesTab.styled";
import { FeesColumns, FeesPrintTable } from "./components";
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
            data={searchDataSource}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.FeesHeaderBar>

      {sm ? (
        <List
          itemLayout="vertical"
          dataSource={searchDataSource}
          loading={loading}
          renderItem={(item: FeesTableRow) => (
            <Styled.FeeListItem key={item.operation}>
              <Styled.FeeItemContent>
                <div className="item-info">
                  <span className="item-info-title">
                    {FeesColumns[0].title()}
                  </span>
                  <Styled.FeeTypeOrValueContainer>
                    <span key={`${item.category}`} className="item-info-value">
                      {item.category}
                    </span>
                  </Styled.FeeTypeOrValueContainer>
                </div>
                {item.operation === "" ? (
                  ""
                ) : (
                  <div className="item-info">
                    <span className="item-info-title">
                      {FeesColumns[1].title()}
                    </span>
                    <span className="item-info-value">
                      <Tag key={item.operation} bgColor={colors.assetTag}>
                        {item.operation}
                      </Tag>
                    </span>
                  </div>
                )}
                <div className="item-info">
                  <span className="item-info-title">
                    {FeesColumns[2].title()}
                  </span>
                  <Styled.FeeTypeOrValueContainer>
                    {item.types.map((type) => (
                      <span
                        key={`${item.operation}-${type}`}
                        className="item-info-value"
                      >
                        {type}
                      </span>
                    ))}
                  </Styled.FeeTypeOrValueContainer>
                </div>
                <div className="item-info">
                  <span className="item-info-title">
                    {FeesColumns[3].title()}
                  </span>
                  <Styled.FeeTypeOrValueContainer>
                    {item.fees.map((fee, index) => (
                      <span
                        key={`${item.operation}-${item.types[index]}-${fee}`}
                        className="item-info-value"
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
          pagination={
            !loading
              ? {
                  showSizeChanger: false,
                  size: "small",
                  pageSize: 15,
                  showLessItems: true,
                  itemRender: (
                    _page: number,
                    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
                    element: ReactNode
                  ) => {
                    if (type === "prev") {
                      return (
                        <a style={{ marginRight: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.previous`)}
                        </a>
                      );
                    }
                    if (type === "next") {
                      return (
                        <a style={{ marginLeft: "8px" } as CSSProperties}>
                          {counterpart.translate(`buttons.next`)}
                        </a>
                      );
                    }
                    return element;
                  },
                }
              : false
          }
        />
      )}
      <Styled.PrintTable>
        <FeesPrintTable ref={searchDataSource} />
      </Styled.PrintTable>
    </Styled.FeesTabWrapper>
  );
};
