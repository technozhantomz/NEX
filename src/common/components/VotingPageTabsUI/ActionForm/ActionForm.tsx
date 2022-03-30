import React from "react";

import * as Styled from "./ActionForm.styled";

export const ActionForm = (): JSX.Element => {
  return (
    <Styled.ActionFormTabCard>
      <Styled.Row gutter={{ xs: 8, sm: 16, md: 24, lg: 12 }}>
        <Styled.Col xs={24} sm={4} md={6} lg={6}>
          <Styled.TitleDiv>
            <Styled.Space direction="vertical">
              <Styled.Title strong>Vote for witness</Styled.Title>
              <Styled.Link>
                <Styled.Info />
                <Styled.DetailsLink>See details here</Styled.DetailsLink>
              </Styled.Link>
            </Styled.Space>
          </Styled.TitleDiv>
        </Styled.Col>
        <Styled.Col xs={24} sm={4} md={6} lg={12}>
          <Styled.Form>
            <Styled.Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 12 }, 20]}>
              <Styled.Col
                xs={{ span: 24, order: 1 }}
                md={{ span: 14, order: 1 }}
              >
                <Styled.FormItem>
                  <Styled.SearchInput
                    placeholder="Search accounts"
                    allowClear
                  />
                </Styled.FormItem>
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
                <Styled.ResetBtnDiv>
                  <Styled.Link>
                    <Styled.Reset />
                    <Styled.ResetLink>Reset Changes</Styled.ResetLink>
                  </Styled.Link>
                </Styled.ResetBtnDiv>
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
