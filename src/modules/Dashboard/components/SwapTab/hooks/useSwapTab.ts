import counterpart from "counterpart";
import { sum } from "lodash";
import { useCallback, useEffect, useState } from "react";

import { defaultToken } from "../../../../../api/params";
import {
  roundNum,
  useAccount,
  useAsset,
  useFees,
  useOrderBook,
  useOrderTransactionBuilder,
  useTransactionBuilder,
  useUpdateExchanges,
} from "../../../../../common/hooks";
import {
  useAssetsContext,
  useUserContext,
} from "../../../../../common/providers";
import { Asset, BookedOrder } from "../../../../../common/types";
import { Form } from "../../../../../ui/src";

import {
  SwapAssetPair,
  SwapForm,
  SwapInputType,
  UseSwapResult,
} from "./useSwapTab.types";

export function useSwap(): UseSwapResult {
  const { exchanges, updateSwapPair } = useUpdateExchanges();
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { localStorageAccount, assets, id } = useUserContext();
  const [selectedAssetsSymbols, setSelectedAssetsSymbols] =
    useState<SwapAssetPair>({
      sellAssetSymbol: exchanges.swapPair?.split("_")[1] as string,
      buyAssetSymbol: exchanges.swapPair?.split("_")[0] as string,
    });
  const [lastChangedField, setLastChangedField] =
    useState<SwapInputType>("sellAsset");
  const [loadingSwapData, setLoadingSwapData] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [buyLiquidityVolume, setBuyLiquidityVolume] = useState<number>(0);
  const [sellLiquidityVolume, setSellLiquidityVolume] = useState<number>(0);
  const [allAssets, _setAllAssets] = useState<Asset[]>([]);
  const [swapOrderFee, setSwapOrderFee] = useState<number>(0);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [sellAssetBalance, setSellAssetBalance] = useState<number>(0);
  const [buyAssetBalance, setBuyAssetBalance] = useState<number>(0);
  const [sellAmountErrors, setSellAmountErrors] = useState<string[]>([
    `${counterpart.translate(`buttons.enter_amount`)}`,
  ]);
  const [buyAmountErrors, setBuyAmountErrors] = useState<string[]>([]);
  const [sellAsset, setSellAsset] = useState<Asset | undefined>();
  const [buyAsset, setBuyAsset] = useState<Asset | undefined>();
  const [middleTrxCoreAmount, setMiddleTrxCoreAmount] = useState<number>(0);
  const [middleTrxOrderPrice, setMiddleTrxOrderPrice] = useState<number>(0);

  const [swapForm] = Form.useForm<SwapForm>();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { buildSwapTransaction } = useOrderTransactionBuilder();
  const { calculateCreateLimitOrderFee } = useFees();
  const { getAllAssets } = useAsset();
  const { getOrderBook, reduceBookedOrdersByPrice } = useOrderBook();
  const { defaultAsset } = useAssetsContext();

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
      const buyAmount = sum(usedOrders.map((order) => order.buyAmount));
      const calculatedPrice = initialValue / buyAmount;
      const orderPrice = usedOrders[usedOrders.length - 1].price;
      return { calculatedPrice, orderPrice };
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
      const sellAmount = sum(usedOrders.map((order) => order.sellAmount));
      const calculatedPrice = sellAmount / initialValue;
      const orderPrice = usedOrders[usedOrders.length - 1].price;
      return { calculatedPrice, orderPrice };
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
          const { calculatedPrice } = calculateBasePairPriceForBuyAmount(
            availableCoreToSell,
            sellToCoreReducedAsks
          );
          return calculatedPrice * availableCoreToSell;
        } else {
          return calculateBasePairSellLiquidity(sellToCoreReducedAsks);
        }
      } else {
        return 0;
      }
    },
    [calculateBasePairPriceForBuyAmount, calculateBasePairSellLiquidity]
  );
  //TODO: needs separation of concerns
  const calculateNonBasePairPriceForSellAmount = useCallback(
    (
      sellAmount: number,
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const {
        calculatedPrice: sellToCorePrice,
        orderPrice: sellToCoreOrderPrice,
      } = calculateBasePairPriceForSellAmount(
        sellAmount,
        sellToCoreReducedAsks
      );
      const coreAmount = sellAmount / sellToCorePrice;

      setMiddleTrxCoreAmount(coreAmount);
      setMiddleTrxOrderPrice(sellToCoreOrderPrice);

      const {
        calculatedPrice: coreToBuyPrice,
        orderPrice: coreToBuyOrderPrice,
      } = calculateBasePairPriceForSellAmount(coreAmount, coreToBuyReducedAsks);

      const buyAmount = coreAmount / coreToBuyPrice;
      const calculatedPrice = sellAmount / buyAmount;
      return { calculatedPrice, orderPrice: coreToBuyOrderPrice };
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
          const { calculatedPrice } = calculateBasePairPriceForSellAmount(
            availableCoreToBuy,
            coreToBuyReducedAsks
          );
          return availableCoreToBuy / calculatedPrice;
        }
      } else {
        return 0;
      }
    },
    [calculateBasePairBuyLiquidity, calculateBasePairPriceForSellAmount]
  );

  //TODO: needs separation of concern
  const calculateNonBasePairPriceForBuyAmount = useCallback(
    (
      buyAmount: number,
      sellToCoreReducedAsks: BookedOrder[],
      coreToBuyReducedAsks: BookedOrder[]
    ) => {
      const {
        calculatedPrice: buyToCorePrice,
        orderPrice: buyToCoreOrderPrice,
      } = calculateBasePairPriceForBuyAmount(buyAmount, coreToBuyReducedAsks);
      const coreAmount = buyAmount * buyToCorePrice;
      setMiddleTrxCoreAmount(coreAmount);

      const {
        calculatedPrice: coreToSellPrice,
        orderPrice: coreToSellOrderPrice,
      } = calculateBasePairPriceForBuyAmount(coreAmount, sellToCoreReducedAsks);
      setMiddleTrxOrderPrice(coreToSellOrderPrice);

      const sellAmount = coreToSellPrice * coreAmount;
      const calculatedPrice = sellAmount / buyAmount;
      return { calculatedPrice, orderPrice: buyToCoreOrderPrice };
    },
    [calculateBasePairPriceForBuyAmount]
  );

  //TODO: needs separation of concerns
  const updateSwapFormData = useCallback(
    async (
      sellAsset: Asset,
      buyAsset: Asset,
      inputedAmount: number,
      inputedAmountType: SwapInputType
    ) => {
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

          if (inputedAmountType === "sellAsset") {
            // unsuccessful
            if (inputedAmount > sellLiquidityVolume) {
              setCalculatedPrice(0);
              swapForm.setFieldsValue({
                buyAmount: 0,
              });
            } else {
              const { calculatedPrice, orderPrice } =
                calculateBasePairPriceForSellAmount(inputedAmount, reducedAsks);
              setCalculatedPrice(
                roundNum(calculatedPrice, sellAsset.precision)
              );
              swapForm.setFieldsValue({
                buyAmount: roundNum(
                  inputedAmount / calculatedPrice,
                  buyAsset.precision
                ),
              });
              setOrderPrice(orderPrice);
            }
            // inputedAmountType = "buyAsset"
          } else {
            //unsuccessful
            if (inputedAmount > buyLiquidityVolume) {
              setCalculatedPrice(0);
              swapForm.setFieldsValue({
                sellAmount: 0,
              });
            } else {
              const { calculatedPrice, orderPrice } =
                calculateBasePairPriceForBuyAmount(inputedAmount, reducedAsks);
              setCalculatedPrice(
                roundNum(calculatedPrice, sellAsset.precision)
              );
              swapForm.setFieldsValue({
                sellAmount: roundNum(
                  inputedAmount * calculatedPrice,
                  buyAsset.precision
                ),
              });
              setOrderPrice(orderPrice);
            }
          }
        } catch (e) {
          console.log(e);
          setCalculatedPrice(0);
          swapForm.setFieldsValue({
            buyAmount: 0,
            sellAmount: 0,
          });
          setOrderPrice(0);
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
            // unsuccessful
            if (inputedAmount > sellLiquidityVolume) {
              setCalculatedPrice(0);
              swapForm.setFieldsValue({
                buyAmount: 0,
              });
            } else {
              const { calculatedPrice, orderPrice } =
                calculateNonBasePairPriceForSellAmount(
                  inputedAmount,
                  sellToCoreReducedAsks,
                  coreToBuyReducedAsks
                );
              setCalculatedPrice(
                roundNum(calculatedPrice, sellAsset.precision)
              );
              swapForm.setFieldsValue({
                buyAmount: roundNum(
                  inputedAmount / calculatedPrice,
                  buyAsset.precision
                ),
              });
              setOrderPrice(orderPrice);
            }
            // inputedAmountType === "buyAsset"
          } else {
            // unsuccessful
            if (inputedAmount > buyLiquidityVolume) {
              setCalculatedPrice(0);
              swapForm.setFieldsValue({
                sellAmount: 0,
              });
            } else {
              const { calculatedPrice, orderPrice } =
                calculateNonBasePairPriceForBuyAmount(
                  inputedAmount,
                  sellToCoreReducedAsks,
                  coreToBuyReducedAsks
                );
              setCalculatedPrice(
                roundNum(calculatedPrice, sellAsset.precision)
              );
              swapForm.setFieldsValue({
                sellAmount: roundNum(
                  inputedAmount * calculatedPrice,
                  sellAsset.precision
                ),
              });
              setOrderPrice(orderPrice);
            }
          }
        } catch (e) {
          console.log(e);
          setCalculatedPrice(0);
          swapForm.setFieldsValue({
            buyAmount: 0,
            sellAmount: 0,
          });
          setOrderPrice(0);
        }
      }
    },
    [
      defaultToken,
      defaultAsset,
      getOrderBook,
      reduceBookedOrdersByPrice,
      calculateBasePairBuyLiquidity,
      calculateBasePairSellLiquidity,
      setBuyLiquidityVolume,
      setSellLiquidityVolume,
      setCalculatedPrice,
      swapForm,
      calculateBasePairPriceForSellAmount,
      calculateBasePairPriceForBuyAmount,
      calculateNonBasePairSellLiquidity,
      calculateNonBasePairBuyLiquidity,
      calculateNonBasePairPriceForSellAmount,
      calculateNonBasePairPriceForBuyAmount,
      roundNum,
    ]
  );

  const handleValuesChange = useCallback(
    async (changedValues: any) => {
      if (sellAsset && buyAsset) {
        setLoadingSwapData(true);

        if (changedValues.sellAmount !== undefined) {
          setLastChangedField("sellAsset");
          let sellAmount = Number(changedValues.sellAmount);
          if (
            changedValues.sellAmount.split(".")[1]?.length >=
            sellAsset.precision
          ) {
            sellAmount =
              roundNum(sellAmount, sellAsset.precision) > 0
                ? roundNum(sellAmount, sellAsset.precision)
                : sellAmount;
            swapForm.setFieldsValue({
              sellAmount: sellAmount,
            });
          }
          if (sellAmount > 0) {
            await updateSwapFormData(
              sellAsset,
              buyAsset,
              sellAmount,
              "sellAsset"
            );
          } else {
            swapForm.setFieldsValue({
              buyAmount: 0,
            });
            setCalculatedPrice(0);
          }
        } else if (changedValues.buyAmount !== undefined) {
          setLastChangedField("buyAsset");
          let buyAmount = Number(changedValues.buyAmount);

          if (
            changedValues.buyAmount.split(".")[1]?.length >= buyAsset.precision
          ) {
            buyAmount =
              roundNum(buyAmount, buyAsset.precision) > 0
                ? roundNum(buyAmount, buyAsset.precision)
                : buyAmount;
            swapForm.setFieldsValue({
              buyAmount: buyAmount,
            });
          }
          if (buyAmount > 0) {
            await updateSwapFormData(
              sellAsset,
              buyAsset,
              buyAmount,
              "buyAsset"
            );
          } else {
            swapForm.setFieldsValue({
              sellAmount: 0,
            });
            setCalculatedPrice(0);
          }
        }
        try {
          await swapForm.validateFields();
          setSellAmountErrors([]);
          setBuyAmountErrors([]);
        } catch (e) {
          console.log(e);
          setSellAmountErrors(swapForm.getFieldError("sellAmount"));
          setBuyAmountErrors(swapForm.getFieldError("buyAmount"));
        }
        setLoadingSwapData(false);
      }
    },
    [
      sellAsset,
      buyAsset,
      setLastChangedField,
      swapForm,
      setCalculatedPrice,
      setSellAmountErrors,
      setBuyAmountErrors,
      setLoadingSwapData,
    ]
  );

  const handleSellAssetChange = useCallback(
    (value: unknown) => {
      if (String(value) === selectedAssetsSymbols.buyAssetSymbol) {
        setSelectedAssetsSymbols({
          buyAssetSymbol: selectedAssetsSymbols.sellAssetSymbol,
          sellAssetSymbol: String(value),
        });
      } else {
        setSelectedAssetsSymbols({
          ...selectedAssetsSymbols,
          sellAssetSymbol: String(value),
        });
      }
    },
    [selectedAssetsSymbols, setSelectedAssetsSymbols]
  );

  const handleBuyAssetChange = useCallback(
    (value: unknown) => {
      if (String(value) === selectedAssetsSymbols.sellAssetSymbol) {
        setSelectedAssetsSymbols({
          sellAssetSymbol: selectedAssetsSymbols.buyAssetSymbol,
          buyAssetSymbol: String(value),
        });
      } else {
        setSelectedAssetsSymbols({
          ...selectedAssetsSymbols,
          buyAssetSymbol: String(value),
        });
      }
    },

    [selectedAssetsSymbols, setSelectedAssetsSymbols]
  );

  const handleSwapAssets = useCallback(() => {
    setSelectedAssetsSymbols({
      buyAssetSymbol: selectedAssetsSymbols.sellAssetSymbol,
      sellAssetSymbol: selectedAssetsSymbols.buyAssetSymbol,
    });
  }, [selectedAssetsSymbols, setSelectedAssetsSymbols]);

  const handleAssetChange = useCallback(async () => {
    if (allAssets && allAssets.length) {
      setLoadingSwapData(true);
      const sellAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.sellAssetSymbol
      ) as Asset;
      const buyAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.buyAssetSymbol
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
        setCalculatedPrice(0);
      }
      try {
        await swapForm.validateFields();
        setSellAmountErrors([]);
        setBuyAmountErrors([]);
      } catch (e) {
        console.log(e);
        setSellAmountErrors(swapForm.getFieldError("sellAmount"));
        setBuyAmountErrors(swapForm.getFieldError("buyAmount"));
      }
      updateSwapPair(`${buyAsset.symbol}_${sellAsset.symbol}`);
      setLoadingSwapData(false);
    }
  }, [
    allAssets,
    allAssets.length,
    selectedAssetsSymbols,
    swapForm,
    lastChangedField,
    updateSwapFormData,
    setCalculatedPrice,
    setSellAmountErrors,
    setBuyAmountErrors,
    setLoadingSwapData,
  ]);

  const calculateSelectedAssetsSwapFee = useCallback(() => {
    if (sellAsset && buyAsset) {
      const swapOrderFee = calculateCreateLimitOrderFee(sellAsset, buyAsset);
      if (
        selectedAssetsSymbols.sellAssetSymbol === defaultToken ||
        selectedAssetsSymbols.buyAssetSymbol === defaultToken
      ) {
        return swapOrderFee !== undefined ? swapOrderFee.fee : undefined;
      } else {
        return swapOrderFee !== undefined ? swapOrderFee.fee * 2 : undefined;
      }
    }
  }, [
    sellAsset,
    buyAsset,
    selectedAssetsSymbols,
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
        (asset) => asset.symbol === selectedAssetsSymbols.sellAssetSymbol
      );
      const userBuyAsset = assets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.buyAssetSymbol
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
  }, [assets, selectedAssetsSymbols, setSellAssetBalance, setBuyAssetBalance]);

  const setSelectedAssets = useCallback(() => {
    if (allAssets && allAssets.length) {
      const sellAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.sellAssetSymbol
      ) as Asset;
      const buyAsset = allAssets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.buyAssetSymbol
      ) as Asset;
      setBuyAsset(buyAsset);
      setSellAsset(sellAsset);
    }
  }, [
    allAssets,
    allAssets.length,
    selectedAssetsSymbols,
    setBuyAsset,
    setSellAsset,
  ]);

  const handleSwapSubmit = useCallback(
    async (password: string) => {
      if (allAssets && allAssets.length) {
        const { sellAmount, buyAmount } = swapForm.getFieldsValue();
        const sellAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssetsSymbols.sellAssetSymbol
        ) as Asset;
        const buyAsset = allAssets.find(
          (asset) => asset.symbol === selectedAssetsSymbols.buyAssetSymbol
        ) as Asset;
        const activeKey = getPrivateKey(password, "active");

        if (
          selectedAssetsSymbols.sellAssetSymbol === defaultToken ||
          selectedAssetsSymbols.buyAssetSymbol === defaultToken
        ) {
          const trx = buildSwapTransaction(
            id,
            sellAmount / orderPrice,
            sellAmount,
            sellAsset,
            buyAsset
          );
          let trxResult;
          try {
            setLoadingTransaction(true);
            trxResult = await buildTrx([trx], [activeKey]);
          } catch (e) {
            console.log(e);
            swapForm.resetFields();
            setCalculatedPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
          }
          if (trxResult) {
            formAccountBalancesByName(localStorageAccount);
            swapForm.resetFields();
            setCalculatedPrice(0);
            setTransactionErrorMessage("");
            setTransactionSuccessMessage(
              counterpart.translate(`field.success.swap_order_successfully`, {
                sellAmount: sellAmount,
                buyAmount: buyAmount,
                sellAssetSymbol: selectedAssetsSymbols.sellAssetSymbol,
                buyAssetSymbol: selectedAssetsSymbols.buyAssetSymbol,
              })
            );
            setLoadingTransaction(false);
          } else {
            swapForm.resetFields();
            setCalculatedPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.unable_transaction`)
            );
            setLoadingTransaction(false);
          }
        } else {
          const buyCoreAssetTrx = buildSwapTransaction(
            id,
            sellAmount / middleTrxOrderPrice,
            sellAmount,
            sellAsset,
            defaultAsset as Asset
          );
          const sellCoreAssetTrx = buildSwapTransaction(
            id,
            middleTrxCoreAmount / orderPrice,
            middleTrxCoreAmount,
            defaultAsset as Asset,
            buyAsset
          );
          let swapTrxResult;
          try {
            setLoadingTransaction(true);
            swapTrxResult = await buildTrx(
              [buyCoreAssetTrx, sellCoreAssetTrx],
              [activeKey]
            );
            if (swapTrxResult) {
              formAccountBalancesByName(localStorageAccount);
              swapForm.resetFields();
              setCalculatedPrice(0);
              setTransactionErrorMessage("");
              setTransactionSuccessMessage(
                counterpart.translate(`field.success.swap_order_successfully`, {
                  sellAmount: sellAmount,
                  buyAmount: buyAmount,
                  sellAssetSymbol: selectedAssetsSymbols.sellAssetSymbol,
                  buyAssetSymbol: selectedAssetsSymbols.buyAssetSymbol,
                })
              );
              setLoadingTransaction(false);
            } else {
              swapForm.resetFields();
              setCalculatedPrice(0);
              setTransactionErrorMessage(
                counterpart.translate(`field.errors.unable_transaction`)
              );
              setLoadingTransaction(false);
            }
          } catch (e) {
            console.log(e);
            swapForm.resetFields();
            setCalculatedPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
          }
        }
      }
    },
    [
      allAssets,
      allAssets.length,
      swapForm,
      selectedAssetsSymbols,
      getPrivateKey,
      defaultToken,
      buildSwapTransaction,
      id,
      setLoadingTransaction,
      buildTrx,
      setTransactionErrorMessage,
      setTransactionSuccessMessage,
      formAccountBalancesByName,
      setCalculatedPrice,
      localStorageAccount,
      orderPrice,
      defaultAsset,
      middleTrxCoreAmount,
      middleTrxOrderPrice,
    ]
  );

  const validateSellAmount = (_: unknown, value: string) => {
    if (allAssets && allAssets.length > 0) {
      const userSellAsset = assets.find(
        (asset) => asset.symbol === selectedAssetsSymbols.sellAssetSymbol
      );
      const userDefaultAsset = assets.find(
        (asset) => asset.symbol === defaultToken
      );
      const numberedValue = Number(value);
      // zero check
      if (numberedValue <= 0) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.sell_amount_should_greater`)
          )
        );
      }

      // fee check
      if (!userDefaultAsset) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.insufficient_balance_for_fee`, {
              coreAsset: defaultToken,
            })
          )
        );
      } else {
        if (swapOrderFee > (userDefaultAsset?.amount as number)) {
          return Promise.reject(
            new Error(
              counterpart.translate(
                `field.errors.insufficient_balance_for_fee`,
                {
                  coreAsset: defaultToken,
                }
              )
            )
          );
        }
      }

      // balance check
      if (!userSellAsset) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.insufficient_asset_balance`, {
              asset: selectedAssetsSymbols.sellAssetSymbol,
            })
          )
        );
      } else {
        if (selectedAssetsSymbols.sellAssetSymbol === defaultToken) {
          if (
            numberedValue + swapOrderFee >
            (userSellAsset?.amount as number)
          ) {
            return Promise.reject(
              new Error(
                counterpart.translate(
                  `field.errors.insufficient_asset_balance`,
                  {
                    asset: selectedAssetsSymbols.sellAssetSymbol,
                  }
                )
              )
            );
          }
        } else {
          if (numberedValue > (userSellAsset?.amount as number)) {
            return Promise.reject(
              new Error(
                counterpart.translate(
                  `field.errors.insufficient_asset_balance`,
                  {
                    asset: selectedAssetsSymbols.sellAssetSymbol,
                  }
                )
              )
            );
          }
        }
      }

      //Liquidity check
      if (numberedValue > sellLiquidityVolume) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.not_enough_liquidity`))
        );
      }

      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const validateBuyAmount = (_: unknown, value: string) => {
    if (allAssets && allAssets.length > 0) {
      const numberedValue = Number(value);
      // zero check
      if (numberedValue <= 0) {
        return Promise.reject(
          new Error(
            counterpart.translate(`field.errors.buy_amount_should_greater`)
          )
        );
      }

      // Liquidity check
      if (numberedValue > buyLiquidityVolume) {
        return Promise.reject(
          new Error(counterpart.translate(`field.errors.not_enough_liquidity`))
        );
      }

      return Promise.resolve();
    }
    return Promise.reject(new Error(""));
  };

  const formValidation = {
    sellAmount: [{ validator: validateSellAmount }],
    buyAmount: [{ validator: validateBuyAmount }],
  };

  useEffect(() => {
    setAllAssets();
  }, [setAllAssets]);

  useEffect(() => {
    setBalances();
  }, [setBalances]);

  useEffect(() => {
    setSelectedAssets();
  }, [setSelectedAssets]);

  useEffect(() => {
    const swapOrderFee = calculateSelectedAssetsSwapFee();
    if (swapOrderFee) {
      setSwapOrderFee(swapOrderFee);
    }
  }, [calculateSelectedAssetsSwapFee]);

  useEffect(() => {
    handleAssetChange();
  }, [selectedAssetsSymbols]);

  return {
    swapForm,
    transactionErrorMessage,
    transactionSuccessMessage,
    loadingTransaction,
    selectedAssetsSymbols,
    allAssets,
    handleSellAssetChange,
    handleBuyAssetChange,
    localStorageAccount,
    setTransactionErrorMessage,
    setTransactionSuccessMessage,
    swapOrderFee,
    price: calculatedPrice,
    loadingSwapData,
    loadingAssets,
    handleSwapAssets,
    handleValuesChange,
    buyAssetBalance,
    sellAssetBalance,
    handleSwapSubmit,
    formValidation,
    sellAmountErrors,
    buyAmountErrors,
    lastChangedField,
  };
}
