import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityList, ActivityColumns as columns } from "./components";
import { useActivityTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
};

export const ActivityTable = ({
  userName,
  isWalletActivityTable = false,
}: Props): JSX.Element => {
  const { activitiesRows, loading } = useActivityTable({
    userName,
    isWalletActivityTable,
  });
  const { sm } = useViewportContext();

  return (
    <>
      {sm ? (
        <ActivityList activitiesRows={activitiesRows} loading={loading} />
      ) : (
        <Styled.ActivityTable
          columns={columns}
          dataSource={activitiesRows}
          loading={loading}
          pagination={false}
          size="small"
          className="activity-table"
        />
      )}
    </>
  );
};
