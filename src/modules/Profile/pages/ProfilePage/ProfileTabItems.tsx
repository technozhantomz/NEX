import counterpart from "counterpart";
import { ReactNode } from "react";

import { ActivityAndNotificationTable } from "../../../../common/components";
import { OrdersTab } from "../../components";

export const ProfileTabItems = (
  localStorageAccount: string
): {
  key: string;
  label: ReactNode;
  children: ReactNode;
}[] => {
  const label = ["orders", "activities", "notifications"];
  const key = ["orders", "activities", "notifications"];
  const children = [
    <OrdersTab />,
    <ActivityAndNotificationTable
      userName={localStorageAccount}
      showHeader={true}
      isNotificationTab={false}
    />,
    <ActivityAndNotificationTable showHeader={true} isNotificationTab={true} />,
  ];

  return label.map((item, index) => {
    return {
      label: counterpart.translate(`pages.profile.${item}`),
      key: key[index],
      children: children[index],
    };
  });
};
