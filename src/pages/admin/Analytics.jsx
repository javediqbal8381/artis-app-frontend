import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { analyticsApi } from '../../redux/api/analyticsApi';

const Analytics = () => {
  // Fetching orders data
  const { data: ordersData, isLoading: ordersLoading, error: ordersError } = analyticsApi.useGetOrdersAnalyticsQuery();

  // Fetching products data
  const { data: productsData, isLoading: productsLoading, error: productsError } = analyticsApi.useGetProductsAnalyticsQuery();

  if (ordersLoading || productsLoading || !ordersData || !productsData) {
    return <p>Loading...</p>;
  }

  if (ordersError || productsError) {
    return <p>Error: {ordersError || productsError}</p>;
  }

  // Format data for the line chart
  const lineChartData = {
    success: true,
    data: ordersData.data.map(entry => ({ date: entry.date, totalPrice: entry.totalPrice }))
  };

  const lineChartSeries = [{
    name: 'Total Price',
    data: lineChartData.data.map(entry => entry.totalPrice)
  }];

  const lineChartOptions = {
    chart: {
      type: 'line',
      height: 350
    },
    xaxis: {
      categories: lineChartData.data.map(entry => entry.date)
    }
  };

  // Format data for the pie chart
  const pieChartData = {
    success: true,
    data: productsData.data.map(entry => ({ _id: entry._id, count: entry.count }))
  };

  const pieChartSeries = pieChartData.data.map(entry => entry.count);
  const pieChartLabels = pieChartData.data.map(entry => entry._id);

  const pieChartOptions = {
    chart: {
      type: 'pie',
      height: 350
    },
    labels: pieChartLabels
  };

  return (
    <div>
      {/* Line Chart */}
      <div>
        <h2>Line Chart</h2>
        <ReactApexChart options={lineChartOptions} series={lineChartSeries} type="line" width={"96%"} height={350} />
      </div>

      {/* Pie Chart */}
      <div>
        <h2>Pie Chart</h2>
        <ReactApexChart options={pieChartOptions} series={pieChartSeries} type="pie" width={"96%"} height={350} />
      </div>
    </div>
  );
}

export default Analytics;
