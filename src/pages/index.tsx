import type { NextPage } from "next";

import { Layout } from "../common/components/PageLayout";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <Layout title="Home" description="PeerPlays Home Page">
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to Peerplays NEX</h1>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
