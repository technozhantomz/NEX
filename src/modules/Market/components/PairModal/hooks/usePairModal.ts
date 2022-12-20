import counterpart from "counterpart";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { defaultToken } from "../../../../../api/params";
import { useAsset, useUpdateExchanges } from "../../../../../common/hooks";
import { Form } from "../../../../../ui/src";

import { PairForm, UsePairModalResult } from "./usePairModal.types";

type Args = {
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  currentPair: string;
};

export function usePairModal({
  setIsVisible,
  currentPair,
}: Args): UsePairModalResult {
  const [pairModalForm] = Form.useForm<PairForm>();
  const [allAssetsSymbols, _setAllAssetsSymbols] = useState<string[]>([]);
  const router = useRouter();
  const { getAllAssets } = useAsset();
  const { updateExchanges } = useUpdateExchanges();

  const handleValuesChange = useCallback(() => {
    pairModalForm.validateFields();
  }, [pairModalForm]);

  const handleCancel = useCallback(() => {
    pairModalForm.resetFields();
    setIsVisible(false);
  }, [setIsVisible, pairModalForm]);

  const handleSelectPair = useCallback(() => {
    pairModalForm.validateFields().then(() => {
      const { quote, base } = pairModalForm.getFieldsValue();
      const selectedPair = `${quote.trim()}_${base.trim()}`;
      if (selectedPair !== currentPair) {
        setIsVisible(false);
        updateExchanges(selectedPair);
        pairModalForm.setFieldsValue({
          recents: currentPair.replace("_", "/"),
        });
        router.push(`/market/${selectedPair}`);
      } else {
        setIsVisible(false);
      }
    });
  }, [updateExchanges, setIsVisible, currentPair, pairModalForm]);

  const handleSelectRecent = useCallback(
    (value: unknown) => {
      const selectedItem = value as string;
      const pair = selectedItem.split("/");
      pairModalForm.setFieldsValue({ quote: pair[0], base: pair[1] });
    },
    [pairModalForm]
  );

  const validateQuote = (_: unknown, value: string) => {
    const baseValue = pairModalForm.getFieldValue("base");
    if (baseValue === value) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.assets_must_different`))
      );
    }
    if (baseValue !== defaultToken && value !== defaultToken) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.assets_should_be`, {
            defaultToken,
          })
        )
      );
    }
    return Promise.resolve();
  };

  const validateBase = (_: unknown, value: string) => {
    const quoteValue = pairModalForm.getFieldValue("quote");
    if (quoteValue === value) {
      return Promise.reject(
        new Error(counterpart.translate(`field.errors.assets_must_different`))
      );
    }
    if (quoteValue !== defaultToken && value !== defaultToken) {
      return Promise.reject(
        new Error(
          counterpart.translate(`field.errors.assets_should_be`, {
            defaultToken,
          })
        )
      );
    }
    return Promise.resolve();
  };

  const formValidation = {
    quote: [{ validator: validateQuote }],
    base: [{ validator: validateBase }],
  };

  useEffect(() => {
    let ignore = false;
    async function setAllAssetsSymbols() {
      const allAssets = await getAllAssets();
      if (!ignore && allAssets && allAssets.length > 0) {
        const allAssetsSymbols = allAssets.map((asset) => asset.symbol);
        _setAllAssetsSymbols(allAssetsSymbols);
      }
    }
    setAllAssetsSymbols();
    return () => {
      ignore = true;
    };
  }, [getAllAssets, _setAllAssetsSymbols]);

  return {
    pairModalForm,
    formValidation,
    allAssetsSymbols,
    handleCancel,
    handleSelectPair,
    handleSelectRecent,
    handleValuesChange,
  };
}
