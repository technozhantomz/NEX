import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import { useUpdateExchanges } from "../../../../../common/hooks";
import { usePeerplaysApiContext } from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";
import { Form, FormInstance } from "../../../../../ui/src";

import { PairForm, UsePairModalResult } from "./usePairModal.types";

export function usePairModal(): UsePairModalResult {
  const { exchanges, updateExchanges } = useUpdateExchanges();
  const [pairModalForm] = Form.useForm();
  const [allAssetsSymbols, setAllAssetsSymbols] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { dbApi } = usePeerplaysApiContext();
  const router = useRouter();

  const handleCancel = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  const handleSelectPair = useCallback(() => {
    pairModalForm.validateFields().then(() => {
      const values = pairModalForm.getFieldsValue();
      const selectedPair = `${values.quote.trim()}_${values.base.trim()}`;
      if (selectedPair !== exchanges.active) {
        updateExchanges(selectedPair);
        setIsVisible(false);
        router.push(`/market/${selectedPair}`);
      } else {
        setIsVisible(false);
      }
    });
  }, [setIsVisible, exchanges, updateExchanges]);

  const handleClickOnPair = useCallback(() => {
    setIsVisible(true);
  }, [setIsVisible]);

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

  const getAllAssetsSymbols = useCallback(async () => {
    const allAssets: Asset[] = await dbApi("list_assets", ["", 99]);
    const allAssetsSymbols = allAssets.map((asset) => asset.symbol);
    setAllAssetsSymbols(allAssetsSymbols);
  }, [dbApi, setAllAssetsSymbols]);

  const handleSelectRecent = (value: string) => {
    const pair = value.split("/");
    pairModalForm.setFieldsValue({ quote: pair[0] });
    pairModalForm.setFieldsValue({ base: pair[1] });
  };

  const validateQuote = (_: unknown, value: string) => {
    const baseValue = pairModalForm.getFieldValue("base");
    if (baseValue === value) {
      return Promise.reject(new Error("Assets Must Be Different"));
    }
    if (baseValue !== defaultToken && value !== defaultToken) {
      return Promise.reject(
        new Error(`One of the assets should be ${defaultToken}`)
      );
    }
    return Promise.resolve();
  };

  const validateBase = (_: unknown, value: string) => {
    const quoteValue = pairModalForm.getFieldValue("quote");
    if (quoteValue === value) {
      return Promise.reject(new Error("Assets Must Be Different"));
    }
    if (quoteValue !== defaultToken && value !== defaultToken) {
      return Promise.reject(
        new Error(`One of the assets should be ${defaultToken}`)
      );
    }
    return Promise.resolve();
  };

  const formValdation = {
    quote: [{ validator: validateQuote }],
    base: [{ validator: validateBase }],
  };

  useEffect(() => {
    getAllAssetsSymbols();
  }, [getAllAssetsSymbols]);

  return {
    isVisible,
    pairModalForm,
    formValdation,
    allAssetsSymbols,
    useResetFormOnCloseModal,
    handleCancel,
    handleSelectPair,
    handleClickOnPair,
    handleSelectRecent,
  };
}
