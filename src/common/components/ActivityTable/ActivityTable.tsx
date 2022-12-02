import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationItem } from "..";
import { DownloadOutlined, SearchOutlined } from "../../../ui/src";
import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityList } from "./components";
import { useActivityTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
  className?: string;
};

export const ActivityTable = ({
  userName,
  isWalletActivityTable = false,
  className,
}: Props): JSX.Element => {
  const {
    activitiesRows,
    loading,
    activityColumns,
    searchDataSource,
    setSearchDataSource,
  } = useActivityTable({
    userName,
    isWalletActivityTable,
  });
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.ActivityTableWrapper>
      <Styled.ActivityTableHeaderBar>
        <Styled.ActivityTableHeader>
          {counterpart.translate(`pages.profile.activity.my_activity`)}
        </Styled.ActivityTableHeader>
        <SearchTableInput
          columns={activityColumns as ColumnsType<unknown>}
          dataSource={activitiesRows}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: counterpart.translate(
              `pages.profile.activity.search_activitys`
            ),
            suffix: <SearchOutlined />,
          }}
        />
        <Styled.DownloadLinks>
          <DownloadOutlined />
          <ReactToPrint
            trigger={() => <a href="#">{counterpart.translate(`links.pdf`)}</a>}
            content={() => componentRef.current as unknown as ReactInstance}
          />

          {` / `}
          <CSVLink
            filename={"ActivityTable.csv"}
            data={activitiesRows}
            className="btn btn-primary"
          >
            {counterpart.translate(`links.csv`)}
          </CSVLink>
        </Styled.DownloadLinks>
      </Styled.ActivityTableHeaderBar>
      {sm ? (
        <ActivityList activitiesRows={activitiesRows} loading={loading} />
      ) : (
        <Styled.ActivityTable
          columns={activityColumns as ColumnsType<unknown>}
          dataSource={searchDataSource}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
            defaultPageSize: 15,
            defaultCurrent: 1,
            showSizeChanger: false,
            showLessItems: true,
            size: "small",
            itemRender: renderPaginationItem(),
          }}
          size="small"
          className={`activity-table ${className ? className : ""}`}
        />
      )}
      <Styled.PrintTable>
        <div ref={componentRef}>
          <Styled.ActivityTable
            dataSource={activitiesRows}
            columns={activityColumns as ColumnsType<unknown>}
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.ActivityTableWrapper>
  );
};
