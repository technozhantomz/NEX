import { breakpoints } from "../../../ui/src/breakpoints";
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
  const { activitiesRows, loading } = useActivityTable({
    userName,
    isWalletActivityTable,
  });
  const { width } = useViewportContext();

  return (
    <>
      {width > breakpoints.sm ? (
        <Styled.ActivityTable
          columns={columns}
          dataSource={activitiesRows}
          loading={loading}
          pagination={false}
          size="small"
          className="activity-table"
        />
      ) : (
        <ActivityList
          userName={userName}
          isWalletActivityTable={isWalletActivityTable}
        />
      )}
    </>
  );
};
