import { RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";

import Styles from "../../../../styles/topbar/menuItem.module.scss";

interface MenuItemProps {
  Href: string;
  Icon: React.ReactElement;
  Label: string;
}

const MenuItem = ({ Href, Icon, Label }: MenuItemProps): JSX.Element => {
  return (
    <Link href={Href}>
      <a className={Styles.MenuItem}>
        <div>
          {Icon} {Label}
        </div>
        <div>
          {Href == "/logout" ? (
            " "
          ) : (
            <RightOutlined className={Styles.MenuItemArrow} />
          )}
        </div>
      </a>
    </Link>
  );
};

export default MenuItem;
