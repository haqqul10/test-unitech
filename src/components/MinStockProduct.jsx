import React, { useMemo, useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_simple.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MinStockProduct = ({ product }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const ref = useRef();

  const columns = [
    { title: "No", width: 50, formatter: "rownum", headerSort: false },
    { title: "Name", field: "name", width: 300, headerSort: false },
    {
      title: "Stock",
      field: "stock",
      width: 100,
      hozAlign: "left",
      headerSort: false,
    },
    {
      title: "Price",
      field: "price.text_idr",
      width: 150,
      hozAlign: "left",
      headerSort: false,
    },
    {
      title: "Product Url",
      field: "product_url",
      hozAlign: "left",
      headerSort: false,
    },
    {
      title: "Rating",
      field: "stats.averageRating",
      width: 170,
      hozAlign: "center",
      formatter: "star",
      headerSort: false,
    },
  ];

  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  const sortMinStockProduct = useMemo(
    () =>
      product.sort((a, b) => {
        if (a.stock > b.stock) return -1;
        if (a.stock < b.stock) return 1;
        return 0;
      }),
    [product]
  );

  const filterMinStockProduct = useMemo(
    () => sortMinStockProduct.slice(-10),
    [sortMinStockProduct]
  );
  const ReverseStock = useMemo(
    () => filterMinStockProduct.reverse(),
    [filterMinStockProduct]
  );

  const [chartData, setChartData] = useState({
    labels: ReverseStock.map((data) => data.name),
    datasets: [
      {
        label: "Stock product",
        data: ReverseStock.map((data) => data.stock),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div style={{ marginTop: "70px" }}>
      <h2 className="title">Daftar 10 product dengan stock terkecil</h2>
      <ul className="nav-tabs-section">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Table
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Chart
        </li>
      </ul>
      <div className="outlet">
        {activeTab === "tab1" ? (
          <ReactTabulator
            data={filterMinStockProduct}
            columns={columns}
            layout={"fitColumns"}
            onRef={(r) => (ref.current = r)}
            options={{
              pagination: false,
              paginationSize: 5,
              paginationSizeSelector: [10, 15, 20],
              height: "100%",
              width: "100%",
              responsiveLayout: "collapse",
            }}
          />
        ) : (
          <div className="chart-container">
            <Bar
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Chart Table Stock",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MinStockProduct;
