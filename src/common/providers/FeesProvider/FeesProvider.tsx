import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePeerplaysApiContext } from "..";
import { FeeParameter, GlobalProperties } from "../../types";

import { FeesContextType } from "./FeesProvider.types";

type Props = {
  children: React.ReactNode;
};

const defaultFeesState: FeesContextType = {
  feeParameters: [],
  loadingFeeParameters: true,
};

const FeesContext = createContext<FeesContextType>(defaultFeesState);

export const FeesProvider = ({ children }: Props): JSX.Element => {
  const [feeParameters, setFeeParameters] = useState<FeeParameter[]>([]);
  const [loadingFeeParameters, setLoadingFeeParameters] =
    useState<boolean>(true);

  const { dbApi } = usePeerplaysApiContext();

  const getFeesFromGlobal = useCallback(async () => {
    try {
      const globalProperties: GlobalProperties = await dbApi(
        "get_global_properties"
      );
      const feeParameters = globalProperties.parameters.current_fees.parameters;
      return feeParameters;
    } catch (e) {
      console.log(e);
    }
  }, [dbApi]);

  useEffect(() => {
    let ignore = false;

    async function setFees() {
      setLoadingFeeParameters(true);
      const feeParameters = await getFeesFromGlobal();
      if (!ignore) {
        if (feeParameters) {
          setFeeParameters(feeParameters);
        }
        setLoadingFeeParameters(false);
      }
    }

    setFees();

    return () => {
      ignore = true;
    };
  }, [getFeesFromGlobal, setLoadingFeeParameters, setFeeParameters]);

  return (
    <FeesContext.Provider
      value={{
        feeParameters,
        loadingFeeParameters,
      }}
    >
      {children}
    </FeesContext.Provider>
  );
};

export const useFeesContext = (): FeesContextType => {
  return useContext<FeesContextType>(FeesContext);
};
