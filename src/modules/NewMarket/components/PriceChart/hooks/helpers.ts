// import { defaultToken } from "../../../../../api/params";

export type ExchangeSymbol = {
  short: string;
  full: string;
};

export const generateSymbol = (
  exchange: string,
  fromSymbol: string,
  toSymbol: string
): ExchangeSymbol => {
  const short = `${fromSymbol}/${toSymbol}`;
  return {
    short,
    full: `${exchange}:${short}`,
  };
};

// export const parseFullSymbol = (
//   fullSymbol: string
// ): { exchange: string; fromSymbol: string; toSymbol: string } | null => {
//   const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
//   if (!match) {
//     return null;
//   }

//   return {
//     exchange: match[1],
//     fromSymbol: match[2],
//     toSymbol: match[3],
//   };
// };

// export const getAllSymbols = async () => {
//   let allSymbols = [];
//   const allAssets = await getAllAssets();

//   const symbols = allAssets?.map((asset) => {
//     if (asset.symbol !== defaultToken) {
//       const symbol = generateSymbol(
//         "PeerplaysDex",
//         defaultToken as string,
//         asset.symbol
//       );
//       return {
//         symbol: symbol.short,
//         full_name: symbol.full,
//         description: symbol.short,
//         exchange: "PeerplaysDex",
//         type: "crypto",
//       };
//     }
//   });
//   allSymbols = [...(symbols as ExchangeSymbols[])];

//   return allSymbols;
// };
