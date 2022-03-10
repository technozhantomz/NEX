// import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";

// import { DashboardButton } from "../../../../common/components/DashboardButton/DashboardButton";

import { Button } from "antd";

import { defaultToken } from "../../../../api/params/networkparams";
import { PasswordModal } from "../../../../common/components";
import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";
import {
  CardFormButton,
  InfoCircleOutlined,
  SwapOutlined,
} from "../../../../ui/src";

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
    formValdation,
    feeData,
    swapAsset,
    status,
    assetValueInfo,
  } = useSwap();
  return (
    <Styled.SwapContainer>
      <Styled.SwapForm.Provider onFormFinish={onFormFinish}>
        <Styled.SwapForm form={swapForm} name="swapForm" onFinish={confirm}>
            <Styled.button icon={<SwapOutlined />} shape="circle" onClick={swapAsset} />
          <Styled.SwapSellItem
            name="sellAmount"
            rules={formValdation.sellAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              type="number"
              prefix={
                <Styled.SwapFormItem
                  name="sellAsset"
                  rules={formValdation.sellAsset}
                  validateFirst={true}
                  validateTrigger="onBlur"
                >
                  <LogoSelectOption labelInValue onChange={handleAssetChange} />
                </Styled.SwapFormItem>
              }
            />
          </Styled.SwapSellItem>
         
          <Styled.SwapItem
            name="buyAmount"
            rules={formValdation.buyAmount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="0.00000"
              type="number"
              prefix={
                <Styled.SwapFormItem
                  name="buyAsset"
                  rules={formValdation.buyAsset}
                  validateFirst={true}
                  validateTrigger="onBlur"
                >
                  <LogoSelectOption labelInValue onChange={handleAssetChange} />
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
      <Styled.InfoDiv>
        <Styled.InfoPara>
          {assetValueInfo}
          <InfoCircleOutlined />
        </Styled.InfoPara>
      </Styled.InfoDiv>
      {/*<DashboardButton label="Swap Coins" />
      <Styled.HistoryLinkDiv>
        <Styled.HistoryLink>See My Swap History</Styled.HistoryLink>
      </Styled.HistoryLinkDiv> */}
      <Styled.FooterPara>
        {status === "" ? "" : status}
        {status === "" ? "" : "Transaction Type : Trade"}
        Fees : {feeData ? feeData.amount : 0} {defaultToken}
      </Styled.FooterPara>
    </Styled.SwapContainer>
  );
};
