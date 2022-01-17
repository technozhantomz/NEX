import Icon from "@ant-design/icons";

import NavIcon from "../../../public/icons/nav.svg";
// import Image from "next/image";
// import Link from "next/link";
import Styles from "../../styles/mainMenu.module.scss";

import Avitar from "./avitar";

const MainNav = (): JSX.Element => {
  return (
    <div className={Styles.MainNav}>
      {/* <Icon component={NavIcon} /> */}
      <Avitar />
    </div>
  );
};

export default MainNav;
