import counterpart from "counterpart";
import { NextPage } from "next";
import Link from "next/link";

import { ETHEREUM_NETWORK, HIVE_NETWORK } from "../../../../api/params";
import {
  Layout,
  PasswordModal,
  TransactionModal,
} from "../../../../common/components";
import { useHandleTransactionForm } from "../../../../common/hooks";
import {
  usePeerLinkContext,
  useUserContext,
} from "../../../../common/providers";
import {
  CheckOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "../../../../ui/src";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";

import * as Styled from "./PeerLink.styled";
import { usePeerLink } from "./hooks";

const PeerLink: NextPage = () => {
  const { metaMask, hive, connectToMetaMask, connectToHive } =
    usePeerLinkContext();
  const { localStorageAccount } = useUserContext();
  const {
    peerLinkConnectForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    handleConnect,
  } = usePeerLink();
  const {
    isPasswordModalVisible,
    isTransactionModalVisible,
    showPasswordModal,
    hidePasswordModal,
    handleFormFinish,
    hideTransactionModal,
  } = useHandleTransactionForm({
    handleTransactionConfirmation: handleConnect,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    neededKeyType: "active",
  });

  return (
    <Layout
      title={"connect"}
      type="card"
      heading={counterpart.translate(`pages.peerlink.connect.heading`)}
      description="PeerLink Connect"
      layout="peerlink"
    >
      <Styled.ConnectForm.Provider onFormFinish={handleFormFinish}>
        <Styled.ConnectForm
          form={peerLinkConnectForm}
          name="PeerLinkConnectForm"
          onFinish={showPasswordModal}
        >
          <Styled.ConnectCard>
            <Styled.ConnectButtons>
              <Styled.ConnectButton
                className={hive.isConnected ? "connected" : "required"}
                onClick={connectToHive}
              >
                <HIVEIcon width="39" height="39" />
                <Styled.ConnectButtonTextWrapper>
                  <Styled.ConnectButtonTitle>
                    {counterpart.translate(
                      `pages.peerlink.connect.connect_hive`
                    )}
                  </Styled.ConnectButtonTitle>
                  <Styled.ConnectButtonStatus
                    className={hive.isConnected ? "connected" : "required"}
                  >
                    {hive.isConnected
                      ? counterpart.translate(
                          `pages.peerlink.connect.connected`
                        )
                      : counterpart.translate(
                          `pages.peerlink.connect.required`
                        )}
                  </Styled.ConnectButtonStatus>
                </Styled.ConnectButtonTextWrapper>
                {hive.isConnected ? <CheckOutlined /> : <RightOutlined />}
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
                      ? counterpart.translate(
                          `pages.peerlink.connect.connected`
                        )
                      : counterpart.translate(
                          `pages.peerlink.connect.required`
                        )}
                  </Styled.ConnectButtonStatus>
                </Styled.ConnectButtonTextWrapper>
                {metaMask.isConnected ? <CheckOutlined /> : <RightOutlined />}
              </Styled.ConnectButton>
            </Styled.ConnectButtons>
            <Styled.ConnectInfoWrapper>
              {localStorageAccount ? (
                ""
              ) : (
                <Styled.ConnectInfo>
                  <InfoCircleOutlined />
                  <span>
                    A PeerPlays Account is Required you can{" "}
                    <Link href={"/login"}>Login</Link> or we will create an
                    account for you using your hive account name.
                  </span>
                </Styled.ConnectInfo>
              )}
              {hive.isConnected ? (
                ""
              ) : (
                <Styled.ConnectInfo>
                  <InfoCircleOutlined />
                  <span>Connect Hive Wallet</span>
                </Styled.ConnectInfo>
              )}
              {metaMask.isConnected ? (
                ""
              ) : (
                <Styled.ConnectInfo>
                  <InfoCircleOutlined />
                  <span>
                    Metamask wallet was not found please check your Hive wallet
                    plugin and refresh the page
                  </span>
                </Styled.ConnectInfo>
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
        </Styled.ConnectForm>
        <PasswordModal
          visible={isPasswordModalVisible}
          onCancel={hidePasswordModal}
          neededKeyType="active"
        />
        <TransactionModal
          visible={isTransactionModalVisible}
          onCancel={hideTransactionModal}
          transactionErrorMessage={transactionErrorMessage}
          transactionSuccessMessage={transactionSuccessMessage}
          loadingTransaction={loadingTransaction}
          account={localStorageAccount}
          fee={0}
          sidechains={[HIVE_NETWORK, ETHEREUM_NETWORK]}
          transactionType="peer_link_connect"
        />
      </Styled.ConnectForm.Provider>
    </Layout>
  );
};
export default PeerLink;
