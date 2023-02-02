import Highcharts from "highcharts";

export const options: Highcharts.Options = {
  chart: {
    renderTo: "container",
    type: "area",
  },
  title: {
    text: "Market Depth",
  },
  xAxis: {
    minPadding: 40,
    maxPadding: 40,
    plotLines: [
      {
        color: "#888",
        value: 0.1523,
        width: 1,
        label: {
          text: "Actual price",
          rotation: 90,
        },
      },
    ],
    title: {
      text: "Price",
    },
  },
  yAxis: [
    {
      lineWidth: 1,
      gridLineWidth: 1,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: "inside",
      labels: {
        align: "left",
        x: 8,
      },
    },
    {
      opposite: true,
      linkedTo: 0,
      lineWidth: 1,
      gridLineWidth: 0,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: "inside",
      labels: {
        align: "right",
        x: -8,
      },
    },
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
    },
  },
  tooltip: {
    headerFormat:
      '<span style="font-size=10px;">Price: {point.key}</span><br/>',
    valueDecimals: 2,
  },
  series: [
    {
      name: "Bids",
      data: [],
      color: "#03a7a8",
      type: "area",
    } as Highcharts.SeriesAreaOptions,
    {
      name: "Asks",
      data: [],
      color: "#fc5857",
      type: "area",
    } as Highcharts.SeriesAreaOptions,
  ] as Highcharts.SeriesAreaOptions[],
};
