import React from "react";
import Product from "../components/TableProduct";
import MaxStockProduct from "../components/MaxStockProduct";
import MinStockProduct from "../components/MinStockProduct";
import CardProduct from "../components/CardProduct";
import DataProduct from "../product.json";

const Home = () => {
  const product = DataProduct.data;
  return (
    <div style={{ marginBottom: "80px" }}>
      <Product product={product} />
      <CardProduct product={product} />
      <MaxStockProduct product={product} />
      <MinStockProduct product={product} />
    </div>
  );
};

export default Home;
