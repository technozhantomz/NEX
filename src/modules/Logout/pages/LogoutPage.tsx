import type { NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";

import { FormDisclamer, Layout } from "../../../common/components";
import { useAccount } from "../../../common/hooks";

import * as Styled from "./LogoutPage.styled";

const LogoutPage: NextPage = () => {
  const { removeAccount } = useAccount();

  useEffect(() => {
    removeAccount();
  }, []);

  return (
    <Layout title="Logout" type="card" heading="Logout">
      <Styled.LogoutCard>
        <p>You have successfully logged out</p>
        <Link href="/login" passHref={true}>
          <Styled.LogoutButton type="primary">Log in</Styled.LogoutButton>
        </Link>
        <FormDisclamer>
          <span>Don't have an account? </span>
          <Link href="/signup">
            <a>Create account</a>
          </Link>
        </FormDisclamer>
      </Styled.LogoutCard>
    </Layout>
  );
};

export default LogoutPage;
