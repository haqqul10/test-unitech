import React, { useRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "react-tabulator/css/tabulator_simple.min.css";
import { BsSearch } from "react-icons/bs";
import Form from "react-bootstrap/Form";

const TableProduct = ({ product }) => {
  const [searchInput, setSearchInput] = useState("");

  const ref = useRef();

  const columns = [
    {
      title: "No",
      width: 50,
      formatter: "rownum",
      headerSort: false,
      resizable: false,
    },
    {
      title: "Name",
      field: "name",
      width: 300,
      headerSort: false,
      resizable: false,
    },
    {
      title: "Stock",
      field: "stock",
      width: 100,
      hozAlign: "left",
      headerSort: false,
      resizable: false,
    },
    {
      title: "Price",
      field: "price.text_idr",
      hozAlign: "left",
      width: 120,
      headerSort: false,
      resizable: false,
    },
    {
      title: "Product Url",
      field: "product_url",
      width: 200,
      hozAlign: "left",
      headerSort: false,
      resizable: false,
    },
    {
      title: "Image",
      field: "primary_image.thumbnail",
      width: 250,
      hozAlign: "center",
      headerSort: false,
      resizable: false,
      formatter: "image",
    },
    {
      title: "Rating",
      field: "stats.averageRating",
      widthGrow: 1,
      hozAlign: "center",
      formatter: "star",
      headerSort: false,
      resizable: false,
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    ref.current.setFilter("name", "like", e.target.value);
  };

  return (
    <div>
      <h2 className="title mt-4">Daftar Table Product</h2>
      <div className="search mt-3">
        <div className="search-section">
          <Form.Control
            type="text"
            id="search"
            placeholder="Search table..."
            onChange={handleChange}
            value={searchInput}
          />
          <BsSearch className="search-icon" />
        </div>
      </div>
      <ReactTabulator
        data={product}
        columns={columns}
        layout={"fitColumns"}
        onRef={(r) => (ref.current = r.current)}
        options={{
          pagination: true,
          paginationSize: 5,
          paginationSizeSelector: [10, 15, 20],
          height: "100%",
          width: "100%",
          responsiveLayout: "collapse",
        }}
      />
    </div>
  );
};

export default TableProduct;
