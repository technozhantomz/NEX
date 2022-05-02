import { useViewportContext } from "../../providers";

import * as Styled from "./ActivityTable.styled";
import { ActivityColumns as columns } from "./components";
import { ActivityList } from "./components/ActivityList";
import { useActivityTable } from "./hooks";

type Props = {
  userName?: string;
  isWalletActivityTable?: boolean;
};

export const ActivityTable = ({
  userName,
  isWalletActivityTable = false,
}: Props): JSX.Element => {
  const { activitiesTable, loading } = useActivityTable({
    userName,
    isWalletActivityTable,
  });
  const { sm } = useViewportContext();

  return (
    <>
      {sm ? (
        <ActivityList
          userName={userName}
          isWalletActivityTable={isWalletActivityTable}
        />
      ) : (
        <Styled.ActivityTable
          columns={columns}
          dataSource={activitiesTable}
          loading={loading}
          pagination={false}
          size="small"
          className="activity-table"
        />
      )}
    </>
  );
};
