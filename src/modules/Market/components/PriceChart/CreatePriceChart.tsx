import React from "react";

import * as Styled from "./CreatePriceChart.styled";
import { useCreatePriceChart } from "./hooks/useCreatePriceChart";

const CreatePriceChart = (): JSX.Element => {
  const { chartContainerRef } = useCreatePriceChart();

  return (
    <>
      {/* <div ref={lightweightContainerRef} /> */}
      <Styled.PriceChartWrapper ref={chartContainerRef} />
    </>
  );
};

export default CreatePriceChart;
