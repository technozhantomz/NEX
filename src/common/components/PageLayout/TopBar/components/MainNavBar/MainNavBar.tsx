import { useRouter } from "next/router";

import {
  Avatar,
  Badge,
  BellOutlined,
  LogoColored,
  MenuOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import HIVEIcon from "../../../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";
import {
  useMenuContext,
  useNotificationsContext,
  usePeerLinkContext,
  useUserContext,
  useViewportContext,
} from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";

export const MainNavBar = (): JSX.Element => {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const { metaMask, hive } = usePeerLinkContext();
  const { sm } = useViewportContext();
  const {
    openMenu,
    closeAllMenus,
    notificationMenuOpen,
    profileMenuOpen,
    mainMenuOpen,
  } = useMenuContext();
  const { hasUnreadMessages } = useNotificationsContext();

  const CloseButton = (
    <>
      {sm ? (
        <Styled.LogoCloseContainer>
          <Styled.LogoContainer>
            <Styled.LogoLink href={"/"}>
              <LogoColored className={"logo"} />
              <h1 className="peer">
                PEER
                <span className="plays">PLAYS</span>
              </h1>
            </Styled.LogoLink>
          </Styled.LogoContainer>
          <Styled.CloseButton
            type="text"
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
            }}
          >
            X
          </Styled.CloseButton>
        </Styled.LogoCloseContainer>
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
    <Styled.PeerLinkWalletBadge>
      <MetaMaskIcon width="25" height="25" />
    </Styled.PeerLinkWalletBadge>
  ) : (
    <Styled.PeerLinkWalletBadge>
      <MetaMaskIcon width="30" height="30" />
      <Styled.PeerLinkWalletAccount>
        {metaMask.selectedAddress}
      </Styled.PeerLinkWalletAccount>
    </Styled.PeerLinkWalletBadge>
  );

  const hiveBadge = sm ? (
    <Styled.PeerLinkWalletBadge>
      <HIVEIcon width="25" height="25" />
    </Styled.PeerLinkWalletBadge>
  ) : (
    <Styled.PeerLinkWalletBadge>
      <HIVEIcon width="30" height="30" />
      <Styled.PeerLinkWalletAccount>
        {hive.userName}
      </Styled.PeerLinkWalletAccount>
    </Styled.PeerLinkWalletBadge>
  );

  const peerLinkBadge = (
    <Styled.PeerLinkBadgeWrapper>
      {hive.isConnected ? hiveBadge : ""}
      {metaMask.isConnected ? metaMaskBadge : ""}
    </Styled.PeerLinkBadgeWrapper>
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
        {router.pathname.includes("peerlink") ? peerLinkBadge : ""}
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
