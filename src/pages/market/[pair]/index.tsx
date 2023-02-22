import { GetServerSideProps } from "next";

import { defaultToken, tradeableAssetsSymbols } from "../../../api/params";

export { default } from "../../../modules/Market";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (
    !context.params ||
    !/^[^_]+_[^_]+$/.test(context.params.pair as string) ||
    !tradeableAssetsSymbols.includes(
      (context.params.pair as string).split("_")[0]
    ) ||
    !tradeableAssetsSymbols.includes(
      (context.params.pair as string).split("_")[1]
    ) ||
    !(context.params.pair as string).includes(defaultToken as string)
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
};
