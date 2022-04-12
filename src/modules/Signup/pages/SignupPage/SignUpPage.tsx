import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { Layout } from "../../../../common/components";
import { SignUpForm } from "../../components/SignUpForm";

import * as Styled from "./SignUpPage.styled";

const SignUpPage: NextPage = () => {
  return (
    <Layout title="SignUp" type="card" heading="Create your account">
      <Styled.SignUpFormCard>
        <SignUpForm />
        <Styled.FormDisclamer>
          <span>Already have a Peerplays account? </span>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </Styled.FormDisclamer>
      </Styled.SignUpFormCard>
    </Layout>
  );
};
export default SignUpPage;
