import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";
import { useRef } from "react";

import { useDepthChart } from "./hooks/useDepthChart";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

export const DepthChart = (): JSX.Element => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { depthChartOptions } = useDepthChart();

  return (
    <>
      <HighchartsReact
        allowChartUpdate={true}
        immutable={false}
        highcharts={Highcharts}
        options={depthChartOptions}
        ref={chartComponentRef}
      />
    </>
  );
};
