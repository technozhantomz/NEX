import type { NextPage } from "next";
import { useRouter } from "next/router";

import { ActivityTable, Layout } from "../../../../common/components";

import * as Styled from "./UserPage.styled";

const UserPage: NextPage = () => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <Layout
      title="Profile"
      type="card-lrg"
      heading="All Activity"
      description={`Profile Page | ${user}`}
      dexLayout={true}
    >
      <Styled.UserCard>
        <ActivityTable userName={user as string} />
      </Styled.UserCard>
    </Layout>
  );
};

export default UserPage;
