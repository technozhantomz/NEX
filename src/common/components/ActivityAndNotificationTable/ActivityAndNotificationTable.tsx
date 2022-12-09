import { SearchTableInput } from "ant-table-extensions";
import { ColumnsType } from "antd/lib/table";
import counterpart from "counterpart";
import { ReactInstance, useRef } from "react";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";

import { renderPaginationItem } from "..";
import { DownloadOutlined, SearchOutlined } from "../../../ui/src";
import { useNotificationsContext, useViewportContext } from "../../providers";

import * as Styled from "./ActivityAndNotificationTable.styled";
import { ActivityAndNotificationList } from "./components";
import { useActivityAndNotificationTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
  className?: string;
  showHeader?: boolean;
  isNotificationTab?: boolean;
};

export const ActivityAndNotificationTable = ({
  userName,
  isWalletActivityTable = false,
  className,
  showHeader = false,
  isNotificationTab = false,
}: Props): JSX.Element => {
  const { notifications, markTheNotificationAsReadOrUnread } =
    useNotificationsContext();
  const {
    activitiesAndNotificationsRows,
    loading,
    activityAndNotificationColumns,
    searchDataSource,
    setSearchDataSource,
  } = useActivityAndNotificationTable({
    userName,
    isWalletActivityTable,
    isNotificationTab,
    notifications,
    markTheNotificationAsReadOrUnread,
  });
  const { sm } = useViewportContext();
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <Styled.ActivityAndNotificationTableWrapper>
      {showHeader ? (
        <Styled.ActivityAndNotificationTableHeaderBar>
          <Styled.ActivityAndNotificationTableHeader>
            {counterpart.translate(
              `pages.profile.${
                isNotificationTab
                  ? `notification.my_notification`
                  : `activity.my_activity`
              }`
            )}
          </Styled.ActivityAndNotificationTableHeader>
          <SearchTableInput
            columns={activityAndNotificationColumns as ColumnsType<unknown>}
            dataSource={activitiesAndNotificationsRows}
            setDataSource={setSearchDataSource}
            inputProps={{
              placeholder: counterpart.translate(
                `pages.profile.${
                  isNotificationTab
                    ? `notification.search_notifications`
                    : `activity.search_activities`
                }`
              ),
              suffix: <SearchOutlined />,
            }}
          />
          {!isNotificationTab ? (
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
                filename={"ActivityTable.csv"}
                data={activitiesAndNotificationsRows}
                className="btn btn-primary"
              >
                {counterpart.translate(`links.csv`)}
              </CSVLink>
            </Styled.DownloadLinks>
          ) : (
            ""
          )}
        </Styled.ActivityAndNotificationTableHeaderBar>
      ) : (
        ""
      )}
      {sm ? (
        <ActivityAndNotificationList
          activitiesAndNotificationsRows={searchDataSource}
          loading={loading}
          isNotificationTab={isNotificationTab}
        />
      ) : (
        <Styled.ActivityAndNotificationTable
          columns={activityAndNotificationColumns as ColumnsType<unknown>}
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
          <Styled.ActivityAndNotificationTable
            dataSource={activitiesAndNotificationsRows}
            columns={activityAndNotificationColumns as ColumnsType<unknown>}
            loading={loading}
            pagination={false}
          />
        </div>
      </Styled.PrintTable>
    </Styled.ActivityAndNotificationTableWrapper>
  );
};
