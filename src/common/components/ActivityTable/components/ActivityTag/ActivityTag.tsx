import counterpart from "counterpart";
import React from "react";

import { Tag } from "../../../../../ui/src";

type Props = {
  type: string;
};

export const ActivityTag = ({ type }: Props): JSX.Element => {
  return (
    <Tag key={type}>
      {counterpart.translate(`transaction.trxTypes.${type}.title`)}
    </Tag>
  );
};
