import { MouseEventHandler, ReactElement } from "react";

import { useViewport } from "../../context";
import Styles from "../../styles/topbar/mainNav.module.scss";

interface IMenuWrapper {
  children: ReactElement;
  open: boolean;
  menuClass: string;
  closeMethod: MouseEventHandler;
}

const MenuWrapper = ({
  children,
  open,
  menuClass,
  closeMethod,
}: IMenuWrapper): JSX.Element => {
  const { width } = useViewport();

  return (
    <>
      <div
        className={
          open ? Styles[menuClass] + " " + Styles.Open : Styles[menuClass]
        }
      >
        {width < 414 ? (
          <a className={Styles.close} onClick={closeMethod}>
            X
          </a>
        ) : (
          ""
        )}
        {children}
      </div>
    </>
  );
};

export default MenuWrapper;
