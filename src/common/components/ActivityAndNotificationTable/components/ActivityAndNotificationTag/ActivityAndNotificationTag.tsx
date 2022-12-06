import counterpart from "counterpart";

import { Tag } from "../../../../../ui/src";

type Props = {
  type: string;
};

export const ActivityAndNotificationTag = ({ type }: Props): JSX.Element => {
  return (
    <Tag key={type}>
      {counterpart.translate(`transaction.trxTypes.${type}.title`)}
    </Tag>
  );
};
