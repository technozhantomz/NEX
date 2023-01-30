import counterpart from "counterpart";
import { useRouter } from "next/router";

import { utils } from "../../../../../../api/utils";

import * as Styled from "./OrderForm.styled";
import { useOrderForm } from "./hooks";

type Props = {
  isBuyForm: boolean;
  formType: "limit" | "market";
};
export function OrderForm({ isBuyForm, formType }: Props): JSX.Element {
  const router = useRouter();
  const { pair } = router.query;
  const { balance, formValidation } = useOrderForm({ isBuyForm });
  return (
    <Styled.FormContainer>
      <Styled.Form.Provider>
        <Styled.BalanceContainer>
          <Styled.WalletIcon />
          <Styled.BalanceValue>{balance}</Styled.BalanceValue>
        </Styled.BalanceContainer>
        <Styled.Form>
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
              onKeyPress={utils.ensureInputNumberValidity}
              onPaste={utils.numberedInputsPasteHandler}
              autoComplete="off"
              placeholder={counterpart.translate("field.placeholder.price")}
              suffix={(pair as string).split("_")[1]}
            />
          </Styled.FormItem>
          {formType === "limit" && (
            <Styled.PriceRadioGroup>
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
          <Styled.PriceSlider />
        </Styled.Form>
      </Styled.Form.Provider>
    </Styled.FormContainer>
  );
}
