import moment from "moment";
import React from "react";
import ReactApexChart from "react-apexcharts";
import ja from "apexcharts/dist/locales/ja.json";

const StockLineChart = ({ data, name, duration }) => {
  const series = [{
    name: '在庫',
    data: data.map(item => item['stock'])
  }];

  const today = new Date();
  const startDay = new Date(today);
  startDay.setDate(today.getDate() - duration);
  let xmin = startDay.getTime();
  let xmax = today.getTime();
  // let stepSize = (xmax - xmin) / 10;

  let ymin = 0;
  let ymax = 1;
  for (let i = 0; i < data.length; i++) {
    if (ymax < data[i]['stock']) {
      ymax = data[i]['stock'];
    }
    if (ymin > data[i]['stock']) {
      ymin = data[i]['stock'];
    }
  }
  ymax += 2;
  ymin = Math.max(0, ymin - 2);

  const options = {
    chart: {
      locales: [ja],
      defaultLocale: 'ja',
      type: 'line',
      height: 200,
      toolbar: {
        show: false,
      }
    },
    stroke: {
      curve: 'stepline',
      width: 1,
    },
    dataLabels: {
      enabled: false
    },
    title: {
      text: name,
      align: 'left'
    },
    markers: {
      size: ((data.length > 1) ? 0: 2),
      hover: {
        sizeOffset: 4
      }
    },
    grid: {
      show: false
    },
    xaxis: {
      type: 'datetime',
      categories: data.map(item => item['date']),
      labels: {
        formatter: function(value, timestamp) {
          return moment(timestamp).format("M月 D日");
        },
        rotateAlways: true,
      },
      min: xmin,
      max: xmax,
      // stepSize: stepSize,
      tickAmount: 6,
    },
    yaxis: {
      forceNiceScale: true,
      min: ymin,
      max: ymax,
      // title: {
      //   text: 'stock'
      // },
    },
  };

  return <ReactApexChart options={options} series={series} type="line" height={200} />;
}

export default StockLineChart;
