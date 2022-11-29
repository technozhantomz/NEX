import counterpart from "counterpart";
import type { NextPage } from "next";
import React, { useState } from "react";

import { Layout } from "../../../../common/components";
import { useViewportContext } from "../../../../common/providers";

import * as Styled from "./ProfilePage.styled";

const ProfilePage: NextPage = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { sm } = useViewportContext();

  return (
    <Layout
      title="Profile"
      type="card-lrg"
      heading={counterpart.translate(`pages.profile.heading`)}
      description="Profile"
      dexLayout={true}
      onClick={() => {
        if (sm) {
          visible && setVisible(false);
        }
      }}
    >
      <Styled.ProfileCard>
        <p>Profile Page</p>
      </Styled.ProfileCard>
    </Layout>
  );
};
export default ProfilePage;
