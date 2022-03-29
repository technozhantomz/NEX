import { Input } from "antd";
import React from "react";

import * as Styled from "./ActionForm.styled";

const { Search } = Input;

export const ActionForm = (): JSX.Element => {
  return (
    <Styled.ActionFormTabCard>
      <Styled.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }}>
        <Styled.Col xs={24} sm={4} md={6} lg={6}>
          <Styled.TitleDiv>
            <Styled.Title>Vote for Witnesses</Styled.Title>
            <Styled.DetailsTitle>See details here</Styled.DetailsTitle>
          </Styled.TitleDiv>
        </Styled.Col>
        <Styled.Col xs={24} sm={4} md={6} lg={12}>
          <Styled.Form>
            <Styled.Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 12 }, 20]}>
              <Styled.Col
                xs={{ span: 24, order: 1 }}
                md={{ span: 14, order: 1 }}
              >
                <Search placeholder="input search text" allowClear />
              </Styled.Col>

              <Styled.Col
                xs={{ span: 24, order: 2 }}
                md={{ span: 10, order: 2 }}
              >
                <Styled.Button type="primary" htmlType="submit">
                  Add
                </Styled.Button>
              </Styled.Col>

              <Styled.Col
                xs={{ span: 24, order: 4 }}
                md={{ span: 14, order: 3 }}
              >
                <Styled.DetailsTitle>Reset Changes</Styled.DetailsTitle>
              </Styled.Col>

              <Styled.Col
                xs={{ span: 24, order: 3 }}
                md={{ span: 10, order: 4 }}
              >
                <Styled.Button type="primary" htmlType="submit">
                  Publish Changes
                </Styled.Button>
              </Styled.Col>
            </Styled.Row>
          </Styled.Form>
        </Styled.Col>
      </Styled.Row>
    </Styled.ActionFormTabCard>
  );
};
