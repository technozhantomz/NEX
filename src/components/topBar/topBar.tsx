import styles from "../../styles/topBar.module.scss";
import Logo from "../icons/logo";

import MainNavBar from "./mainNav";

const TopBar = (): JSX.Element => {
  return (
    <nav className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <Logo className={styles.Logo} />
      </div>
      <div className={styles.topbarRight}>
        <MainNavBar />
      </div>
    </nav>
  );
};

export default TopBar;
