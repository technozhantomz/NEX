import { Badge } from "antd";

import {
  Avatar,
  BellOutlined,
  Dropdown,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { useNotification } from "../../../../Notifications/hooks";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();
  const { unreadMessages } = useNotification({
    userName: localStorageAccount,
    isWalletActivityTable: false,
  });
  return (
    <>
      <Styled.MainNavBar>
        {localStorageAccount ? (
          <>
            <Dropdown overlay={<NotificationMenu />}>
              {unreadMessages.length ? (
                <Badge dot>
                  <Avatar icon={<BellOutlined className={"bell"} />} />
                </Badge>
              ) : (
                <BellOutlined className={"bell"} />
              )}
            </Dropdown>

            <Dropdown overlay={<ProfileMenu />}>
              <Styled.MainNavBarAvitar
                icon={localStorageAccount ? "" : <UserOutlined />}
              >
                {localStorageAccount
                  ? localStorageAccount.charAt(0).toUpperCase()
                  : ""}
              </Styled.MainNavBarAvitar>
            </Dropdown>
          </>
        ) : (
          ""
        )}

        <Dropdown overlay={<MainNav />}>
          <MoreOutlined className={"hambuger"} />
        </Dropdown>
      </Styled.MainNavBar>
    </>
  );
};
