import { Col, Divider, Row } from "antd";
import React from "react";
import { Button } from 'antd';
import { Layout } from 'antd';
import { Card } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import Styles from "../styles/Deposit.module.css";

const Dep = (): JSX.Element => {
    return (
        <>

            <Row>
                <Col span={24}>
                    <Card className="cont">
                        <Button className="depositBtn">Primary Button</Button>
                    </Card>
                </Col>
            </Row>


            <Card className="cont1">
                <p>Card content</p>
                <Button className="btn">Primary Button</Button>

            </Card>


            {/* <Layout>
                <Header className="cont">Header</Header>
                <Header className="cont2">Headerr</Header>
            </Layout>

            <Layout>


            </Layout> */}

            {/* <Row className="cont">
                <Col span={24}>col</Col>
            </Row>

            <Row className={Styles.cont}>
                <Col span={24}>col</Col>
            </Row> */}
            {/* <Divider orientation="left"></Divider>

      <Row justify="space-around" className={Styles.content_header}>
        <Col span={6}>Withdraw</Col>
        <Col span={6}>Deposit</Col>
        <Col span={6}>Swap</Col>
        <Col span={6}>Market</Col>
      </Row>

      <Row className={Styles.content_body}>
        <Col span={24}>Withdraw</Col>
      </Row> */}
        </>
    );
};

export default Dep;
