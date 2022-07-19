import counterpart from "counterpart";
import { sum } from "lodash";
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
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset, BookedOrder } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import { SwapAssetPair, SwapForm, UseSwapResult } from "./useSwapTab.types";

export function useSwap(): UseSwapResult {
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { localStorageAccount, assets, id } = useUserContext();
  const [selectedAssets, setSelectedAssets] = useState<SwapAssetPair>({
    sellAssetSymbol: defaultToken as string,
    buyAssetSymbol: "BTC",
  });
  const [lastChangedField, setLastChangedField] = useState<
    "sellAsset" | "buyAsset"
  >("sellAsset");
  const [loadingSwapData, setLoadingSwapData] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [buyLiquidityVolume, setBuyLiquidityVolume] = useState<number>(0);
  const [sellLiquidityVolume, setSellLiquidityVolume] = useState<number>(0);
  const [allAssets, _setAllAssets] = useState<Asset[]>([]);
  const [swapOrderFee, setSwapOrderFee] = useState<number>(0);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [sellAssetBalance, setSellAssetBalance] = useState<number>(0);
  const [buyAssetBalance, setBuyAssetBalance] = useState<number>(0);
  const [transactionModalSellAmount, setTransactionModalSellAmount] =
    useState<number>(0);
  const [transactionModalBuyAmount, setTransactionModalBuyAmount] =
    useState<number>(0);

  const [swapForm] = Form.useForm<SwapForm>();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { buildCreateLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();
  const { calculateCreateLimitOrderFee } = useFees();
  const { getAllAssets } = useAsset();
  const { getOrderBook, reduceBookedOrdersByPrice } = useOrderBook();
  const { defaultAsset } = useAssetsContext();

  // const [assetValueInfo, setAssetValueInfo] = useState<string>("");
  // const [swapInfo, setSwapInfo] = useState<string>("");
  // const [status, setStatus] = useState<string>("");

  const calculateBasePairSellLiquidity = useCallback(
    (reducedAsks: BookedOrder[]) => {
      const sellLiquidityVolume = sum(
        reducedAsks.map((ask) => Number(ask.base))
      );
      return sellLiquidityVolume;
    },
    []
  );
  const calculateBasePairBuyLiquidity = useCallback(
    (reducedAsks: BookedOrder[]) => {
      const buyLiquidityVolume = sum(
        reducedAsks.map((ask) => Number(ask.quote))
      );
      return buyLiquidityVolume;
    },
    []
  );

  const calculateBasePairPriceForSellAmount = useCallback(
    (sellAmount: number, reducedAsks: BookedOrder[]) => {
      const initialValue = sellAmount;
      const usedOrders = [] as { price: number; buyAmount: number }[];
      let i = 0;
      while (sellAmount > 0) {
        usedOrders.push({
          price: Number(reducedAsks[i].price),
          buyAmount:
            sellAmount < Number(reducedAsks[i].base)
              ? sellAmount / Number(reducedAsks[i].price)
              : Number(reducedAsks[i].quote),
        });
        sellAmount = sellAmount - Number(reducedAsks[i].base);
        i = i + 1;
      }
      const buyAmount = usedOrders.reduce(
        (previousValue, currentElement) =>
          previousValue + currentElement.buyAmount,
        0
      );
      const price = initialValue / buyAmount;
      return price;
    },
    []
  );

  const calculateBasePairPriceForBuyAmount = useCallback(
    (buyAmount: number, reducedAsks: BookedOrder[]) => {
      const initialValue = buyAmount;
      const usedOrders = [] as { price: number; sellAmount: number }[];
      let i = 0;
      while (buyAmount > 0) {
        usedOrders.push({
          price: Number(reducedAsks[i].price),
          sellAmount:
            buyAmount < Number(reducedAsks[i].quote)
              ? buyAmount * Number(reducedAsks[i].price)
              : Number(reducedAsks[i].base),
        });
        buyAmount = buyAmount - Number(reducedAsks[i].quote);
        i = i + 1;
      }
      const sellAmount = usedOrders.reduce(
        (previousValue, currentElement) =>
          previousValue + currentElement.sellAmount,
        0
      );
      const price = sellAmount / initialValue;
      return price;
    },
    []
  );

  const calculateNonBasePairSellLiquidity = useCallback(
    (
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const availableCoreToBuy = sum(
        sellToCoreReducedAsks.map((ask) => Number(ask.quote))
      );
      const availableCoreToSell = sum(
        coreToBuyReducedAsks.map((ask) => Number(ask.base))
      );

      if (availableCoreToSell > 0) {
        if (availableCoreToSell <= availableCoreToBuy) {
          const price = calculateBasePairPriceForBuyAmount(
            availableCoreToSell,
            sellToCoreReducedAsks
          );
          return price * availableCoreToSell;
        } else {
          return calculateBasePairSellLiquidity(sellToCoreReducedAsks);
        }
      } else {
        return 0;
      }
    },
    [calculateBasePairPriceForBuyAmount, calculateBasePairSellLiquidity]
  );

  const calculateNonBasePairPriceForSellAmount = useCallback(
    (
      sellAmount: number,
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const sellToCorePrice = calculateBasePairPriceForSellAmount(
        sellAmount,
        sellToCoreReducedAsks
      );
      const coreAmount = sellAmount / sellToCorePrice;
      const coreToBuyPrice = calculateBasePairPriceForSellAmount(
        coreAmount,
        coreToBuyReducedAsks
      );
      const buyAmount = coreAmount / coreToBuyPrice;
      const price = sellAmount / buyAmount;
      return price;
    },
    [calculateBasePairPriceForSellAmount]
  );

  const calculateNonBasePairBuyLiquidity = useCallback(
    (
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const availableCoreToBuy = sum(
        sellToCoreReducedAsks.map((ask) => Number(ask.quote))
      );
      const availableCoreToSell = sum(
        coreToBuyReducedAsks.map((ask) => Number(ask.base))
      );
      if (availableCoreToSell > 0) {
        if (availableCoreToSell <= availableCoreToBuy) {
          return calculateBasePairBuyLiquidity(coreToBuyReducedAsks);
        } else {
          const price = calculateBasePairPriceForSellAmount(
            availableCoreToBuy,
            coreToBuyReducedAsks
          );
          return availableCoreToBuy / price;
        }
      } else {
        return 0;
      }
    },
    []
  );

  const calculateNonBasePairPriceForBuyAmount = useCallback(
    (
      buyAmount: number,
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const buyToCorePrice = calculateBasePairPriceForBuyAmount(
        buyAmount,
        coreToBuyReducedAsks
      );
      const coreAmount = buyAmount * buyToCorePrice;
      const coreToSellPrice = calculateBasePairPriceForBuyAmount(
        coreAmount,
        sellToCoreReducedAsks
      );
      const sellAmount = coreToSellPrice * coreAmount;
      const price = sellAmount / buyAmount;
      return price;
    },
    [calculateBasePairPriceForBuyAmount]
  );

  const updateSwapFormData = useCallback(
    async (
      sellAsset: Asset,
      buyAsset: Asset,
      inputedAmount: number,
      inputedAmountType: "sellAsset" | "buyAsset"
    ) => {
      setLoadingSwapData(true);
      if (
        sellAsset.symbol === defaultToken ||
        buyAsset.symbol === defaultToken
      ) {
        try {
          const { asks } = await getOrderBook(sellAsset, buyAsset);
          const reducedAsks = reduceBookedOrdersByPrice(asks);
          const buyLiquidityVolume = calculateBasePairBuyLiquidity(reducedAsks);
          const sellLiquidityVolume =
            calculateBasePairSellLiquidity(reducedAsks);
          setBuyLiquidityVolume(buyLiquidityVolume);
          setSellLiquidityVolume(sellLiquidityVolume);
          console.log("reduced asks", reducedAsks);

          if (inputedAmountType === "sellAsset") {
            if (inputedAmount > sellLiquidityVolume) {
              setPrice(0);
              swapForm.setFieldsValue({
                buyAmount: 0,
              });
            } else {
              const price = calculateBasePairPriceForSellAmount(
                inputedAmount,
                reducedAsks
              );
              setPrice(roundNum(price, sellAsset.precision));
              swapForm.setFieldsValue({
                buyAmount: roundNum(inputedAmount / price, buyAsset.precision),
              });
            }
          } else {
            if (inputedAmount > buyLiquidityVolume) {
              setPrice(0);
              swapForm.setFieldsValue({
                sellAmount: 0,
              });
            } else {
              const price = calculateBasePairPriceForBuyAmount(
                inputedAmount,
                reducedAsks
              );
              setPrice(roundNum(price, sellAsset.precision));
              swapForm.setFieldsValue({
                sellAmount: roundNum(inputedAmount * price, buyAsset.precision),
              });
            }
          }
          setLoadingSwapData(false);
        } catch (e) {
          console.log(e);
          setLoadingSwapData(false);
        }
      } else {
        try {
          const { asks: sellToCoreAsks } = await getOrderBook(
            sellAsset,
            defaultAsset as Asset
          );
          const sellToCoreReducedAsks =
            reduceBookedOrdersByPrice(sellToCoreAsks);

          const { asks: coreToBuyAsks } = await getOrderBook(
            defaultAsset as Asset,
            buyAsset
          );
          const coreToBuyReducedAsks = reduceBookedOrdersByPrice(coreToBuyAsks);

          console.log("sellToCoreReducedAsks", sellToCoreReducedAsks);
          console.log("coreToBuyReducedAsks", coreToBuyReducedAsks);
          const sellLiquidityVolume = calculateNonBasePairSellLiquidity(
            sellToCoreReducedAsks,
            coreToBuyReducedAsks
          );
          setSellLiquidityVolume(sellLiquidityVolume);
          const buyLiquidityVolume = calculateNonBasePairBuyLiquidity(
            sellToCoreReducedAsks,
            coreToBuyReducedAsks
          );
          setBuyLiquidityVolume(buyLiquidityVolume);
          if (inputedAmountType === "sellAsset") {
            if (inputedAmount > sellLiquidityVolume) {
              setPrice(0);
              swapForm.setFieldsValue({
                buyAmount: 0,
              });
            } else {
              const price = calculateNonBasePairPriceForSellAmount(
                inputedAmount,
                sellToCoreReducedAsks,
                coreToBuyReducedAsks
              );
              setPrice(roundNum(price, sellAsset.precision));
              swapForm.setFieldsValue({
                buyAmount: roundNum(inputedAmount / price, buyAsset.precision),
              });
            }
          } else {
            if (inputedAmount > buyLiquidityVolume) {
              setPrice(0);
              swapForm.setFieldsValue({
                sellAmount: 0,
              });
            } else {
              const price = calculateNonBasePairPriceForBuyAmount(
                inputedAmount,
                sellToCoreReducedAsks,
                coreToBuyReducedAsks
              );
              setPrice(roundNum(price, sellAsset.precision));
              swapForm.setFieldsValue({
                sellAmount: roundNum(
                  inputedAmount * price,
                  sellAsset.precision
                ),
              });
            }
          }
          setLoadingSwapData(false);
        } catch (e) {
          console.log(e);
          setLoadingSwapData(false);
        }
      }
    },
    [
      defaultToken,
      allAssets,
      allAssets.length,
      getOrderBook,
      reduceBookedOrdersByPrice,
      calculateBasePairBuyLiquidity,
      calculateBasePairSellLiquidity,
      setBuyLiquidityVolume,
      setSellLiquidityVolume,
      setPrice,
      swapForm,
      calculateBasePairPriceForSellAmount,
      calculateBasePairPriceForBuyAmount,
      setLoadingSwapData,
      calculateNonBasePairSellLiquidity,
      calculateNonBasePairBuyLiquidity,
      calculateNonBasePairPriceForSellAmount,
      calculateNonBasePairPriceForBuyAmount,
    ]
  );

  const handleValuesChange = useCallback(
    async (changedValues: any) => {
      if (allAssets && allAssets.length > 0) {
        const sellAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssets.sellAssetSymbol
        ) as Asset;
        const buyAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssets.buyAssetSymbol
        ) as Asset;

        if (changedValues.sellAmount) {
          setLastChangedField("sellAsset");
          let sellAmount: number;

          if (
            changedValues.sellAmount > 0 &&
            changedValues.sellAmount.split(".")[1]?.length > sellAsset.precision
          ) {
            sellAmount = roundNum(
              changedValues.sellAmount,
              sellAsset.precision
            );
            swapForm.setFieldsValue({
              sellAmount: sellAmount,
            });
          } else {
            sellAmount = changedValues.sellAmount;
          }
          if (sellAmount > 0) {
            await updateSwapFormData(
              sellAsset,
              buyAsset,
              sellAmount,
              "sellAsset"
            );
          }
        } else if (changedValues.buyAmount) {
          setLastChangedField("buyAsset");
          let buyAmount: number;

          if (
            changedValues.buyAmount > 0 &&
            changedValues.buyAmount.split(".")[1]?.length > buyAsset.precision
          ) {
            buyAmount = roundNum(changedValues.buyAmount, buyAsset.precision);
            swapForm.setFieldsValue({
              buyAmount: buyAmount,
            });
          } else {
            buyAmount = changedValues.buyAmount;
          }
          if (buyAmount > 0) {
            await updateSwapFormData(
              sellAsset,
              buyAsset,
              buyAmount,
              "buyAsset"
            );
          }
        } else {
          swapForm.setFieldsValue({
            buyAmount: 0,
            sellAmount: 0,
          });
          setPrice(0);
        }
      }
    },
    [
      allAssets,
      allAssets.length,
      selectedAssets,
      setLastChangedField,
      swapForm,
      setPrice,
    ]
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

  const handleBuyAssetChange = useCallback(
    (value: unknown) => {
      if (String(value) === selectedAssets.sellAssetSymbol) {
        setSelectedAssets({
          sellAssetSymbol: selectedAssets.buyAssetSymbol,
          buyAssetSymbol: String(value),
        });
      } else {
        setSelectedAssets({
          ...selectedAssets,
          buyAssetSymbol: String(value),
        });
      }
    },
    [selectedAssets, setSelectedAssets]
  );

  const handleSwapAssets = useCallback(() => {
    setSelectedAssets({
      buyAssetSymbol: selectedAssets.sellAssetSymbol,
      sellAssetSymbol: selectedAssets.buyAssetSymbol,
    });
  }, [selectedAssets, setSelectedAssets]);

  const handleAssetChange = useCallback(async () => {
    if (allAssets && allAssets.length > 0) {
      const buyAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssets.buyAssetSymbol
      ) as Asset;
      const sellAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssets.sellAssetSymbol
      ) as Asset;
      const { buyAmount, sellAmount } = swapForm.getFieldsValue();
      if (lastChangedField === "sellAsset" && sellAmount) {
        await updateSwapFormData(sellAsset, buyAsset, sellAmount, "sellAsset");
      } else if (lastChangedField === "buyAsset" && buyAmount) {
        await updateSwapFormData(sellAsset, buyAsset, buyAmount, "buyAsset");
      } else {
        swapForm.setFieldsValue({
          buyAmount: 0,
          sellAmount: 0,
        });
        setPrice(0);
      }
    }
  }, [
    allAssets,
    allAssets.length,
    swapForm,
    lastChangedField,
    selectedAssets,
    updateSwapFormData,
    setPrice,
  ]);

  const calculateSelectedAssetsSwapFee = useCallback(() => {
    if (allAssets && allAssets.length > 0) {
      const sellAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssets.sellAssetSymbol
      ) as Asset;
      const buyAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssets.buyAssetSymbol
      ) as Asset;
      const swapOrderFee = calculateCreateLimitOrderFee(sellAsset, buyAsset);
      if (
        selectedAssets.sellAssetSymbol === defaultToken ||
        selectedAssets.buyAssetSymbol === defaultToken
      ) {
        return swapOrderFee !== undefined ? swapOrderFee.fee : undefined;
      } else {
        return swapOrderFee !== undefined ? swapOrderFee.fee * 2 : undefined;
      }
    }
  }, [
    allAssets,
    allAssets.length,
    selectedAssets,
    calculateCreateLimitOrderFee,
    defaultToken,
  ]);

  const setAllAssets = useCallback(async () => {
    try {
      setLoadingAssets(true);
      const allAssets = await getAllAssets();
      if (allAssets && allAssets.length > 0) {
        _setAllAssets(allAssets);
      }
      setLoadingAssets(false);
    } catch (e) {
      console.log(e);
      setLoadingAssets(false);
    }
  }, [getAllAssets, _setAllAssets, setLoadingAssets]);

  const setBalances = useCallback(() => {
    if (assets && assets.length > 0) {
      const userSellAsset = assets.find(
        (asset) => asset.symbol === selectedAssets.sellAssetSymbol
      );
      const userBuyAsset = assets.find(
        (asset) => asset.symbol === selectedAssets.buyAssetSymbol
      );
      if (userSellAsset) {
        setSellAssetBalance(userSellAsset.amount as number);
      } else {
        setSellAssetBalance(0);
      }
      if (userBuyAsset) {
        setBuyAssetBalance(userBuyAsset.amount as number);
      } else {
        setBuyAssetBalance(0);
      }
    }
  }, [assets, selectedAssets, setSellAssetBalance, setBuyAssetBalance]);

  const handleSwapSubmit = useCallback(
    async (password: string) => {
      if (allAssets && allAssets.length) {
        const { sellAmount, buyAmount } = swapForm.getFieldsValue();
        setTransactionModalSellAmount(sellAmount);
        setTransactionModalBuyAmount(buyAmount);
        const sellAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssets.sellAssetSymbol
        ) as Asset;
        const buyAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssets.buyAssetSymbol
        ) as Asset;
        const activeKey = getPrivateKey(password, "active");
        const expiration = new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 365
        ).toISOString();

        if (
          selectedAssets.sellAssetSymbol === defaultToken ||
          selectedAssets.buyAssetSymbol === defaultToken
        ) {
          const trx = buildCreateLimitOrderTransaction(
            id,
            buyAmount,
            sellAmount,
            sellAsset,
            buyAsset,
            expiration,
            false,
            [],
            true
          );
          let trxResult;
          try {
            setLoadingTransaction(true);
            trxResult = await buildTrx([trx], [activeKey]);
          } catch (e) {
            console.log(e);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
          }
          if (trxResult) {
            formAccountBalancesByName(localStorageAccount);
            swapForm.resetFields();
            setTransactionErrorMessage("");
            setTransactionSuccessMessage(
              counterpart.translate(`field.success.limit_order_successfully`)
            );
            setLoadingTransaction(false);
          } else {
            swapForm.resetFields();
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.unable_transaction`)
            );
            setLoadingTransaction(false);
          }
        } else {
        }
      }
    },
    [
      allAssets,
      swapForm,
      setTransactionModalSellAmount,
      setTransactionModalBuyAmount,
      selectedAssets,
      getPrivateKey,
      defaultToken,
      buildCreateLimitOrderTransaction,
      id,
      setLoadingTransaction,
      buildTrx,
      setTransactionErrorMessage,
      formAccountBalancesByName,
    ]
  );

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

  useEffect(() => {
    setBalances();
  }, [setBalances]);

  useEffect(() => {
    setAllAssets();
  }, [setAllAssets]);

  useEffect(() => {
    const swapOrderFee = calculateSelectedAssetsSwapFee();
    if (swapOrderFee) {
      setSwapOrderFee(swapOrderFee);
    }
  }, [calculateSelectedAssetsSwapFee]);

  useEffect(() => {
    handleAssetChange();
  }, [handleAssetChange]);

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

  // useEffect(() => {
  //   const values = swapForm.getFieldsValue();
  //   let value = 0;
  //   let valueType: "sellAsset" | "buyAsset" = "sellAsset";
  //   if (lastChangedField === "sellAsset") {
  //     valueType = "sellAsset";
  //     value = values.sellAmount;
  //   } else {
  //     valueType = "buyAsset";
  //     value = values.buyAmount;
  //   }
  //   if (value && value > 0) {
  //     calculatePrice(selectedAssets.sellAssetSymbol);
  //   }
  // }, [selectedAssets]);

  return {
    swapForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    selectedAssets,
    allAssets,
    handleSellAssetChange,
    handleBuyAssetChange,
    localStorageAccount,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    swapOrderFee,
    price,
    loadingSwapData,
    loadingAssets,
    handleSwapAssets,
    handleValuesChange,
    buyAssetBalance,
    sellAssetBalance,
    transactionModalSellAmount,
    transactionModalBuyAmount,
    handleSwapSubmit,
  };
}
