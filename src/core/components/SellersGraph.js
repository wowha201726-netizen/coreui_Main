/* eslint-disable */
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getProductDetails } from "../../services";
import moment from "moment";
import { getOffersForTable, getStocksForTable1 } from "../../utils/util";

const duration_max = 365;
const duration = 90;

const chartColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#2196f3", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800", "#ff5722"];

const commonChartOptions = {
  chart: {
    type: "line",
    dropShadow: {
      enabled: true,
    },
    toolbar: false
  },
  stroke: {
    show: true,
    curve: "straight",
    lineCap: "square",
    width: 2,
  },
  grid: {
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: true,
      },
    },
  },
  markers: {
    size: 3,
    colors: ["#ffffff"],
    strokeColors: chartColors,
    strokeWidth: 1,
    fillOpacity: 1,
    shape: "circle",
    hover: {
      sizeOffset: 2,
    },
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
    y: {
      formatter: function (value, { seriesIndex, dataPointIndex, w }) {
        let price = w.config.priceInfos?.[seriesIndex][dataPointIndex];
        return `has stock ${value}, price : $${price || 0}`;
      },
    },
    shared: false,
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "left",
    formatter: function (seriesName, opts) {
      return "<span title='" + seriesName + "'>" + seriesName.substring(0, 10) + (seriesName.length > 10 ? "..." : "") + "</span>";
    },
    itemMargin: {
      vertical: 8
    }
  },
  yaxis: {
    min: 0,
    tickAmount: 8,
    labels: {
      show: true
    }
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      formatter: function (value, timestamp) {
        return moment(timestamp).format("YY/MM/DD");
      },
    },
  },
}

const _stockChartOptions = {
  ...commonChartOptions,
  chart: {
    ...commonChartOptions.chart,
    id: "stocks",
  }
}

const _simpleStockChartOptions = {
  ...commonChartOptions,
  chart: {
    ...commonChartOptions.chart,
    id: "stocks",
    dropShadow: {
      enabled: false,
    },
  },
  stroke: {
    show: true,
    curve: "straight",
    lineCap: "square",
    width: 1,
  },
  legend: {
    show: false,
    position: "left",
  },
  markers: {

  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: false
    }
  },
  yaxis: {
    min: 0,
    tickAmount: 8,
    labels: {
      show: false,
    }
  },
  grid: {
    yaxis: {
      lines: {
        show: false,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  }
}


const SellersGraph = ({
  user,
  asin,
  data,
  height = 500,
  simple = false,
  setLoading = () => { }
}) => {

  // price chart
  const [series, setSeries] = useState([]);

  // stock chart
  const [stockSeries, setStockSeries] = useState([]);
  const [displayStockSeries, setDisplayStockSeries] = useState([]);

  const [stockChartOptions, setStockChartOptions] = useState(simple ? _simpleStockChartOptions : _stockChartOptions);


  useEffect(() => {
    try {
      ApexCharts.exec('stocks', 'resetSeries', true, true);
    } catch (error) {
    };
    if (asin != null) {
      productDetails();
    }
    if (data?.length > 0) {
      loadSeries(data);
    }
  }, [asin, data]);


  useEffect(() => {
    let _series_array = stockSeries.map((stock) => {
      return {
        "name": stock["name"],
        "data": stock["data"].slice(
          duration_max - duration,
          duration_max
        ),
        "is_live": stock["is_live"],
        "isfba": stock["isfba"],
      };
    });

    _series_array = _series_array.filter(item => item.is_live);
    _series_array = _series_array.filter(item => item.isfba);


    // filter empty data
    _series_array = _series_array.filter(item => {
      for (let i = 0; i < item["data"].length; i++) {
        if (item["data"][i] > 0) {
          return true;
        }
      }
      return false;
    });

    // limit count
    _series_array = _series_array.slice(0, 20);

    // calculate chart xvalues
    const currentDate = moment();
    let dates = [];
    let datesInDay = [];
    for (let i = 0; i < duration; i++) {
      const date = currentDate.clone().subtract(duration - i, "days");
      const formattedDate = date.format("DD MMM YYYY");
      dates.push(formattedDate);
      datesInDay.push(duration_max - duration + i);
    }

    // eliminate continuous values 
    let indexes = [];
    for (let i = 1; i < duration - 1; i++) {
      let isSameValue = true;
      for (let s = 0; s < _series_array.length; s++) {
        if (_series_array[s].data[i] != _series_array[s].data[i - 1]) {
          isSameValue = false;
          break;
        }
      }
      if (isSameValue) {
        indexes.push(i);
      }
    }
    let length = indexes.length;
    for (let i = 0; i < length; i++) {
      let idx = indexes[length - i - 1];
      dates.splice(idx, 1);
      datesInDay.splice(idx, 1);
      for (let s = 0; s < _series_array.length; s++) {
        _series_array[s].data.splice(idx, 1);
      }
    }


    // get corresponding price values
    let priceInfos = [];
    for (let s = 0; s < _series_array.length; s++) {
      let saleItem = series?.find(item => item["name"] == _series_array[s]["name"]);

      let priceSeries = [];
      for (let i = 0; i < datesInDay.length; i++) {
        priceSeries.push(saleItem["data"][datesInDay[i]]);
      }
      priceInfos.push(priceSeries);

      _series_array[s]["color"] = chartColors[s];
    }


    // set chart options and series
    setStockChartOptions((prevChartOptions) => {
      let newOptions = JSON.parse(JSON.stringify(prevChartOptions));
      newOptions.priceInfos = priceInfos;
      newOptions.xaxis.categories = dates;
      return newOptions;
    });
    setDisplayStockSeries(_series_array);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockSeries]);

  const loadSeries = (seriesData) => {
    if (seriesData.length > 0) {
      const temp_series = [];
      const temp_stock_series = [];
      for (let i = 0; i < seriesData.length; i++) {
        const series_record = {};
        const stock_series_record = {};
        if (seriesData[i]["sellername"]) {
          series_record["name"] = seriesData[i]["sellername"];
          stock_series_record["name"] = seriesData[i]["sellername"];
        } else {
          series_record["name"] = seriesData[i]["sellerid"];
          stock_series_record["name"] = seriesData[i]["sellerid"];
        }
        series_record["is_live"] = seriesData[i]["is_live"] == 1;
        series_record["isfba"] = seriesData[i]["isfba"] == 'true';
        stock_series_record["is_live"] = series_record["is_live"];
        stock_series_record["isfba"] = series_record["isfba"];

        const seriesArray = getOffersForTable(seriesData[i]["offercsv"]);
        series_record["data"] = seriesArray;
        temp_series.push(series_record);

        const stocksArray = getStocksForTable1(seriesData[i]["stockcsv"]);
        stock_series_record["data"] = stocksArray;
        temp_stock_series.push(stock_series_record);
      }

      setSeries(temp_series);
      setStockSeries(temp_stock_series);
    } else {
      setSeries([]);
      setStockSeries([]);
    }
  }

  const productDetails = async () => {
    try {
      setLoading(true);
      const result = await getProductDetails({ asin, user });
      loadSeries(result.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  return (
    <ReactApexChart
      options={stockChartOptions}
      series={displayStockSeries}
      type="line"
      height={height}
    />
  );
};
export default SellersGraph;
