import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { FormDisclamer } from "../../../../common/components/FormDisclamer";
import { Layout } from "../../../../common/components/PageLayout";
import { Card } from "../../../../ui/src";
import { SignUpForm } from "../../components/SignUpForm";

// import * as Styled from "./SignUpPage.styled";

const SignUpPage: NextPage = () => {
  return (
    <Layout title="SignUp" type="card" heading="Create your account">
      <Card>
        <SignUpForm />
        <FormDisclamer>
          <span>Already have a Peerplays account? </span>
          <Link href="/login">
            <a>Log in</a>
          </Link>
        </FormDisclamer>
      </Card>
    </Layout>
  );
};

export default SignUpPage;
