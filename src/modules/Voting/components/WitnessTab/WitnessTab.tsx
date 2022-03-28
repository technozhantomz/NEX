import React from "react";

import * as Styled from "./WitnessTab.styled";
import { Row, Col, Divider } from 'antd';

const style = { background: '#0092ff', padding: '8px 0', border: '2px solid #E2444D', borderRadius: '6px'
};
const style2 = { background: 'red', padding: '8px 0' };

export const WitnessTab = (): JSX.Element => {
  return (
    <Styled.WitnessTabCard>
      <Styled.Text>Vote for Witnesses</Styled.Text>

      <Divider orientation="left">Responsive</Divider>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }}>
        <Col xs={24} sm={4} md={6} lg={6}>
          <div style={style}>Vote for Witnesses</div>
        </Col>
        <Col xs={24} sm={4} md={6} lg={12} >
          {/* <div style={style}>search</div> */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }} style={style}>
            <Col xs={24} sm={4} md={6} lg={6}>
              <div style={style2}>Search accounts</div>
            </Col>
            <Col xs={24} sm={4} md={6} lg={16}>
              <div style={style2}>Add</div>
            </Col>

            <Col xs={24} sm={4} md={6} lg={6}>
              <div style={style2}>reset</div>
            </Col>
            <Col xs={24} sm={4} md={6} lg={16}>
              <div style={style2}>publish</div>
            </Col>
            </Row>
        </Col>
        {/* <Col xs={24} sm={4} md={6} lg={4}>
          <div style={style}>Buttons</div>
          <div style={style}>Buttons</div>
        </Col> */}
       

        {/* <Row>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
          <Col xs={20} sm={16} md={12} lg={8} xl={4}>
            Col
          </Col>
          <Col xs={2} sm={4} md={6} lg={8} xl={10}>
            Col
          </Col>
        </Row>, */}
      </Row>
    </Styled.WitnessTabCard>
  );
};
