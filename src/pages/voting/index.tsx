import { Tabs } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "../../common/components/PageLayout";
import styles from "../../styles/voting.module.scss";

const Voteing: NextPage = () => {
  const router = useRouter();
  const { TabPane } = Tabs;

  return (
    <Layout title="Voteing">
      <div className={styles.cusContainer}>
        <div className={styles.votingBoxCenterAlign}>
          <div className={styles.votingBox}>
            <h1>Peerplays (GPOS)</h1>
            <div className={styles.childBox}>
              <div className={styles.cusTabChildGrid}>
                <div className={styles.cusTabGridItems}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="GPOS" key="1">
                      <div className={styles.gposRelatedDetails}>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Amet corrupti est cum dolores,
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Amet corrupti est cum dolores, sequi atque{" "}
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Amet corrupti est cum dolores, sequi{" "}
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.{" "}
                        </p>
                        <span>1. Lorem ipsum dolor sit amet consectetur</span>
                        <span>2. Lorem ipsum dolor sit amet consectetur</span>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Amet corrupti est cum dolores,
                        </p>
                      </div>
                      <div className={styles.childMainGrid}>
                        <div className={styles.childMainGridItems}>
                          <div className={styles.textAlignment}>
                            <p>Lorem ipsum dolor</p>
                            <span>0.9999 PPY</span>
                          </div>
                          <div className={styles.textAlignment}>
                            <p>Voting Perfomance</p>
                            <span className={styles.errorColor}>No Rewads</span>
                          </div>
                          <div className={styles.textAlignment}>
                            <p>Lorem ipsum dolor</p>
                            <span>0%</span>
                          </div>
                          <div className={styles.textAlignment}>
                            <p>Lorem ipsum dolor</p>
                            <span>0%</span>
                          </div>
                          <div className={styles.availabelBalance}>
                            <p>Avilable Balance</p>
                            <div className={styles.textAlignment}>
                              <h2>5.96999</h2>
                              <h2>PPY</h2>
                            </div>
                          </div>
                        </div>
                        <div className={styles.childMainGridItems}>
                          <button onClick={() => router.push("/powerup")}>
                            Power UP
                          </button>
                          <button onClick={() => router.push("/powerup")}>
                            Power Down
                          </button>
                          <button>Vote</button>
                          <button>Cancel</button>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Witness" key="2">
                      <span>Witness</span>
                    </TabPane>
                    <TabPane tab="SONs" key="3">
                      <span>SONs</span>
                    </TabPane>
                    <TabPane tab="Advisors" key="4">
                      <span>Advisors</span>
                    </TabPane>
                    <TabPane tab="Proxy" key="5">
                      <span>Proxy</span>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Voteing;
