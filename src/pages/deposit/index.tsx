import { Button, Card, Col, Row } from "antd";
import type { NextPage } from "next";

import Layout from "../../components/layout";
import Styles from "../../styles/deposit.module.scss";

const Deposit: NextPage = () => {
  return (
    <Layout title="Deposit">
      <Row>
        <Col span={12} className={Styles.header_container}>
          <Card className={Styles.content_header}>
            <div>
              <Button className={Styles.deposit_btn}>Deposit</Button>
              <Button className={Styles.deposit_btn}>Withdraw</Button>
              <Button className={Styles.deposit_btn}>Swap</Button>
              <Button className={Styles.deposit_btn}>Market</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col span={12} className={Styles.header_container}>
          <Card className={Styles.content_body}></Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Deposit;
