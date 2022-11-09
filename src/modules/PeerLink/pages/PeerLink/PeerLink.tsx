import counterpart from "counterpart";
import { NextPage } from "next";

import { Layout } from "../../../../common/components";
import { usePeerLinkContext } from "../../../../common/providers";
import {
  CheckOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "../../../../ui/src";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";

import * as Styled from "./PeerLink.styled";

const PeerLink: NextPage = () => {
  const { metaMask, connectToMetaMask } = usePeerLinkContext();
  return (
    <Layout
      title={"connect"}
      type="card"
      heading={counterpart.translate(`pages.peerlink.connect.heading`)}
      description="PeerLink Connect"
      layout="peerlink"
    >
      <Styled.ConnectCard>
        <Styled.ConnectButtons>
          <Styled.ConnectButton className="required">
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
          <Styled.ConnectButton
            className={metaMask.isConnected ? "connected" : "required"}
            onClick={connectToMetaMask}
          >
            <MetaMaskIcon width="39" height="39" />
            <Styled.ConnectButtonTextWrapper>
              <Styled.ConnectButtonTitle>
                {counterpart.translate(
                  `pages.peerlink.connect.connect_metamask`
                )}
              </Styled.ConnectButtonTitle>
              <Styled.ConnectButtonStatus
                className={metaMask.isConnected ? "connected" : "required"}
              >
                {metaMask.isConnected
                  ? counterpart.translate(`pages.peerlink.connect.connected`)
                  : counterpart.translate(`pages.peerlink.connect.required`)}
              </Styled.ConnectButtonStatus>
            </Styled.ConnectButtonTextWrapper>
            {metaMask.isConnected ? <CheckOutlined /> : <RightOutlined />}
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
          {metaMask.isConnected ? (
            <Styled.ConnectInfo>
              <InfoCircleOutlined />
              <span>
                Metamask wallet was not found please check your Hive wallet
                plugin and refresh the page
              </span>
            </Styled.ConnectInfo>
          ) : (
            ""
          )}
        </Styled.ConnectInfoWrapper>
        <Styled.ConnectDownloads>
          <p>
            Download{" "}
            <a target="_blank" href="https://hive-keychain.com/">
              Hive Wallet
            </a>{" "}
            or{" "}
            <a target="blank" href="https://metamask.io/download/">
              MetaMask
            </a>
          </p>
        </Styled.ConnectDownloads>
      </Styled.ConnectCard>
    </Layout>
  );
};
export default PeerLink;
