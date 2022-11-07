import { NextPage } from "next";

import { Layout } from "../../../../common/components";

import * as Styled from "./Transfer.styled";

const PeerLinkTransfer: NextPage = () => {
  return (
    <Layout
      title={"connect"}
      type="card"
      heading={"Transfer"}
      description="PeerLink Transfer"
      layout="peerlink"
    >
      <Styled.TransferCard></Styled.TransferCard>
    </Layout>
  );
};
export default PeerLinkTransfer;
