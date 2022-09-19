import { Menu, MenuProps } from "antd";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

export const FeesMenu = (
  <Menu
    onClick={handleMenuClick}
    items={[
      {
        label: "1st menu item",
        key: "1",
      },
      {
        label: "2nd menu item",
        key: "2",
      },
      {
        label: "3rd menu item",
        key: "3",
      },
    ]}
  />
);
