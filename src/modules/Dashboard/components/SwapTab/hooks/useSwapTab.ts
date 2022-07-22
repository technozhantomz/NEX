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

import {
  SwapAssetPair,
  SwapForm,
  SwapInputType,
  UseSwapResult,
} from "./useSwapTab.types";

export function useSwap(): UseSwapResult {
  const [transactionErrorMessage, setTransactionErrorMessage] =
    useState<string>("");
  const [transactionSuccessMessage, setTransactionSuccessMessage] =
    useState<string>("");
  const [loadingTransaction, setLoadingTransaction] = useState<boolean>(false);
  const { localStorageAccount, assets, id } = useUserContext();
  const [selectedAssetsSymbols, setSelectedAssetsSymbols] =
    useState<SwapAssetPair>({
      sellAssetSymbol: defaultToken as string,
      buyAssetSymbol: "BTC",
    });
  const [lastChangedField, setLastChangedField] =
    useState<SwapInputType>("sellAsset");
  const [loadingSwapData, setLoadingSwapData] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [buyLiquidityVolume, setBuyLiquidityVolume] = useState<number>(0);
  const [sellLiquidityVolume, setSellLiquidityVolume] = useState<number>(0);
  const [allAssets, _setAllAssets] = useState<Asset[]>([]);
  const [swapOrderFee, setSwapOrderFee] = useState<number>(0);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [sellAssetBalance, setSellAssetBalance] = useState<number>(0);
  const [buyAssetBalance, setBuyAssetBalance] = useState<number>(0);
  const [sellAmountErrors, setSellAmountErrors] = useState<string[]>([]);
  const [buyAmountErrors, setBuyAmountErrors] = useState<string[]>([]);
  const [sellAsset, setSellAsset] = useState<Asset | undefined>();
  const [buyAsset, setBuyAsset] = useState<Asset | undefined>();
  const [middleTrxCoreAmount, setMiddleTrxCoreAmount] = useState<number>(0);

  const [swapForm] = Form.useForm<SwapForm>();
  const { buildTrx } = useTransactionBuilder();
  const { getPrivateKey, formAccountBalancesByName } = useAccount();
  const { buildCreateLimitOrderTransaction } =
    useLimitOrderTransactionBuilder();
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
      const sellAmount = sum(usedOrders.map((order) => order.sellAmount));
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
      setMiddleTrxCoreAmount(coreAmount);
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
    [calculateBasePairBuyLiquidity, calculateBasePairPriceForSellAmount]
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
      setMiddleTrxCoreAmount(coreAmount);
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
        } catch (e) {
          console.log(e);
          setPrice(0);
          swapForm.setFieldsValue({
            buyAmount: 0,
            sellAmount: 0,
          });
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
        } catch (e) {
          console.log(e);
          setPrice(0);
          swapForm.setFieldsValue({
            buyAmount: 0,
            sellAmount: 0,
          });
        }
      }
    },
    [
      defaultToken,
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
            sellAmount > 0 &&
            String(sellAmount).split(".")[1]?.length > sellAsset.precision
          ) {
            sellAmount = roundNum(sellAmount, sellAsset.precision);
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
            setPrice(0);
          }
        } else if (changedValues.buyAmount !== undefined) {
          setLastChangedField("buyAsset");
          let buyAmount = Number(changedValues.buyAmount);

          if (
            buyAmount > 0 &&
            String(buyAmount).split(".")[1]?.length > buyAsset.precision
          ) {
            buyAmount = roundNum(buyAmount, buyAsset.precision);
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
            setPrice(0);
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
      setPrice,
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
        setPrice(0);
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
  }, [
    allAssets,
    allAssets.length,
    selectedAssetsSymbols,
    swapForm,
    lastChangedField,
    updateSwapFormData,
    setPrice,
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
        const expiration = new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24 * 365
        ).toISOString();

        if (
          selectedAssetsSymbols.sellAssetSymbol === defaultToken ||
          selectedAssetsSymbols.buyAssetSymbol === defaultToken
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
            swapForm.resetFields();
            setPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
          }
          if (trxResult) {
            formAccountBalancesByName(localStorageAccount);
            swapForm.resetFields();
            setPrice(0);
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
            setPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.unable_transaction`)
            );
            setLoadingTransaction(false);
          }
        } else {
          const buyCoreAssetTrx = buildCreateLimitOrderTransaction(
            id,
            middleTrxCoreAmount,
            sellAmount,
            sellAsset,
            defaultAsset as Asset,
            expiration,
            false,
            [],
            true
          );
          let buyCoreAssetTrxResult;
          try {
            setLoadingTransaction(true);
            buyCoreAssetTrxResult = await buildTrx(
              [buyCoreAssetTrx],
              [activeKey]
            );
          } catch (e) {
            console.log(e);
            swapForm.resetFields();
            setPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.transaction_unable`)
            );
            setLoadingTransaction(false);
          }
          if (buyCoreAssetTrxResult) {
            const sellCoreAssetTrx = buildCreateLimitOrderTransaction(
              id,
              buyAmount,
              middleTrxCoreAmount,
              defaultAsset as Asset,
              buyAsset,
              expiration,
              false,
              [],
              true
            );
            let sellCoreAssetTrxResult;
            try {
              sellCoreAssetTrxResult = await buildTrx(
                [sellCoreAssetTrx],
                [activeKey]
              );
            } catch (e) {
              console.log(e);
              swapForm.resetFields();
              setPrice(0);
              setTransactionErrorMessage(
                counterpart.translate(`field.errors.transaction_unable`)
              );
              setLoadingTransaction(false);
            }
            if (sellCoreAssetTrxResult) {
              formAccountBalancesByName(localStorageAccount);
              swapForm.resetFields();
              setPrice(0);
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
              setPrice(0);
              setTransactionErrorMessage(
                counterpart.translate(`field.errors.unable_transaction`)
              );
              setLoadingTransaction(false);
            }
          } else {
            swapForm.resetFields();
            setPrice(0);
            setTransactionErrorMessage(
              counterpart.translate(`field.errors.unable_transaction`)
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
      buildCreateLimitOrderTransaction,
      id,
      setLoadingTransaction,
      buildTrx,
      setTransactionErrorMessage,
      setTransactionSuccessMessage,
      formAccountBalancesByName,
      setPrice,
      localStorageAccount,
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

  useEffect(() => {
    const { buyAmount, sellAmount } = swapForm.getFieldsValue();
    if (!buyAmount && !sellAmount) {
      setSellAmountErrors([counterpart.translate(`buttons.enter_amount`)]);
    }
  }, []);

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
    price,
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
