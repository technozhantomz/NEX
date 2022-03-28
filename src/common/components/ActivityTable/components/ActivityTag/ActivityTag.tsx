import { Tag } from "../../../../../ui/src";

import { useActivityTag } from "./hooks";

type Props = {
  type: string;
};

export const ActivityTag = ({ type }: Props): JSX.Element => {
  const { getActivityType } = useActivityTag();
  return <Tag key={type}>{getActivityType(type)}</Tag>;
};
