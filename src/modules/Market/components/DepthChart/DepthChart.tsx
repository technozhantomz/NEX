import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useDepthChart } from "./hooks/useDepthChart";

export const DepthChart = (): JSX.Element => {
  const { depthChartOptions } = useDepthChart();

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={depthChartOptions} />
    </>
  );
};
