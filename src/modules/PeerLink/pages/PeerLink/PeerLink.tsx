import { NextPage } from "next";

import { Layout } from "../../../../common/components";
import {
  CheckOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "../../../../ui/src";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";

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
      <Styled.ConnectCard>
        <Styled.ConnectButtons>
          <Styled.ConnectButton>
            <HIVEIcon width="39" height="39" />
            <Styled.ConnectButtonTextWrapper>
              <Styled.ConnectButtonTitle>
                Connect Hive wallet
              </Styled.ConnectButtonTitle>
              <Styled.ConnectButtonStatus className="required">
                Required
              </Styled.ConnectButtonStatus>
            </Styled.ConnectButtonTextWrapper>
            <RightOutlined />
          </Styled.ConnectButton>
          <Styled.ConnectButton className="connected">
            <MetaMaskIcon width="39" height="39" />
            <Styled.ConnectButtonTextWrapper>
              <Styled.ConnectButtonTitle>
                Connect MetaMask
              </Styled.ConnectButtonTitle>
              <Styled.ConnectButtonStatus className="connected">
                connected
              </Styled.ConnectButtonStatus>
            </Styled.ConnectButtonTextWrapper>
            <CheckOutlined />
          </Styled.ConnectButton>
        </Styled.ConnectButtons>
        <Styled.ConnectInfoWrapper>
          <Styled.ConnectInfo>
            <InfoCircleOutlined />
            <span>
              Hive wallet and Metamask are required to transfer tokens
              cross-chain <a>Why?</a>
            </span>
          </Styled.ConnectInfo>
          <Styled.ConnectInfo>
            <InfoCircleOutlined />
            <span>
              Hive wallet was not found please check your Hive wallet plugin and
              refresh the page
            </span>
          </Styled.ConnectInfo>
          <Styled.ConnectInfo>
            <InfoCircleOutlined />
            <span>
              Metamask wallet was not found please check your Hive wallet plugin
              and refresh the page
            </span>
          </Styled.ConnectInfo>
        </Styled.ConnectInfoWrapper>
        <Styled.ConnectDownloads>
          <p>
            Download{" "}
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep"
            >
              Hive Wallet
            </a>{" "}
            or{" "}
            <a
              target="blank"
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
            >
              MetaMask
            </a>
          </p>
        </Styled.ConnectDownloads>
      </Styled.ConnectCard>
    </Layout>
  );
};
export default PeerLink;
