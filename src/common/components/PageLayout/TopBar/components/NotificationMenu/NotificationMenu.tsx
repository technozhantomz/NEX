import { MenuCard } from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { NotificationList } from "../../../../Notifications/components/NotificationList";

export const NotificationMenu = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();

  return (
    <MenuCard bordered={false}>
      <NotificationList
        userName={localStorageAccount}
        isWalletActivityTable={false}
      />
    </MenuCard>
  );
};
