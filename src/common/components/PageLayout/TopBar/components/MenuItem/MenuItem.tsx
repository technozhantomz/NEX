import Link from "next/link";
import React from "react";

import { RightOutlined } from "../../../../../../ui/src";
import { useBrowserHistoryContext } from "../../../../../providers";

interface MenuItemProps {
  Href: string;
  Icon: React.ReactElement;
  Label: string;
}

export const MenuItem = ({ Href, Icon, Label }: MenuItemProps): JSX.Element => {
  const { pathname } = useBrowserHistoryContext();
  return (
    <Link href={Href}>
      <a className={`menu-item ${pathname === Href ? "active" : " "}`}>
        <div>
          {Icon}
          <span>{Label}</span>
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
