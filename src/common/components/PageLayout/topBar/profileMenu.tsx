import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

import { useUser, useViewport } from "../../../../context";
import * as Styled from "../../../../ui/src";
import { Contacts, Vote } from "../../../../ui/src/icons";

import MenuItem from "./MenuItem";

const { Meta } = Card;

const ProfileNav = (): JSX.Element => {
  const { accountData } = useUser();
  const { width } = useViewport();

  return (
    <Styled.MenuCard bordered={false}>
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
                Icon={<Vote className={"menu-icon"} />}
                Label="Voting"
              />
            </li>
            <li>
              <MenuItem
                Href="/contacts"
                Icon={<Contacts className={"menu-icon"} />}
                Label="Contacts"
              />
            </li>
          </>
        ) : (
          <li className={"link"}>
            <a>See all account activity</a>
          </li>
        )}

        <li>
          <MenuItem
            Href="/settings"
            Icon={<SettingOutlined className={"menu-icon"} />}
            Label="Settings"
          />
        </li>
        {width < 414 ? (
          <li className={"link"}>
            <a>See all account activity</a>
          </li>
        ) : (
          " "
        )}
        <li className={"logout"}>
          <MenuItem
            Href="/logout"
            Icon={<PoweroffOutlined className={"menu-icon"} />}
            Label="Logout"
          />
        </li>
      </ul>
    </Styled.MenuCard>
  );
};

export default ProfileNav;
