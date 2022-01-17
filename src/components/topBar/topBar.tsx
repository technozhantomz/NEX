import styles from "../../styles/topBar.module.scss";

import MainNav from "./mainNav";

const TopBar = (): JSX.Element => {
  return (
    <nav className={styles.topbar}>
      <div className={styles.topbarLeft}>LOGO HERE</div>
      <div className={styles.topbarCenter}></div>
      <div className={styles.topbarRight}>
        <MainNav />
      </div>
    </nav>
  );
};

export default TopBar;
