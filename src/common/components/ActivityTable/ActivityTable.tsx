import { breakpoints } from "../../../ui/src/breakpoints";
import { useViewportContext } from "../ViewportProvider";

import * as Styled from "./ActivityTable.styled";
import { ActivityColumns as columns } from "./components/ActicityColumns/ActivityColumns";
import { ActivityList } from "./components/ActivityList";
import { useActivityTable } from "./hooks";

export const ActivityTable = (): JSX.Element => {
  const { tableActivity, loading } = useActivityTable();
  const { width } = useViewportContext();

  return (
    <>
      {width > breakpoints.sm ? (
        <Styled.ActivityTable
          columns={columns}
          dataSource={tableActivity}
          loading={loading}
          pagination={false}
          size="small"
          className="activity-table"
        />
      ) : (
        <ActivityList />
      )}
    </>
  );
};
