import { NextPage } from "next";

import { Layout } from "../../../../common/components";

import * as Styled from "./PeerLink.styled";

const PeerLink: NextPage = () => {
  return (
    <Layout
      title={"connect"}
      type="card"
      heading={"Connect"}
      description="PeerLink Connect"
      layout="peerlink"
    >
      <Styled.ConnectCard></Styled.ConnectCard>
    </Layout>
  );
};
export default PeerLink;
