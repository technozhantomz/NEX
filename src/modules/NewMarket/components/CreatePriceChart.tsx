import React from "react";

import { useCreatePriceChart } from "./hooks/useCreatePriceChart";

const CreatePriceChart = (): JSX.Element => {
  const { chartContainerRef } = useCreatePriceChart();

  return <div ref={chartContainerRef} />;
};

export default CreatePriceChart;
