/* eslint-disable */
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getAsinSalesRanksHistory } from '../../services'
import moment from 'moment'
import { getFormatNumber, getSalesRanks } from '../../utils/util'

const duration_max = 365;
const duration = 90;

const chartColors = ["#edea12", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#2196f3", "#00bcd4", "#4caf50", "#ffeb3b", "#ff9800", "#ff5722"];

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
    // size: 3,
    // colors: ["#ffffff"],
    // strokeColors: chartColors,
    // strokeWidth: 1,
    // fillOpacity: 1,
    // shape: "circle",
    // hover: {
    //   sizeOffset: 2,
    // },
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
    shared: false,
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "right",
    showForSingleSeries: true,
    formatter: function (seriesName, opts) {
      return "<span title='" + seriesName + "'>" + seriesName.substring(0, 10) + (seriesName.length > 10 ? "..." : "") + "</span>";
    },
    itemMargin: {
      vertical: 8
    }
  },
  yaxis: [{
    min: 0,
    tickAmount: 8,
    seriesName: "月間販売数",
    labels: {
      show: true,
      formatter: function (value) {
        return getFormatNumber(value, 0);
      },
    }
  }, {
    min: 0,
    tickAmount: 8,
    opposite: true,
    labels: {
      show: true,
      formatter: function (value) {
        return "#" + getFormatNumber(value, 0);
      },
    }
  }],
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


const _chartOptions = {
  ...commonChartOptions,
  chart: {
    ...commonChartOptions.chart,
    id: "rankings",
  },
}

const _simpleChartOptions = {
  ...commonChartOptions,
  chart: {
    ...commonChartOptions.chart,
    id: "rankings",
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



const RankingGraph = ({
  user,
  asin,
  data,
  height = 500,
  simple = false,
  setLoading = () => { }
}) => {

  const [rankingData, setRankingData] = useState(null);

  // ranking series
  const [rankingSeries, setRankingSeries] = useState([]);

  const [chartOptions, setChartOptions] = useState(simple ? _simpleChartOptions : _chartOptions);


  useEffect(() => {
    try {
      ApexCharts.exec('rankings', 'resetSeries', true, true);
    } catch (error) {
    };
console.log(asin);
    if (asin != null) {
      getDetails();
    }
    if (data?.length > 0) {
      const ret = getSalesRanks(data[0]);
      setRankingData(ret);
    }
  }, [asin, data]);


  useEffect(() => {
    if (!rankingData) return;

    const currentDate = moment();
    const startDate = currentDate.subtract(duration, "days").valueOf();

    let index = 0;
    for (; index < rankingData.salesdates.length; index++) {
      if (rankingData.salesdates[index] > startDate) {
        break;
      }
    }

    let _series_array = rankingData.salesranks.map((item, idx) => {
      return {
        "name": item["name"],
        "data": item["data"].slice(index),
        "color": chartColors[idx]
      };
    });

    let dates = rankingData.salesdates.slice(index);

    // set chart options and series
    setChartOptions((prevChartOptions) => {
      let newOptions = JSON.parse(JSON.stringify(prevChartOptions));
      newOptions.xaxis.categories = dates;
      return newOptions;
    });
    setRankingSeries(_series_array);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rankingData]);


  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getAsinSalesRanksHistory({ asin, user });
      if (result.data.length > 0) {
        const ret = getSalesRanks(result.data[0]);
        setRankingData(ret);
      } else {
        setRankingData(null);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <ReactApexChart
      options={chartOptions}
      series={rankingSeries}
      type="line"
      height={height}
    />
  );
};
export default RankingGraph;
