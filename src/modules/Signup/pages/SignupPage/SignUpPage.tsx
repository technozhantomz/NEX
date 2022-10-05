import counterpart from "counterpart";
import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "../../../../common/components";
import { FormDisclamer } from "../../../../common/components/FormDisclamer";
import { SignUpForm } from "../../components/SignUpForm";

import * as Styled from "./SignUpPage.styled";

const SignUpPage: NextPage = () => {
  return (
    <Layout
      title="SignUp"
      type="card"
      heading={counterpart.translate(`pages.signUp.heading`)}
    >
      <Styled.SignUpFormCard>
        <SignUpForm />
        <Styled.FormDisclamerContainer>
          <FormDisclamer>
            <span>
              {counterpart.translate(`pages.signUp.already_have_account`)}
            </span>
            <Link href="/login">
              <a>{counterpart.translate(`buttons.login`)}</a>
            </Link>
          </FormDisclamer>
        </Styled.FormDisclamerContainer>
      </Styled.SignUpFormCard>
    </Layout>
  );
};
export default SignUpPage;
