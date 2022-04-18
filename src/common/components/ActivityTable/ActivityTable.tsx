import { breakpoints } from "../../../ui/src/breakpoints";
import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityColumns as columns } from "./components";
import { ActivityList } from "./components/ActivityList";
import { useActivityTable } from "./hooks";

export const ActivityTable = (): JSX.Element => {
  const { activitiesTable, loading } = useActivityTable();
  const { width } = useViewportContext();

  return (
    <>
      {width > breakpoints.sm ? (
        <Styled.ActivityTable
          columns={columns}
          dataSource={activitiesTable}
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
