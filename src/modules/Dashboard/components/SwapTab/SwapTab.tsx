import { Form, Input } from "antd";

import { defaultToken } from "../../../../api/params/networkparams";
import { PasswordModal } from "../../../../common/components";
import { LogoSelectOption } from "../../../../common/components/LogoSelectOption/LogoSelectOption";
import { InfoCircleOutlined, SwapOutlined } from "../../../../ui/src";

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
    feeAmount,
    swapAsset,
    status,
    assetValueInfo,
  } = useSwap();

  const InfoToolTip = (
    <Styled.TooltipPara>
      {status === "" ? "" : status}
      {status === "" ? "" : <p>Transaction Type : Trade</p>}
      Fees : {feeAmount} {defaultToken}
    </Styled.TooltipPara>
  );

  return (
    <Styled.SwapContainer>
      <Styled.SwapForm.Provider onFormFinish={onFormFinish}>
        <Styled.SwapForm form={swapForm} name="swapForm" onFinish={confirm}>
          <Styled.SwapButton
            icon={<SwapOutlined rotate={90} />}
            shape="circle"
            onClick={swapAsset}
          />
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
            <Styled.FormButton type="primary" htmlType="submit">
              Swap Coins
            </Styled.FormButton>
          </Form.Item>
        </Styled.SwapForm>
        <PasswordModal visible={visible} onCancel={onCancel} />
      </Styled.SwapForm.Provider>
      <Styled.InfoDiv>
        <Styled.InfoPara>
          {assetValueInfo}
          <Styled.Tooltip placement="left" title={InfoToolTip} color="#E3EBF8">
            <InfoCircleOutlined />
          </Styled.Tooltip>
        </Styled.InfoPara>
      </Styled.InfoDiv>
      <Styled.FooterPara>
        {status === "" ? "" : status}
        {status === "" ? "" : "Transaction Type : Trade"}
        Fees : {feeAmount} {defaultToken}
      </Styled.FooterPara>
    </Styled.SwapContainer>
  );
};
