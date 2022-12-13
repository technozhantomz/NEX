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
  CheckOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from "../../../../ui/src";
import HIVEIcon from "../../../../ui/src/icons/Cryptocurrencies/HIVEIcon.svg";
import MetaMaskIcon from "../../../../ui/src/icons/Cryptocurrencies/MetaMaskIcon.svg";

import * as Styled from "./PeerLink.styled";
import { usePeerLink } from "./hooks";

const PeerLink: NextPage = () => {
  const {
    metaMask,
    hiveKeyChain,
    localStorageAccount,
    peerLinkConnectForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    loadingTransaction,
    handleConnect,
    connectToMetaMask,
    connectToHiveKeyChain,
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
                className={hiveKeyChain.isConnected ? "connected" : "required"}
                onClick={connectToHiveKeyChain}
              >
                <HIVEIcon width="39" height="39" />
                <Styled.ConnectButtonTextWrapper>
                  <Styled.ConnectButtonTitle>
                    {counterpart.translate(
                      `pages.peerlink.connect.connect_hive`
                    )}
                  </Styled.ConnectButtonTitle>
                  <Styled.ConnectButtonStatus
                    className={
                      hiveKeyChain.isConnected ? "connected" : "required"
                    }
                  >
                    {hiveKeyChain.isConnected
                      ? counterpart.translate(
                          `pages.peerlink.connect.connected`
                        )
                      : counterpart.translate(
                          `pages.peerlink.connect.required`
                        )}
                  </Styled.ConnectButtonStatus>
                </Styled.ConnectButtonTextWrapper>
                {hiveKeyChain.isConnected ? (
                  <CheckOutlined />
                ) : (
                  <RightOutlined />
                )}
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
                    {counterpart.translate(
                      "pages.peerlink.connect.peerplays_required"
                    )}
                    <Link href={"/login"}>
                      {counterpart.translate("links.login")}
                    </Link>{" "}
                    {counterpart.translate("general.or")}{" "}
                    <Link href={"/signup"}>
                      {counterpart.translate("links.create_account")}
                    </Link>
                  </span>
                </Styled.ConnectInfo>
              )}
              {hiveKeyChain.isConnected ? (
                ""
              ) : (
                <Styled.ConnectInfo>
                  <InfoCircleOutlined />
                  <span>
                    {counterpart.translate(
                      "pages.peerlink.connect.hive_required"
                    )}
                  </span>
                </Styled.ConnectInfo>
              )}
              {metaMask.isConnected ? (
                ""
              ) : (
                <Styled.ConnectInfo>
                  <InfoCircleOutlined />
                  <span>
                    {counterpart.translate(
                      "pages.peerlink.connect.metamask_required"
                    )}
                  </span>
                </Styled.ConnectInfo>
              )}
            </Styled.ConnectInfoWrapper>
            <Styled.ConnectDownloads>
              <p>
                {counterpart.translate("general.download")}{" "}
                <a target="_blank" href="https://hive-keychain.com/">
                  {counterpart.translate("pages.peerlink.hive_keychain")}
                </a>{" "}
                {counterpart.translate("general.or")}{" "}
                <a target="blank" href="https://metamask.io/download/">
                  {counterpart.translate("pages.peerlink.metamask")}
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
