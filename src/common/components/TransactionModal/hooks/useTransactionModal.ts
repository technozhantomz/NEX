import { useEffect, useRef } from "react";

import { Form, FormInstance } from "../../../../ui/src";

import { UseTransactionModalResult } from "./useTransactionModal.types";

export function useTransactionModal(): UseTransactionModalResult {
  const [transactionModalForm] = Form.useForm();

  const useResetFormOnCloseModal = (form: FormInstance, visible: boolean) => {
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

  return {
    useResetFormOnCloseModal,
    transactionModalForm,
  };
}
