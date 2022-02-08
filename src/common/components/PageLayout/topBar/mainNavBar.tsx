import { BellOutlined, MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

import { useUser } from "../../../../context";

import { useNavBar } from "./hooks";
import MainNav from "./mainMenu";
import * as Styled from "./mainNavBar.styled";
import MenuWrapper from "./menuWrapper";
import NotificationMenu from "./notificationMenu";
import ProfileNav from "./profileMenu";

const MainNavBar = (): JSX.Element => {
  const { toggleMenu } = useNavBar();
  const { accountData } = useUser();

  return (
    <>
      <Styled.MainNavBar>
        <BellOutlined
          className={"bell"}
          onMouseOver={() => toggleMenu("notify")}
          onClick={() => toggleMenu("notify")}
        />
        {accountData !== undefined ? (
          <div
            onMouseOver={() => toggleMenu("profile")}
            onClick={() => toggleMenu("profile")}
          >
            <Avatar icon={accountData !== undefined ? "" : <UserOutlined />}>
              {accountData !== undefined ? accountData.name.charAt(0) : ""}
            </Avatar>
          </div>
        ) : (
          ""
        )}
        <MoreOutlined
          className={"hambuger"}
          onMouseOver={() => toggleMenu("main")}
          onClick={() => toggleMenu("main")}
        />
      </Styled.MainNavBar>
      <MenuWrapper menuName={"notify"}>
        <NotificationMenu />
      </MenuWrapper>
      <MenuWrapper menuName={"profile"}>
        <ProfileNav />
      </MenuWrapper>
      <MenuWrapper menuName={"main"}>
        <MainNav />
      </MenuWrapper>
    </>
  );
};

export default MainNavBar;
