import React from "react";

import {
  BellOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../UserProvider/UserProvider";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";
import { useToggleMenu } from "./hooks/useToggleMenu";

const { useEffect, useRef } = React;

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const {
    toggleMenu,
    closeMenu,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  } = useToggleMenu();

  const wrapperRef = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // setDropDownOpen(false);
        closeMenu();
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <Styled.MainNavBar>
        {localStorageAccount ? (
          <>
            <BellOutlined
              className={"bell"}
              onMouseOver={() => toggleMenu("notify")}
              onClick={() => toggleMenu("notify")}
              ref={wrapperRef}
            />
            <div
              onMouseOver={() => toggleMenu("profile")}
              onClick={() => toggleMenu("profile")}
            >
              <Styled.MainNavBarAvitar
                icon={localStorageAccount ? "" : <UserOutlined />}
              >
                {localStorageAccount ? localStorageAccount.charAt(0) : ""}
              </Styled.MainNavBarAvitar>
            </div>
          </>
        ) : (
          ""
        )}
        <MoreOutlined
          className={"hambuger"}
          onMouseOver={() => toggleMenu("main")}
          onClick={() => toggleMenu("main")}
        />
      </Styled.MainNavBar>
      <Styled.MenuWrapper
        className={`notification-menu-wrapper${
          notificationMenuOpen ? " open" : ""
        }`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <NotificationMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`profile-wrapper${profileMenuOpen ? " open" : ""}`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <ProfileMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`main-menu-wrapper${mainMenuOpen ? " open" : ""}`}
      >
        <a className="close" onClick={closeMenu}>
          X
        </a>
        <MainNav />
      </Styled.MenuWrapper>
    </>
  );
};
