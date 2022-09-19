import Icon from "@ant-design/icons";
import { IconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { RefAttributes } from "react";

const KeySVG = () => {
  return (
    <svg width="19" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#647090"
        opacity=".497"
        d="M19.043 12.457l-1.414-1.414-2.5 2.672-1.146-1.146 2.061-2.061-1.414-1.414-2.061 2.061L9.21 7.796l.305-.637a5.007 5.007 0 0 0-.972-5.687A5.005 5.005 0 0 0 1.47 1.47a5.006 5.006 0 0 0 0 7.071 5.007 5.007 0 0 0 5.687.972l.637-.305 8.749 8.749 1.414-1.414-1.414-1.414 2.5-2.672zM7.127 7.127a3.003 3.003 0 0 1-4.243 0 3.003 3.003 0 0 1 0-4.243 3.003 3.003 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243z"
        id="key"
      />
    </svg>
  );
};

const KeyIcon = (
  props: JSX.IntrinsicAttributes &
    IconComponentProps &
    RefAttributes<HTMLSpanElement>
): JSX.Element => {
  return <Icon component={KeySVG} {...props} />;
};

export default KeyIcon;
