import { Tag } from "../../../../../ui/src";

import { useActivityTag } from "./hooks/useActivityTag";

type Props = {
  type: string;
};

export const ActivityTag = ({ type }: Props): JSX.Element => {
  const { getTypeString } = useActivityTag();
  return <Tag key={type}>{getTypeString(type)}</Tag>;
};
