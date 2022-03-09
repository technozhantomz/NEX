import { Form } from "../../../../../ui/src";
import { usePairSelect } from "../../PairSelect/hooks/usePairSelect";

import {
  UseCreateLimitOrderArgs,
  UseCreateLimitOrderResult,
} from "./useCreateLimitOrder.types";

export function useCreateLimitOrder({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isBuyOrder,
}: UseCreateLimitOrderArgs): UseCreateLimitOrderResult {
  const [form] = Form.useForm();
  const { activePair } = usePairSelect();
  return {
    form,
    activePair,
  };
}
