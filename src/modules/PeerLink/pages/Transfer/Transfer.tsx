import { NextPage } from "next";

import { utils } from "../../../../api/utils";
import { Layout } from "../../../../common/components";
import { useAssetsContext } from "../../../../common/providers";
import { Asset } from "../../../../common/types";
import { CardFormButton, Form, Input, SwapOutlined } from "../../../../ui/src";

import * as Styled from "./Transfer.styled";
import { useTransfer } from "./hooks";

const PeerLinkTransfer: NextPage = () => {
  const { sidechainAssets } = useAssetsContext();
  const {
    transferForm,
    handleFromTokenChange,
    selectedFromToken,
    handleFromNetworkChange,
    selectedFromNetwork,
    handleToNetworkChange,
    selectedToNetwork,
    transferAmount,
    handleTransferAmountChange,
    handleValuesChange,
  } = useTransfer();

  return (
    <Layout
      title={"connect"}
      type="card"
      heading={"Transfer"}
      description="PeerLink Transfer"
      layout="peerlink"
    >
      {/* Main Content */}
      <Styled.TransferCard>
        {/* Transfer Fields */}
        <Styled.TransferForm
          form={transferForm}
          name="transferForm"
          onValuesChange={handleValuesChange}
          onFinish={() => {
            console.log({
              transferAmount,
              selectedFromNetwork,
              selectedFromToken,
              selectedToNetwork,
            });
          }}
          validateTrigger={["onChange", "onSubmit", "onBlur"]}
        >
          <Styled.Row>
            <Styled.FromCol sm={24} md={12}>
              <Styled.Heading>From</Styled.Heading>
              <Styled.Row gutter={[6, 6]}>
                <Styled.Col span={12}>
                  <Form.Item>
                    <Styled.SubHeading>Network</Styled.SubHeading>
                    <Styled.LogoSelect
                      id="toToken"
                      assets={sidechainAssets as Asset[]}
                      value={selectedFromNetwork}
                      onChange={handleFromNetworkChange}
                    />
                  </Form.Item>
                </Styled.Col>
                <Styled.Col span={12}>
                  <Form.Item>
                    <Styled.SubHeading>Token</Styled.SubHeading>
                    <Styled.LogoSelect
                      id="fromToken"
                      assets={sidechainAssets as Asset[]}
                      value={selectedFromToken}
                      onChange={handleFromTokenChange}
                    />
                  </Form.Item>
                </Styled.Col>
              </Styled.Row>
              <Styled.Row>
                <Form.Item>
                  <Input.Group compact>
                    <Styled.TransferInputItem
                      name="transferAmount"
                      validateFirst={true}
                      help={""}
                      validateStatus={""}
                      noStyle
                    >
                      <Input
                        placeholder="0.00"
                        onFocus={(e) => {
                          e.target.select();
                        }}
                        onChange={(e) =>
                          handleTransferAmountChange(e.target.value)
                        }
                        value={transferAmount}
                        autoComplete="off"
                        onKeyPress={utils.ensureInputNumberValidity}
                        disabled={false}
                      />
                      <Styled.MaxButton>Max</Styled.MaxButton>
                    </Styled.TransferInputItem>
                  </Input.Group>
                </Form.Item>
              </Styled.Row>
              <Styled.SubTextContainer>
                <Styled.Col span={12}>
                  <Styled.LeftSubText>Available:</Styled.LeftSubText>
                  <Styled.LeftSubText>
                    {"0.00"} {selectedFromToken}
                  </Styled.LeftSubText>
                </Styled.Col>
                <Styled.Col span={12}>
                  <Styled.RightSubText>Approx. Value:</Styled.RightSubText>
                  <Styled.RightSubText>{"0.00"}</Styled.RightSubText>
                </Styled.Col>
              </Styled.SubTextContainer>
            </Styled.FromCol>
            <Styled.SwapButton
              icon={<SwapOutlined />}
              shape="circle"
              onClick={() => ""}
            />

            <Styled.ToCol sm={24} md={12}>
              <Styled.Heading>To</Styled.Heading>
              <Styled.Row>
                <Form.Item>
                  <Styled.SubHeading>Network</Styled.SubHeading>
                  <Styled.LogoSelect
                    id="toNetwork"
                    assets={sidechainAssets as Asset[]}
                    value={selectedToNetwork}
                    onChange={handleToNetworkChange}
                  />
                </Form.Item>
              </Styled.Row>
              <Styled.LeftSubText>
                Available: {"0.00"} {selectedFromToken}
              </Styled.LeftSubText>
              <Styled.FeesContainer>
                <Styled.SpacedTextContainer>
                  <Styled.BodyText>Estimated transfer fees:</Styled.BodyText>
                  <Styled.BodyText>
                    {"0.00"} {selectedFromToken}
                  </Styled.BodyText>
                </Styled.SpacedTextContainer>
              </Styled.FeesContainer>
            </Styled.ToCol>
          </Styled.Row>

          <Styled.Row>
            <Styled.Col span={20}>
              <Styled.TransferButtonFormItem>
                <CardFormButton
                  type="primary"
                  htmlType="submit"
                  disabled={false}
                >
                  Transfer
                </CardFormButton>
              </Styled.TransferButtonFormItem>
              <Styled.TransferLinkFormItem>
                <CardFormButton type="link" htmlType="button" disabled={false}>
                  See Full Transfer History
                </CardFormButton>
              </Styled.TransferLinkFormItem>
            </Styled.Col>
          </Styled.Row>
        </Styled.TransferForm>
        <Styled.ErrorMessage
          message=" Display error message here if any"
          type="warning"
          showIcon
          closable
        />
      </Styled.TransferCard>
    </Layout>
  );
};
export default PeerLinkTransfer;
