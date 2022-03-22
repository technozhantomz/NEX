import Link from "next/link";
import React from "react";

import { RightOutlined } from "../../../../../../ui/src";

interface MenuItemProps {
  Href: string;
  Icon: React.ReactElement;
  Label: string;
}

export const MenuItem = ({ Href, Icon, Label }: MenuItemProps): JSX.Element => {
  return (
    <Link href={Href}>
      <a className={"menu-item"}>
        <div>
          {Icon} {Label}
        </div>
        <div>
          {Href == "/logout" ? (
            " "
          ) : (
            <RightOutlined className={"menu-item-arrow"} />
          )}
        </div>
      </a>
    </Link>
  );
};
