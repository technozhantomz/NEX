import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

interface MenuItemProps {
  Href: string;
  Icon: React.ReactElement;
  Label: string;
}

const MenuItem = ({ Href, Icon, Label }: MenuItemProps): JSX.Element => {
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

export default MenuItem;
