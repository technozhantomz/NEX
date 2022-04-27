import { Dropdown } from "antd";

import {
  BellOutlined,
  MoreOutlined,
  UserOutlined,
} from "../../../../../../ui/src";
import { useUserContext } from "../../../../../providers";
import { MainNav } from "../MainNav";
import { NotificationMenu } from "../NotificationMenu";
import { ProfileMenu } from "../ProfileMenu";

import * as Styled from "./MainNavBar.styled";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

export const MainNavBar = (): JSX.Element => {
  const { localStorageAccount } = useUserContext();

  return (
    // <>
    //   <Styled.MainNavBar>
    //     {localStorageAccount ? (
    //       <>
    //         <Dropdown overlay={<NotificationMenu />}>
    //           <BellOutlined className={"bell"} />
    //         </Dropdown>

    //         <Dropdown overlay={<ProfileMenu />}>
    //           <Styled.MainNavBarAvitar
    //             icon={localStorageAccount ? "" : <UserOutlined />}
    //           >
    //             {localStorageAccount
    //               ? localStorageAccount.charAt(0).toUpperCase()
    //               : ""}
    //           </Styled.MainNavBarAvitar>
    //         </Dropdown>
    //       </>
    //     ) : (
    //       ""
    //     )}

    //     <Dropdown overlay={<MainNav />} >
    //       <MoreOutlined className={"hambuger"} />
    //     </Dropdown>
    //
    
    <>
      <Styled.MainNavBar>
        
        <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
          {/* <Menu.Item key="mail" icon={<MailOutlined />}>
            Navigation One
          </Menu.Item> */}
          <Menu.SubMenu key="SubMenu" title="Navigation Two - Submenu" icon={<SettingOutlined />}>
            
            <Menu.Item key="two" icon={<AppstoreOutlined />}>
              <a className="close" >
                X
              </a>
              Navigation Two
            </Menu.Item>
            <Menu.Item key="three" icon={<AppstoreOutlined />}>
              Navigation Three
            </Menu.Item>
            <Menu.ItemGroup title="Item Group">
              <Menu.Item key="four" icon={<AppstoreOutlined />}>
                Navigation Four
              </Menu.Item>
              <Menu.Item key="five" icon={<AppstoreOutlined />}>
                Navigation Five
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu.SubMenu>
        </Menu>
     </Styled.MainNavBar >
    </>
  );
};
