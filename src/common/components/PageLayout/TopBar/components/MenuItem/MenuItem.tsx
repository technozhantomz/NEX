import Link from "next/link";
import React from "react";

import { RightOutlined } from "../../../../../../ui/src";
import { useBrowserHistoryContext } from "../../../../../providers";

interface MenuItemProps {
  href?: string;
  icon: React.ReactElement;
  label: string;
  onClick?: React.MouseEventHandler;
}

export const MenuItem = ({
  href = "#",
  icon,
  label,
  onClick,
}: MenuItemProps): JSX.Element => {
  const { pathname } = useBrowserHistoryContext();
  return (
    <Link href={href}>
      <a
        className={`menu-item ${pathname === href ? "active" : " "}`}
        onClick={onClick}
      >
        <div>
          {icon}
          <span>{label}</span>
        </div>
        {href == "/logout" ? (
          " "
        ) : (
          <div>
            <RightOutlined className={"menu-item-arrow"} />
          </div>
        )}
      </a>
    </Link>
  );
};
