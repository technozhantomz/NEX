import {
  BellOutlined,
  Dropdown,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();

  return (
    <>
      <Styled.MainNavBar>
        {localStorageAccount ? (
          <>
            <Dropdown overlay={<NotificationMenu />}>
              <BellOutlined className={"bell"} />
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
