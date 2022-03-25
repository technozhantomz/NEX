import { Tabs } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import NumericInput from "react-numeric-input";

import { Layout } from "../../common/components/PageLayout";
import styles from "../../styles/voting.module.scss";

const PowerUp: NextPage = () => {
  const router = useRouter();
  const { TabPane } = Tabs;

  return (
    <Layout title="Voteing">
      <div className={styles.cusContainer}>
        <div className={styles.votingBoxCenterAlign}>
          <div className={styles.votingBox}>
            <h1>Peerplays (GPOS)</h1>
            <div className={styles.childBox}>
              <div className={styles.cusTabGrid}>
                <div className={styles.cusTabGridItems}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Power UP" key="1">
                      <div className={styles.detailsAlignment}>
                        <span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Iste nam at distinctio nihil deleniti quo,
                          repellendus ipsam recusandae velit, a mollitia modi
                          exercitationem non dolorum enim et nostrum similique
                          aliquam!
                        </span>
                        <ul>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                        </ul>
                        <div className={styles.balanceTopAlign}>
                          <div className={styles.openingBalance}>
                            <p>Opening Balance:</p>
                            <p>5.999999PPY</p>
                          </div>
                        </div>
                        <div className={styles.deposit}>
                          <span>Deposit</span>
                        </div>
                        <div className={styles.counterInput}>
                          <NumericInput
                            strict={true}
                            mobile
                            type="number"
                            className="field__input form-control cpointer"
                            min={0}
                            step={1}
                            value={1}
                          />
                        </div>
                        <div className={styles.openingBalance}>
                          <p>Opening Balance:</p>
                          <p>5.999999 PPY</p>
                        </div>
                        <div className={styles.buttonCenterAlign}>
                          <div>
                            <button>Vest</button>
                          </div>
                          <div>
                            <button onClick={() => router.push("/voting")}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Power Down" key="2">
                      <div className={styles.detailsAlignment}>
                        <span>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Iste nam at distinctio nihil deleniti quo,
                          repellendus ipsam recusandae velit, a mollitia modi
                          exercitationem non dolorum enim et nostrum similique
                          aliquam!
                        </span>
                        <ul>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>Lorem ipsum dolor sit amet consectetur </li>
                          <li>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit.
                          </li>
                        </ul>
                        <div className={styles.balanceTopAlign}>
                          <div className={styles.openingBalance}>
                            <p>Opening Balance:</p>
                            <p>5.999999 PPY</p>
                          </div>
                        </div>
                        <div className={styles.balanceTopAlign}>
                          <div className={styles.openingBalance}>
                            <p>Available Balance:</p>
                            <p>3.00000 PPY</p>
                          </div>
                        </div>
                        <div className={styles.deposit}>
                          <span>Withdraw</span>
                        </div>
                        <div className={styles.counterInput}>
                          {/* <input placeholder="1000" type="text" /> */}
                          <NumericInput
                            strict={true}
                            mobile
                            type="number"
                            className="field__input form-control cpointer"
                            min={0}
                            step={1}
                            value={1}
                          />
                        </div>
                        <div className={styles.openingBalance}>
                          <p>Opening Balance:</p>
                          <p>5.999999PPY</p>
                        </div>
                        <div className={styles.buttonCenterAlign}>
                          <div>
                            <button>Withdraw</button>
                          </div>
                          <div>
                            <button onClick={() => router.push("/voting")}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Voting" key="3">
                      <span>Voting</span>
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

export default PowerUp;
