import { SearchTableInput } from "ant-table-extensions";
import counterpart from "counterpart";
import { ReactInstance, RefObject, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationItem } from "..";
import { DownloadOutlined, SearchOutlined } from "../../../ui/src";
import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityList, ActivityColumns as columns } from "./components";
import { useActivityTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
  className?: string;
  showHeader?: boolean;
};

export const ActivityTable = ({
  userName,
  isWalletActivityTable = false,
  className,
  showHeader = false,
}: Props): JSX.Element => {
  const { activitiesRows, loading, searchDataSource, setSearchDataSource } =
    useActivityTable({
      userName,
      isWalletActivityTable,
    });
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.ActivitysTabWrapper>
      {showHeader ? (
        <Styled.ActivityHeaderBar>
          <Styled.ActivityHeader>
            {counterpart.translate(`pages.profile.activity.my_activity`)}
          </Styled.ActivityHeader>
          <SearchTableInput
            columns={columns}
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
              trigger={() => (
                <a href="#">{counterpart.translate(`links.pdf`)}</a>
              )}
              content={() => componentRef.current as unknown as ReactInstance}
            />

            {` / `}
            <CSVLink
              filename={"ActivitysTable.csv"}
              data={activitiesRows}
              className="btn btn-primary"
            >
              {counterpart.translate(`links.csv`)}
            </CSVLink>
          </Styled.DownloadLinks>
        </Styled.ActivityHeaderBar>
      ) : (
        ""
      )}
      {sm ? (
        <ActivityList activitiesRows={searchDataSource} loading={loading} />
      ) : (
        <Styled.ActivityTable
          columns={columns}
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
        <div ref={componentRef as unknown as RefObject<HTMLDivElement>}>
          <Styled.ActivityTable
            columns={columns}
            dataSource={searchDataSource}
            loading={loading}
          />
        </div>
      </Styled.PrintTable>
    </Styled.ActivitysTabWrapper>
  );
};
