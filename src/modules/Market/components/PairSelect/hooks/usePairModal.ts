import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { usePeerplaysApiContext } from "../../../../../common/components";
import { Form, FormInstance } from "../../../../../ui/src";

import { PairForm, PairModal } from "./usePairModal.types";
import { usePairSelect } from "./usePairSelect";

export function usePairModal(): PairModal {
  const { recentPairs } = usePairSelect();
  const [pairModalForm] = Form.useForm();
  const [assets, setAssets] = useState<string[]>([]);
  const { dbApi } = usePeerplaysApiContext();
  const router = useRouter();

  useEffect(() => {
    getAssets();
    if (recentPairs[0].length > 0) {
      const recentPair = recentPairs[0].split(" / ");
      pairModalForm.setFieldsValue({ quote: recentPair[0] });
      pairModalForm.setFieldsValue({ base: recentPair[1] });
    }
  }, [assets, recentPairs]);

  const useResetFormOnCloseModal = (
    form: FormInstance<PairForm>,
    visible: boolean
  ) => {
    const prevVisibleRef = useRef<boolean>();
    useEffect(() => {
      prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;

    useEffect(() => {
      if (!visible && prevVisible) {
        form.resetFields();
      }
    }, [visible]);
  };

  const getAssets = async () => {
    const rawAssets = await dbApi("list_assets", ["", 25]).then((a) => a);
    const assetList = await Promise.all(rawAssets.map(async (a) => a.symbol));
    setAssets(assetList);
  };

  const updatePair = (values: any) => {
    console.log(values);
    router.push(`/market/${values.quote}_${values.price}`);
  };

  const validateRecents = (_: unknown, value: string) => {
    const pair = value.split("/");
    pairModalForm.setFieldsValue({ quote: pair[0] });
    pairModalForm.setFieldsValue({ base: pair[1] });
    return Promise.resolve();
  };

  const validateQuote = (_: unknown, value: string) => {
    const baseValue = pairModalForm.getFieldValue("base");
    if (baseValue === value)
      return Promise.reject(new Error("Assets Must Be Different"));
    return Promise.resolve();
  };

  const validateBase = (_: unknown, value: string) => {
    const quoteValue = pairModalForm.getFieldValue("quote");
    if (quoteValue === value)
      return Promise.reject(new Error("Assets Must Be Different"));
    return Promise.resolve();
  };

  const formValdation = {
    quote: [{ validator: validateQuote }],
    base: [{ validator: validateBase }],
    recents: [{ validator: validateRecents }],
  };

  return {
    pairModalForm,
    formValdation,
    assets,
    recentPairs,
    useResetFormOnCloseModal,
    updatePair,
  };
}
