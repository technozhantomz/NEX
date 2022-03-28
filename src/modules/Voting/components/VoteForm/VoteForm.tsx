import React from "react";

import * as Styled from "./VoteForm.styled";

export const VoteForm = (props: { tab: string }): JSX.Element => {
  return (
    <>
      <Styled.Title>Vote for {props.tab}</Styled.Title>
      <a href="#">
        <Styled.Info />
        <Styled.DetailsLink>See details here</Styled.DetailsLink>
      </a>
      <Styled.FormContainer>
        <Styled.Form>
          <Styled.Row>
            <Styled.Col>
              <Styled.FormItem name="search">
                <Styled.OverlapContainer>
                  <Styled.InputText type="text" placeholder="Search accounts" />
                  <Styled.SearchButton>
                    <Styled.Search id="searchicon" />
                  </Styled.SearchButton>
                </Styled.OverlapContainer>
              </Styled.FormItem>
              <Styled.FormItem name="something">
                <Styled.CardFormLinkButton>
                  <Styled.Reset />
                  Reset Changes
                </Styled.CardFormLinkButton>
              </Styled.FormItem>
            </Styled.Col>
            <Styled.Col>
              <Styled.FormItem name="add button">
                <Styled.CardFormButton>Add</Styled.CardFormButton>
              </Styled.FormItem>
              <Styled.FormItem name="else">
                <Styled.CardFormButton>Publish Changes</Styled.CardFormButton>
              </Styled.FormItem>
            </Styled.Col>
          </Styled.Row>
        </Styled.Form>
      </Styled.FormContainer>
    </>
  );
};
