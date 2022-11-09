import {
  Avatar,
  Badge,
  BellOutlined,
  MenuOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
// import HIVEIcon from "../../../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";
import {
  useMenuContext,
  usePeerLinkContext,
  useUserContext,
  useUserSettingsContext,
  useViewportContext,
} from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { metaMask } = usePeerLinkContext();
  const { sm } = useViewportContext();
  const {
    openMenu,
    closeAllMenus,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  } = useMenuContext();
  const { hasUnreadMessages } = useUserSettingsContext();

  const CloseButton = (
    <>
      {sm ? (
        <Styled.CloseButton
          type="text"
          className="close"
          onClick={closeAllMenus}
        >
          X
        </Styled.CloseButton>
      ) : (
        ""
      )}
    </>
  );

  const notificationItem = hasUnreadMessages ? (
    <>
      <Badge dot>
        <Avatar
          icon={
            <BellOutlined
              onMouseOver={() => openMenu("notify")}
              onClick={(e) => {
                e.stopPropagation();
                openMenu("notify");
              }}
            />
          }
        />
      </Badge>
    </>
  ) : (
    <>
      <Avatar
        icon={
          <BellOutlined
            onMouseOver={() => openMenu("notify")}
            onClick={(e) => {
              e.stopPropagation();
              openMenu("notify");
            }}
          />
        }
      />
    </>
  );

  const profileItem = sm ? (
    ""
  ) : (
    <div
      onMouseOver={() => openMenu("profile")}
      onClick={(e) => {
        e.stopPropagation();
        openMenu("profile");
      }}
    >
      <Styled.MainNavBarAvatar
        icon={localStorageAccount ? "" : <UserOutlined />}
      >
        {localStorageAccount ? localStorageAccount.charAt(0) : ""}
      </Styled.MainNavBarAvatar>
    </div>
  );

  const metaMaskBadge = sm ? (
    <div>
      <MetaMaskIcon width="39" height="39" />
    </div>
  ) : (
    <div>
      <MetaMaskIcon width="39" height="39" />
      {metaMask.selectedAddress}
    </div>
  );

  const userItems = (
    <>
      {notificationItem}
      {profileItem}
    </>
  );

  const mainMenuItem = sm ? (
    <MenuOutlined
      className={"hambuger"}
      onMouseOver={() => openMenu("main")}
      onClick={(e) => {
        e.stopPropagation();
        openMenu("main");
      }}
    />
  ) : (
    <MoreOutlined
      className={"hambuger"}
      onMouseOver={() => openMenu("main")}
      onClick={(e) => {
        e.stopPropagation();
        openMenu("main");
      }}
    />
  );

  return (
    <>
      <Styled.MainNavBar>
        {metaMask.isConnected ? metaMaskBadge : ""}
        {localStorageAccount ? userItems : ""}
        {mainMenuItem}
      </Styled.MainNavBar>
      <Styled.MenuWrapper
        className={`notification-menu-wrapper${
          notificationMenuOpen ? " open" : ""
        }`}
      >
        {CloseButton}
        <NotificationMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`profile-wrapper${profileMenuOpen ? " open" : ""}`}
      >
        {CloseButton}
        <ProfileMenu />
      </Styled.MenuWrapper>
      <Styled.MenuWrapper
        className={`main-menu-wrapper${mainMenuOpen ? " open" : ""}`}
      >
        {CloseButton}
        <MainNav />
      </Styled.MenuWrapper>
    </>
  );
};
