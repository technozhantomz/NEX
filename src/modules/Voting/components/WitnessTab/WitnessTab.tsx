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
      {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }}>

        <Col xs={24} sm={4} md={6} lg={6}>
          <div style={style}>Vote for Witnesses</div>
        </Col>
        <Col xs={24} sm={4} md={6} lg={12} > */}
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }} style={style}>
        <Col xs={24} sm={4} md={6} lg={6}>
        {/* <Col xs={24} sm={4} md={6} lg={6}> */}
          <div style={style}>Vote for Witnesses</div>
        {/* </Col> */}
        </Col>

        <Col xs={24} lg={18}>
            <Col xs={{ span: 24, order: 1 }}  md={{ span: 6, order: 1 }}>
              
              <div style={style2}>Search accounts</div>
            </Col>

            <Col xs={{ span: 24, order: 2 }}  md={{ span: 4, order: 2 }}>
              <div style={style2}>Add</div>
            </Col>

            <Col xs={{ span: 24, order: 4 }}  md={{ span: 6, order: 3 }}>
              <div style={style2}>reset</div>
            </Col>

            <Col xs={{ span: 24, order: 3 }}  md={{ span: 16, order: 4 }}>
              <div style={style2}>publish</div>
            </Col>
        </Col>
            </Row>
        {/* </Col>
        
      </Row> */}

    </Styled.WitnessTabCard>
  );
};
