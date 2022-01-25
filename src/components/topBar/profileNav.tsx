import { PoweroffOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card, Menu } from "antd";
import Link from "next/link";

const { Meta } = Card;

const ProfileNav = (): JSX.Element => {
  return (
    <Menu>
      <Menu.Item key="profile">
        <Card>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Card title"
            description="This is the description"
          />
        </Card>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link href="/settings">
          <a>
            <SettingOutlined /> Settings
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="logout">
        <Link href="/logout">
          <a>
            <PoweroffOutlined /> Logout
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default ProfileNav;
