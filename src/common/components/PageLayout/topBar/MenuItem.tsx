import Link from "next/link";
import React from "react";

<<<<<<< HEAD:src/common/components/PageLayout/topBar/MenuItem.tsx
=======
import { RightOutlined } from "../../../../../../ui/src";

>>>>>>> 7b26a264fb621961ebb8d144cb0d7c6caa670242:src/common/components/PageLayout/TopBar/components/MenuItem/MenuItem.tsx
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
