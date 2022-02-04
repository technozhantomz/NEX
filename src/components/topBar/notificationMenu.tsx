import { Card } from "antd";

// import { useUser } from "../../context";
import Styles from "../../styles/topbar/mainMenu.module.scss";

const NotificationMenu = (): JSX.Element => {
  //const { accountData } = useUser();

  return (
    <Card className={Styles.NotifiMenu} bordered={false}>
      <div>FPO</div>
    </Card>
  );
};

export default NotificationMenu;
