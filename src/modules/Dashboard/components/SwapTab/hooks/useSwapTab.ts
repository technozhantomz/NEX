import { Form } from "antd";
import counterpart from "counterpart";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useLimitOrderTransactionBuilder,
  useOrderBook,
  useTransactionBuilder,
} from "../../../../../common/hooks";
import { CreateLimitOrderFee } from "../../../../../common/hooks/fees/useFees.types";
import {
  usePeerplaysApiContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset } from "../../../../../common/types";

import { Swap, SwapAssetPair } from "./useSwapTab.types";

export function useSwap(): Swap {
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { localStorageAccount } = useUserContext();
  const [selectedAssets, setSelectedAssets] = useState<SwapAssetPair>({
    sellAssetSymbol: "BTC",
    buyAssetSymbol: defaultToken as string,
  });
  const [lastChangedField, setLastChangedField] = useState<
    "sellAsset" | "buyAsset"
  >("sellAsset");
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [buyLiquidityVolume, setBuyLiquidityVolume] = useState<number>(0);

  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey } = useAccount();
  const { buildCreateLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();
  const { calculateCreateLimitOrderFee } = useFees();
  const [swapOrderFee, setSwapOrderFee] = useState<CreateLimitOrderFee>();
  const { getAssetBySymbol, getAllAssets } = useAsset();
  const [swapForm] = Form.useForm();
  const { id, assets } = useUserContext();
  const { dbApi } = usePeerplaysApiContext();
  const { getOrderBook, reduceBookedOrdersByPrice } = useOrderBook();

  const [assetValueInfo, setAssetValueInfo] = useState<string>("");
  const [swapInfo, setSwapInfo] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [allAssets, _setAllAssets] = useState<Asset[]>([]);

  const calculatePrice = useCallback(
    async (
      sellAssetSymbol: string,
      buyAssetSymbol: string,
      value: number,
      valueType: "sellAsset" | "buyAsset"
    ) => {
      const initialValue = value;
      if (allAssets && allAssets.length > 0) {
        const sellAsset = allAssets.find(
          (asset) => asset.symbol === sellAssetSymbol
        ) as Asset;
        const buyAsset = allAssets.find(
          (asset) => asset.symbol === buyAssetSymbol
        ) as Asset;
        if (
          sellAssetSymbol === defaultToken ||
          buyAssetSymbol === defaultToken
        ) {
          try {
            const { asks } = await getOrderBook(sellAsset, buyAsset);
            const reducedAsks = reduceBookedOrdersByPrice(
              asks,
              sellAsset,
              buyAsset
            );
            console.log("reduced asks", reducedAsks);
            const buyLiquidityVolume = reducedAsks
              .map((ask) => Number(ask.quote))
              .reduce(
                (partialSum, currentElement) => partialSum + currentElement,
                0
              );
            setBuyLiquidityVolume(buyLiquidityVolume);
            const usedOrders = [] as { price: number; amount: number }[];
            if (valueType === "sellAsset") {
              let i = 0;
              while (value > 0) {
                usedOrders.push({
                  price: Number(reducedAsks[i].price),
                  amount:
                    value <= Number(reducedAsks[i].base)
                      ? roundNum(
                          value / Number(reducedAsks[i].price),
                          buyAsset.precision
                        )
                      : Number(reducedAsks[i].quote),
                });
                value = value - Number(reducedAsks[i].base);
                i = i + 1;
              }
              const buyAmount = usedOrders.reduce(
                (previousValue, currentElement) =>
                  previousValue + currentElement.amount,
                0
              );
              const price = roundNum(
                initialValue / buyAmount,
                sellAsset.precision
              );
              setPrice(price);
            } else {
              let i = 0;
              while (value > 0) {
                usedOrders.push({
                  price: Number(reducedAsks[i].price),
                  amount:
                    value <= Number(reducedAsks[i].quote)
                      ? roundNum(
                          value * Number(reducedAsks[i].price),
                          sellAsset.precision
                        )
                      : Number(reducedAsks[i].base),
                });
                value = value - Number(reducedAsks[i].quote);
                i = i + 1;
              }
              const sellAmount = usedOrders.reduce(
                (previousValue, currentElement) =>
                  previousValue + currentElement.amount,
                0
              );
              const price = roundNum(
                sellAmount / initialValue,
                sellAsset.precision
              );
              setPrice(price);
            }
          } catch (e) {
            console.log(e);
          }
        } else {
        }
      }
    },
    [defaultToken, allAssets, getOrderBook]
  );

  const handleSellAssetChange = useCallback(
    (value: unknown) => {
      if (String(value) === selectedAssets.buyAssetSymbol) {
        setSelectedAssets({
          buyAssetSymbol: selectedAssets.sellAssetSymbol,
          sellAssetSymbol: String(value),
        });
      } else {
        setSelectedAssets({
          ...selectedAssets,
          sellAssetSymbol: String(value),
        });
      }
    },
    [selectedAssets, setSelectedAssets]
  );

  // const handleAssetChange = useCallback(
  //   (value: string, option: any) => {
  //     if (option.action === "sellAsset") {
  //       if (String(value) === selectedAssets.buyAsset) {
  //         setSelectedAssets({
  //           buyAsset: selectedAssets.sellAsset,
  //           sellAsset: String(value),
  //         });
  //       } else {
  //         setSelectedAssets({
  //           ...selectedAssets,
  //           sellAsset: String(value),
  //         });
  //       }
  //     } else {
  //       if (String(value) === selectedAssets.sellAsset) {
  //         setSelectedAssets({
  //           sellAsset: selectedAssets.buyAsset,
  //           buyAsset: String(value),
  //         });
  //       } else {
  //         setSelectedAssets({
  //           ...selectedAssets,
  //           buyAsset: String(value),
  //         });
  //       }
  //     }
  //   },
  //   [selectedAssets, setSelectedAssets]
  // );

  // const handleSwap = useCallback(
  //   async (password: string) => {
  //     const values = swapForm.getFieldsValue();
  //     const sellAsset = await getAssetBySymbol(values.sellAsset);
  //     const buyAsset = await getAssetBySymbol(values.buyAsset);

  //     const activeKey = getPrivateKey(password, "active");

  //     const amount_to_sell = {
  //       amount: values.sellAmount,
  //       asset_id: sellAsset.id,
  //     };

  //     const min_to_receive = {
  //       amount: values.buyAmount,
  //       asset_id: buyAsset.id,
  //     };

  //     const expiration = new Date(
  //       new Date().getTime() + 1000 * 60 * 60 * 24 * 365
  //     ).toISOString();

  //     const trx = buildCreateLimitOrderTransaction(
  //       id,
  //       amount_to_sell.amount,
  //       min_to_receive.amount,
  //       sellAsset,
  //       buyAsset,
  //       expiration,
  //       false,
  //       [],
  //       true
  //     );

  //     let trxResult;

  //     try {
  //       setLoadingTransaction(true);
  //       trxResult = await buildTrx([trx], [activeKey]);
  //     } catch (error) {
  //       console.log(error);
  //       setTransactionErrorMessage(
  //         counterpart.translate(`field.errors.transaction_unable`)
  //       );
  //       setLoadingTransaction(false);
  //     }

  //     if (trxResult) {
  //       setLoadingTransaction(false);
  //       setTransactionSuccessMessage(
  //         counterpart.translate(`field.success.swap_order_successfully`)
  //       );
  //       setStatus(
  //         `Your swap was completed and you received ${values.buyAmount} ${values.buyAsset} for ${values.sellAmount} ${values.sellAsset}`
  //       );
  //     }
  //   },
  //   [id, swapForm, buildTrx, buildCreateLimitOrderTransaction]
  // );

  // const validateSellAmount = (_: unknown, value: number) => {
  //   const sellAsset = swapForm.getFieldValue("sellAsset");
  //   const accountAsset = assets.find((asset) => asset.symbol === sellAsset);
  //   if (canPayFee(value, sellAsset))
  //     return Promise.reject(
  //       new Error(`Must be less then ${accountAsset?.amount}`)
  //     );
  //   const values = swapForm.getFieldsValue();
  //   updateAssetValueInfo(values.sellAsset, values.buyAsset, true);
  //   return Promise.resolve();
  // };

  // const validateSellAsset = (_: unknown, value: string) => {
  //   const values = swapForm.getFieldsValue();
  //   const accountAsset = assets.find((asset) => asset.symbol === value);
  //   if (value === swapForm.getFieldValue("buyAsset"))
  //     return Promise.reject(new Error(`Cannot swap same tokens`));
  //   if (accountAsset === undefined)
  //     return Promise.reject(new Error(`${value} not available`));
  //   updateAssetValueInfo(values.sellAsset, values.buyAsset, true);
  //   return Promise.resolve();
  // };

  // const validateBuyAsset = (_: unknown, value: number) => {
  //   const values = swapForm.getFieldsValue();
  //   if (value === swapForm.getFieldValue("sellAsset"))
  //     return Promise.reject(new Error(`Cannot swap same tokens`));
  //   updateAssetValueInfo(values.sellAsset, values.buyAsset, false);
  //   return Promise.resolve();
  // };

  // const validateBuyAmount = (_: unknown, value: number) => {
  //   const values = swapForm.getFieldsValue();
  //   if (value === swapForm.getFieldValue("sellAsset"))
  //     return Promise.reject(new Error(`Cannot swap same tokens`));
  //   updateAssetValueInfo(values.sellAsset, values.buyAsset, false);
  //   return Promise.resolve();
  // };

  // const canPayFee = (
  //   amount: number,
  //   assetSymbol: string
  // ): boolean | undefined => {
  //   const sellAsset = assets.find((asset) => asset.symbol === assetSymbol);
  //   const feeAsset = assets.find((asset) => asset.symbol === defaultToken);
  //   const feeAmount = swapOrderFee ? swapOrderFee.fee : 0;
  //   if (feeAsset?.amount !== undefined && sellAsset?.amount !== undefined) {
  //     if (assetSymbol === defaultToken) {
  //       return amount + feeAmount > sellAsset?.amount;
  //     }
  //     return feeAsset.amount > feeAmount;
  //   }
  // };

  // const formValidation = {
  //   sellAmount: [
  //     { required: true, message: "Sell amount required" },
  //     { validator: validateSellAmount },
  //   ],
  //   buyAmount: [
  //     { required: true, message: "Buy amount required" },
  //     { validator: validateBuyAmount },
  //   ],
  //   sellAsset: [
  //     { required: true, message: "Sell Asset required" },
  //     { validator: validateSellAsset },
  //   ],
  //   buyAsset: [
  //     { required: true, message: "Sell amount required" },
  //     { validator: validateBuyAsset },
  //   ],
  // };

  // const swapAsset = () => {
  //   let values = swapForm.getFieldsValue();
  //   swapForm.setFieldsValue({ sellAsset: values.buyAsset });
  //   swapForm.setFieldsValue({ buyAsset: values.sellAsset });
  //   swapForm.setFieldsValue({ sellAmount: values.buyAmount });
  //   swapForm.setFieldsValue({ buyAmount: values.sellAmount });
  //   values = swapForm.getFieldsValue();
  //   const { sellAsset, buyAsset } = selectedAssets;
  //   setSelectedAssets({ buyAsset: sellAsset, sellAsset: buyAsset });
  //   updateAssetValueInfo(values.sellAsset, values.buyAsset, true);
  // };

  // const updateAssetValueInfo = async (
  //   sellAsset: string,
  //   buyAsset: string,
  //   isSellAssetChanged: boolean
  // ) => {
  //   const tickerData = await dbApi("get_ticker", [buyAsset, sellAsset]);
  //   const buyAssetData = await getAssetBySymbol(buyAsset);
  //   const sellAssetData = await getAssetBySymbol(sellAsset);
  //   const buyAmount = swapForm.getFieldValue("buyAmount")
  //     ? swapForm.getFieldValue("buyAmount")
  //     : 0;
  //   const sellAmount = swapForm.getFieldValue("sellAmount")
  //     ? swapForm.getFieldValue("sellAmount")
  //     : 0;
  //   const price = tickerData ? Number(tickerData?.latest) : 0;
  //   const sellPrice = Number(
  //     parseFloat(price * buyAmount + "").toFixed(buyAssetData?.precision)
  //   );
  //   const buyPrice =
  //     price > 0
  //       ? Number(
  //           parseFloat(sellAmount / price + "").toFixed(
  //             sellAssetData?.precision
  //           )
  //         )
  //       : 0;

  //   isSellAssetChanged === true
  //     ? swapForm.setFieldsValue({ buyAmount: buyPrice })
  //     : swapForm.setFieldsValue({ sellAmount: sellPrice });
  //   setAssetValueInfo(`${1} ${buyAsset} = ${price} ${sellAsset}`);
  //   setSwapInfo(`
  //     Swap ${buyAmount} ${buyAsset} for ${price * buyAmount} ${sellAsset}
  //   `);
  // };

  const setAllAssets = useCallback(async () => {
    try {
      const allAssets = await getAllAssets();
      if (allAssets && allAssets.length > 0) {
        _setAllAssets(allAssets);
      }
    } catch (e) {
      console.log(e);
    }
  }, [getAllAssets, _setAllAssets]);

  useEffect(() => {
    setAllAssets();
  }, [setAllAssets]);

  useEffect(() => {
    calculatePrice(
      selectedAssets.sellAssetSymbol,
      selectedAssets.buyAssetSymbol,
      205,
      "buyAsset"
    );
  }, [calculatePrice]);

  // useEffect(() => {
  //   (async () => {
  //     const base = await getAssetBySymbol(selectedAssets.sellAsset);
  //     const quote = await getAssetBySymbol(selectedAssets.buyAsset);
  //     const _swapOrderFee = calculateCreateLimitOrderFee(base, quote);
  //     if (_swapOrderFee !== undefined) {
  //       setSwapOrderFee(_swapOrderFee);
  //     }
  //   })();
  // }, [calculateCreateLimitOrderFee, setSwapOrderFee]);

  return {
    // confirm,
    // swapInfo,
    // swapOrderFee,
    // //handleAssetChange,
    // swapForm,
    // formValidation,
    // //swapAsset,
    // status,
    // assetValueInfo,
    // selectedAssets,
    // localStorageAccount,
    // transactionErrorMessage,
    // setTransactionErrorMessage,
    // transactionSuccessMessage,
    // setTransactionSuccessMessage,
    // loadingTransaction,
    // feeAmount: swapOrderFee?.fee,
    // handleSwap,
    // allAssets,
  };
}
