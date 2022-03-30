import { ChainTypes } from "peerplaysjs-lib";
import { useEffect, useState } from "react";

import { useAsset, useFees } from "../../../../../common/hooks";

import { FeesTableRow, UseFeesTab } from "./useFeesTab.types";

export function useFeesTab(): UseFeesTab {
  const [loading, setLoading] = useState<boolean>(false);
  const [genFeesTableData, setGenFeesTableData] = useState<FeesTableRow[]>([]);
  const [assetFeesTableData, setAssetFeesTableData] = useState<FeesTableRow[]>(
    []
  );
  const [accountFeesTableData, setAccountFeesTableData] = useState<
    FeesTableRow[]
  >([]);
  const [bizFeesTableData, setBizFeesTableData] = useState<FeesTableRow[]>([]);
  const [gameFeesTableData, setGameFeesTableData] = useState<FeesTableRow[]>(
    []
  );
  const { feeParameters } = useFees();
  const { defaultAsset, setPrecision } = useAsset();

  useEffect(() => {
    getFees();
  }, [feeParameters]);

  const getFees = async () => {
    setLoading(true);
    const allOperationsTypes = Object.keys(ChainTypes.operations);
    if (feeParameters.length > 0 || defaultAsset) {
      const rawOperations = await Promise.all(
        allOperationsTypes.map(async (op, index) => ({
          operation: op.replace(/_/gi, " "),
          ...feeParameters[index],
        }))
      );

      const genOps: FeesTableRow[] | any[] = [];
      const assetOps: FeesTableRow[] | any[] = [];
      const accountOps: FeesTableRow[] | any[] = [];
      const bizOps: FeesTableRow[] | any[] = [];
      const gameOps: FeesTableRow[] | any[] = [];

      const rawAssetOps = rawOperations.filter(
        (op) => op.operation.includes("asset") || op.operation.includes("nft")
      );
      const rawAccountOps = rawOperations.filter((op) =>
        op.operation.includes("account")
      );
      const rawBizOps = rawOperations.filter(
        (op) =>
          op.operation.includes("witness") ||
          op.operation.includes("committee") ||
          op.operation.includes("proposal")
      );
      const rawGameOps = rawOperations.filter(
        (op) =>
          op.operation.includes("game") ||
          op.operation.includes("sport") ||
          op.operation.includes("tournament") ||
          op.operation.includes("bid") ||
          op.operation.includes("bet") ||
          op.operation.includes("blind") ||
          op.operation.includes("betting")
      );
      const rawGenOps = rawOperations.filter(
        (op) =>
          !op.operation.includes("asset") &&
          !op.operation.includes("nft") &&
          !op.operation.includes("account") &&
          !op.operation.includes("witness") &&
          !op.operation.includes("committee") &&
          !op.operation.includes("proposal") &&
          !op.operation.includes("game") &&
          !op.operation.includes("sport") &&
          !op.operation.includes("tournament") &&
          !op.operation.includes("bid") &&
          !op.operation.includes("bet") &&
          !op.operation.includes("blind") &&
          !op.operation.includes("betting")
      );
      rawAccountOps.forEach((op) => formRows(accountOps, op));
      rawAssetOps.forEach((op) => formRows(assetOps, op));
      rawBizOps.forEach((op) => formRows(bizOps, op));
      rawGameOps.forEach((op) => formRows(gameOps, op));
      rawGenOps.forEach((op) => formRows(genOps, op));

      setGenFeesTableData(genOps);
      setAssetFeesTableData(assetOps);
      setAccountFeesTableData(accountOps);
      setBizFeesTableData(bizOps);
      setGameFeesTableData(gameOps);
    }

    setLoading(false);
  };

  const formRows = (array: FeesTableRow[], op: any) => {
    if (op[1].fee || Object.keys(op[1]).length === 0) {
      array.push({
        operation: op.operation,
        type: "Regular Transaction Fee",
        fee: `${
          op[1].fee
            ? setPrecision(false, op[1].fee, defaultAsset?.precision)
            : 0
        } ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].basic_fee) {
      array.push({
        operation: op.operation,
        type: "Basic Fee",
        fee: `${setPrecision(
          false,
          op[1].basic_fee,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].membership_lifetime_fee) {
      array.push({
        operation: op.operation,
        type: "Lifetime Membership Fee",
        fee: `${setPrecision(
          false,
          op[1].membership_lifetime_fee,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].distribution_base_fee) {
      array.push({
        operation: op.operation,
        type: "Distribution Base Fee",
        fee: `${setPrecision(
          false,
          op[1].distribution_base_fee,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].lottery_asset) {
      array.push({
        operation: op.operation,
        type: "Distribution Base Fee",
        fee: `${setPrecision(
          false,
          op[1].lottery_asset,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].symbol3) {
      array.push({
        operation: op.operation,
        type: "Symbole With 3 Characters",
        fee: `${setPrecision(false, op[1].symbol3, defaultAsset?.precision)} ${
          defaultAsset?.symbol
        }`,
      });
    }
    if (op[1].premium_fee) {
      array.push({
        operation: "",
        type: "Premium Fee",
        fee: `${setPrecision(
          false,
          op[1].premium_fee,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].symbol4) {
      array.push({
        operation: "",
        type: "Symbole With 4 Characters",
        fee: `${setPrecision(false, op[1].symbol4, defaultAsset?.precision)} ${
          defaultAsset?.symbol
        }`,
      });
    }
    if (op[1].long_symbol) {
      array.push({
        operation: "",
        type: "Longer Symbols",
        fee: `${setPrecision(
          false,
          op[1].long_symbol,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].membership_annual_fee) {
      array.push({
        operation: "",
        type: "Annual Membership Fee",
        fee: `${setPrecision(
          false,
          op[1].membership_annual_fee,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].distribution_fee_per_holder) {
      array.push({
        operation: "",
        type: "Distribution Fee Per Holder",
        fee: `${setPrecision(
          false,
          op[1].distribution_fee_per_holder,
          defaultAsset?.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    if (op[1].price_per_kbyte) {
      array.push({
        operation: "",
        type: "Price per Kbyte Transaction Size",
        fee: `${setPrecision(
          false,
          op[1].price_per_kbyte,
          defaultAsset.precision
        )} ${defaultAsset?.symbol}`,
      });
    }
    ///return array;
  };

  return {
    loading,
    genFeesTableData,
    assetFeesTableData,
    accountFeesTableData,
    bizFeesTableData,
    gameFeesTableData,
  };
}
