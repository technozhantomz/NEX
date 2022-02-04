import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

import { useUser, useViewport } from "../../context";
import Styles from "../../styles/topbar/mainMenu.module.scss";
import { Contacts, Vote } from "../icons";

import MenuItem from "./MenuItem";

const { Meta } = Card;

const ProfileNav = (): JSX.Element => {
  const { accountData } = useUser();
  const { width } = useViewport();

  return (
    <Card className={Styles.ProfileMenu} bordered={false}>
      <Meta
        avatar={<Avatar>{accountData?.name.charAt(0)}</Avatar>}
        title={<p>Hello {accountData?.name}!</p>}
        description={<p>@{accountData?.name}</p>}
      />
      <ul>
        {width < 414 ? (
          <>
            <li>
              <MenuItem
                Href="/voting"
                Icon={<Vote className={Styles.MenuIcon} />}
                Label="Voting"
              />
            </li>
            <li>
              <MenuItem
                Href="/contacts"
                Icon={<Contacts className={Styles.MenuIcon} />}
                Label="Contacts"
              />
            </li>
          </>
        ) : (
          <li className={Styles.Link}>
            <a>See all account activity</a>
          </li>
        )}

        <li>
          <MenuItem
            Href="/settings"
            Icon={<SettingOutlined className={Styles.MenuIcon} />}
            Label="Settings"
          />
        </li>
        {width < 414 ? (
          <li className={Styles.Link}>
            <a>See all account activity</a>
          </li>
        ) : (
          " "
        )}
        <li className={Styles.Logout}>
          <MenuItem
            Href="/logout"
            Icon={<PoweroffOutlined className={Styles.MenuIcon} />}
            Label="Logout"
          />
        </li>
      </ul>
    </Card>
  );
};

export default ProfileNav;
