// import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

// import { DashboardButton } from "../../../../common/components/DashboardButton/DashboardButton";
import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";
import PasswordModal from "../../../../common/components/PasswordModal/passwordModal";
import { CardFormButton } from "../../../../ui/src";

import * as Styled from "./SwapTab.styled";
import { useSwap } from "./hooks/useSwapTab";

export const SwapTab = (): JSX.Element => {
  const {
    visible,
    onCancel,
    onFormFinish,
    confirm,
    handleAssetChange,
    swapForm,
  } = useSwap();
  return (
    <Styled.SwapContainer>
      <Styled.SwapForm.Provider onFormFinish={onFormFinish}>
        <Styled.SwapForm form={swapForm} name="swapForm" onFinish={confirm}>
          <Styled.SwapItem name="sellAmount">
            <Input
              placeholder="0.00000"
              type="number"
              prefix={
                <Styled.SwapFormItem name="sellAsset">
                  <LogoSelectOption
                    labelInValue
                    defaultValue="BTC"
                    onChange={handleAssetChange}
                  />
                </Styled.SwapFormItem>
              }
            />
          </Styled.SwapItem>
          <Styled.SwapItem name="buyAmount">
            <Input
              placeholder="0.00000"
              type="number"
              prefix={
                <Styled.SwapFormItem name="buyAsset">
                  <LogoSelectOption
                    labelInValue
                    defaultValue="BTC"
                    onChange={handleAssetChange}
                  />
                </Styled.SwapFormItem>
              }
            />
          </Styled.SwapItem>
          <Form.Item>
            <CardFormButton type="primary" htmlType="submit">
              Swap Coins
            </CardFormButton>
          </Form.Item>
        </Styled.SwapForm>
        <PasswordModal visible={visible} onCancel={onCancel} />
      </Styled.SwapForm.Provider>
      {/* <Styled.InfoDiv>
        <Styled.InfoPara>
          1 USDT= 0.0004475 ETH
          <InfoCircleOutlined />
        </Styled.InfoPara>
      </Styled.InfoDiv>
      <DashboardButton label="Swap Coins" />
      <Styled.HistoryLinkDiv>
        <Styled.HistoryLink>See My Swap History</Styled.HistoryLink>
      </Styled.HistoryLinkDiv>
      <Styled.FooterPara>
        Your swap was completed and you received 1.001 ETH for 2240.02 USDT{" "}
        <br />
        <br />
        Transaction Type : Trade <br />
        Fees : 0.01121 PPY
      </Styled.FooterPara> */}
    </Styled.SwapContainer>
  );
};
