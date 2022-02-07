import styles from "../../../../styles/topbar/topBar.module.scss";
import { Logo } from "../../../../ui/src/icons";

import MainNavBar from "./mainNavBar";

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
