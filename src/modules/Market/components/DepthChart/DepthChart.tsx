import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

import * as Styled from "./DepthChart.styled";
import { useDepthChart } from "./hooks";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export const DepthChart = (): JSX.Element => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { depthChartOptions } = useDepthChart();

  return (
    <Styled.DepthChartContainer>
      <HighchartsReact
        allowChartUpdate={true}
        immutable={false}
        highcharts={Highcharts}
        options={depthChartOptions}
        containerProps={{ className: "chart-container" }}
        ref={chartComponentRef}
      />
    </Styled.DepthChartContainer>
  );
};
