import { SliderMarks } from "antd/lib/slider";
import counterpart from "counterpart";
import { useRouter } from "next/router";

import { defaultToken } from "../../../../../../api/params";
import { utils } from "../../../../../../api/utils";
import { useUserContext } from "../../../../../../common/providers";
import {
  DownOutlined,
  InfoCircleOutlined,
  Tooltip,
} from "../../../../../../ui/src";

import * as Styled from "./OrderForm.styled";
import { useOrderForm } from "./hooks";

type Props = {
  isBuyForm: boolean;
  formType: "limit" | "market";
};
export function OrderForm({ isBuyForm, formType }: Props): JSX.Element {
  const router = useRouter();
  const { localStorageAccount } = useUserContext();
  const { pair } = router.query;
  const {
    balance,
    formValidation,
    timePolicyOptions,
    fees,
    orderForm,
    handleValuesChange,
    handlePriceRadioGroupChange,
    priceRadioValue,
    clearPriceRadioGroup,
    handlePriceSliderChange,
    priceSliderValue,
  } = useOrderForm({
    isBuyForm,
    formType,
  });
  const sliderMarks: SliderMarks = {
    0: "0%",
    25: "25%",
    50: "50%",
    75: "75%",
    100: "100%",
  };
  const isLoggedIn = localStorageAccount !== null && localStorageAccount !== "";
  const buyOrSellText = isBuyForm
    ? counterpart.translate(`buttons.buy`)
    : counterpart.translate(`buttons.sell`);
  const loggedInSubmitButton =
    buyOrSellText + " " + (pair as string).split("_")[0];
  const nonLoggedInSubmitButton =
    counterpart.translate(`buttons.login`) + " & " + loggedInSubmitButton;

  return (
    <Styled.FormContainer>
      <Styled.Form.Provider>
        <Styled.BalanceContainer>
          <Styled.WalletIcon />
          <Styled.BalanceValue>{balance}</Styled.BalanceValue>
        </Styled.BalanceContainer>
        <Styled.Form
          name="orderForm"
          form={orderForm}
          onValuesChange={handleValuesChange}
        >
          {formType === "limit" && (
            <Styled.FormItem
              name="price"
              rules={formValidation.price}
              validateFirst={true}
              validateTrigger="onBlur"
            >
              <Styled.InputNumber
                type="number"
                min={0}
                step="any"
                onFocus={(e) => {
                  e.target.select();
                }}
                onChange={clearPriceRadioGroup}
                onKeyPress={utils.ensureInputNumberValidity}
                onPaste={utils.numberedInputsPasteHandler}
                autoComplete="off"
                placeholder={counterpart.translate("field.placeholder.price")}
                suffix={(pair as string).split("_")[1]}
              />
            </Styled.FormItem>
          )}

          {formType === "limit" && (
            <Styled.PriceRadioGroup
              onChange={handlePriceRadioGroupChange}
              value={priceRadioValue}
            >
              <Styled.PriceRadioButton value="mid">MID</Styled.PriceRadioButton>
              <Styled.PriceRadioButton value="book">
                {isBuyForm ? "Ask" : "Bid"}
              </Styled.PriceRadioButton>
              <Styled.PriceRadioButton value="1">
                {"1% <"}
              </Styled.PriceRadioButton>
              <Styled.PriceRadioButton value="5">
                {"5% <"}
              </Styled.PriceRadioButton>
              <Styled.PriceRadioButton value="10">
                {"10% <"}
              </Styled.PriceRadioButton>
            </Styled.PriceRadioGroup>
          )}
          <Styled.AmountFormItem
            name="amount"
            rules={formValidation.amount}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.InputNumber
              type="number"
              min={0}
              step="any"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
              autoComplete="off"
              placeholder={counterpart.translate("field.placeholder.amount")}
              suffix={(pair as string).split("_")[0]}
            />
          </Styled.AmountFormItem>
          <Styled.PriceSlider
            value={priceSliderValue}
            min={0}
            max={100}
            marks={sliderMarks}
            onChange={handlePriceSliderChange}
          />
          <Styled.AmountFormItem
            name="total"
            rules={formValidation.total}
            validateFirst={true}
            validateTrigger="onBlur"
          >
            <Styled.InputNumber
              type="number"
              min={0}
              step="any"
              onFocus={(e) => {
                e.target.select();
              }}
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
              autoComplete="off"
              placeholder={counterpart.translate("field.placeholder.total")}
              suffix={(pair as string).split("_")[1]}
              disabled={true}
            />
          </Styled.AmountFormItem>
          <Styled.AdvancedCollapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <DownOutlined rotate={isActive ? 180 : 0} />
            )}
          >
            <Styled.AdvancedCollapsePanel
              header={counterpart.translate(
                "pages.market.tabs.controls.advanced"
              )}
              key="1"
            >
              <Styled.TimePolicyHeaderContainer>
                <Styled.TimePolicyHeader>
                  {counterpart.translate(
                    "pages.market.tabs.controls.time_policy"
                  )}
                </Styled.TimePolicyHeader>
                <Tooltip
                  title={counterpart.translate(
                    "pages.market.tabs.controls.time_policy_description"
                  )}
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </Styled.TimePolicyHeaderContainer>
              <Styled.TimePolicySelect
                defaultValue="good-til-canceled"
                options={timePolicyOptions}
              />

              <Styled.ExecutionHeaderContainer>
                <Styled.ExecutionHeader>
                  {counterpart.translate(
                    "pages.market.tabs.controls.execution"
                  )}
                </Styled.ExecutionHeader>
                <Tooltip
                  title={counterpart.translate(
                    "pages.market.tabs.controls.execution_description"
                  )}
                >
                  <InfoCircleOutlined />
                </Tooltip>
              </Styled.ExecutionHeaderContainer>
              <Styled.ExecutionRadioGroup defaultValue="allow-taker">
                <Styled.ExecutionRadioButton value="post-only">
                  {counterpart.translate(
                    "pages.market.tabs.controls.post_only"
                  )}
                </Styled.ExecutionRadioButton>
                <Styled.ExecutionRadioButton value="allow-taker">
                  {counterpart.translate(
                    "pages.market.tabs.controls.allow_taker"
                  )}
                </Styled.ExecutionRadioButton>
              </Styled.ExecutionRadioGroup>
            </Styled.AdvancedCollapsePanel>
          </Styled.AdvancedCollapse>

          <Styled.FeeContainer>
            <Styled.FeeHeader>
              {counterpart.translate("field.labels.fee")}:
            </Styled.FeeHeader>
            <Styled.FeeValue>{`${fees.feeAmount} ${defaultToken}`}</Styled.FeeValue>
          </Styled.FeeContainer>
          <Styled.FeeContainer>
            <Styled.FeeHeader>
              <span>{counterpart.translate("field.labels.market_fee")}:</span>
            </Styled.FeeHeader>
            <Styled.FeeValue>
              <span>{`${fees.marketFeePercent}%`}</span>
              <Styled.MarketFeeToolTip
                title={counterpart.translate(
                  "pages.market.tabs.controls.market_fee_description",
                  {
                    percent: fees.marketFeePercent,
                    asset: isBuyForm
                      ? (pair as string).split("_")[0]
                      : (pair as string).split("_")[1],
                  }
                )}
              >
                <InfoCircleOutlined />
              </Styled.MarketFeeToolTip>
            </Styled.FeeValue>
          </Styled.FeeContainer>

          <Styled.ButtonFormItem>
            {isLoggedIn ? (
              <Styled.FormButton type="primary" htmlType="submit">
                {loggedInSubmitButton}
              </Styled.FormButton>
            ) : (
              <Styled.FormButton
                type="primary"
                htmlType="button"
                onClick={() => {
                  router.push("/login");
                }}
              >
                {nonLoggedInSubmitButton}
              </Styled.FormButton>
            )}
          </Styled.ButtonFormItem>
        </Styled.Form>
      </Styled.Form.Provider>
    </Styled.FormContainer>
  );
}
