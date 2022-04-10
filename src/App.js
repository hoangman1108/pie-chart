import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import API from 'configs/API';
import { axiosPost } from './utils/axios';
import { setAxiosDefaultAuthToken } from './utils/utils';
const App = () => {
  setAxiosDefaultAuthToken('')
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const optionsPieChart = {
    // option
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    // option
    title: {
      text: 'Pie Chart Example',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    // Enter data here
    series: [
      {
        // So sánh dựa trên tiêu chuẩn nào
        name: 'Brands',
        colorByPoint: true,
        // số liệu tại đây
        data: [
          {
            name: 'Chrome',
            y: 61.41,
            sliced: true,
            selected: true,
          },
          {
            name: 'Internet Explorer',
            y: 11.84,
          },
          {
            name: 'Firefox',
            y: 10.85,
          },
          {
            name: 'Edge',
            y: 4.67,
          },
          {
            name: 'Safari',
            y: 4.18,
          },
          {
            name: 'Sogou Explorer',
            y: 1.64,
          },
          {
            name: 'Opera',
            y: 1.6,
          },
          {
            name: 'QQ',
            y: 1.2,
          },
          {
            name: 'Other',
            y: 2.61,
          },
        ],
      },
    ],
  };

  class fruitCollection extends Array {
    sum(key) {
      return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
  }
  React.useEffect(() => {
    axiosData();
  }, []);
  const axiosData = async () => {

    const { success, data } = await axiosPost('http://localhost:4000/v1/dataset/sample', {
      tableName: "products",
      fields: ["productLine", "buyPrice"],
      datasetId: "62471ff2c75da6094c669937",
    });

    if (success) {
      const objData = {};
      data.forEach((e) => {
        if (!objData[e[Object.keys(e)[0]]]) {
          objData[e[Object.keys(e)[0]]] = e[Object.keys(e)[1]];
        } else {
          objData[e[Object.keys(e)[0]]] += e[Object.keys(e)[1]];
        }
      })
      const dataSeries = Object.keys(objData).map((value) => {
        return {
          name: value,
          y: objData[value]
        }
      })
      setData({
        // option
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
        },
        // option
        title: {
          text: 'Pie Chart Example',
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        series: [
          {
            name: 'Brands',
            colorByPoint: true,
            data: dataSeries,
          },
        ],
      });
      setIsLoading(true);
    }
  }
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={data} />
    </>
  );
};
export default App;
