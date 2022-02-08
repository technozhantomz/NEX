import { ReactElement } from "react";

import { useNavBar } from "./hooks";
import { IMenus } from "./hooks/useNaveBar.type";
import * as Styled from "./menuWrapper.styled";

interface IMenuWrapper {
  children: ReactElement;
  menuName: string;
}

const MenuWrapper = ({ children, menuName }: IMenuWrapper): JSX.Element => {
  const { menus, closeMenu } = useNavBar();
  const menu = menus[menuName as keyof IMenus];

  return (
    <Styled.MenuWrapper className={menu.className + (menu.open ? " open" : "")}>
      <a className="close" onClick={closeMenu}>
        X
      </a>
      {children}
    </Styled.MenuWrapper>
  );
};

export default MenuWrapper;
