import dynamic from "next/dynamic";

const DynamicPriceChart = dynamic(() => import("./CreatePriceChart"), {
  ssr: false,
});

export const PriceChart = (): JSX.Element => {
  return <DynamicPriceChart />;
};
