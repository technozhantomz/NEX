import { useCallback } from "react";

import { roundNum } from "../../../../../common/hooks";
import { Form } from "../../../../../ui/src";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import {
  UseCreateLimitOrderArgs,
  UseCreateLimitOrderResult,
} from "./useCreateLimitOrder.types";

export function useCreateLimitOrder({
  isBuyOrder,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [form] = Form.useForm();
  const { activePair } = usePairSelect();
  const { currentBase, currentQuote } = usePairSelect();

  const handleValuesChange = useCallback(
    (changedValues, allValues) => {
      let baseRoundTo = 5;
      let quoteRoundTo = 5;
      if (currentBase != null && currentQuote != null) {
        baseRoundTo = currentBase.precision;
        quoteRoundTo = currentQuote.precision;
      }
      if (changedValues.price || changedValues.quantity) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.quantity &&
          allValues.quantity > 0
        ) {
          form.setFieldsValue({
            total: roundNum(allValues.price * allValues.quantity, baseRoundTo),
          });
        }
      } else if (changedValues.total) {
        if (
          allValues.price &&
          allValues.price > 0 &&
          allValues.total &&
          allValues.total > 0
        ) {
          form.setFieldsValue({
            quantity: roundNum(allValues.total / allValues.price, quoteRoundTo),
          });
        }
      }
    },
    [form, currentBase, currentQuote]
  );

  return {
    handleValuesChange,
    form,
    activePair,
  };
}
