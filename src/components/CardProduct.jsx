import React, { useMemo, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillStar, AiOutlineUnorderedList } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";

const CardProduct = ({ product }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(6);
  const filterProduct = product.slice(0, index);

  // console.log(filteredData);

  const loadMore = () => {
    setIndex(index + 6);
    // console.log(index);
    if (index >= product.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  // const filterProduct = useMemo(() => product.slice(0, 10), [product]);
  return (
    <div className="mt-5">
      <h2 className="title">Product Card</h2>
      <Container className="container-card">
        <div className="list-box">
          <div
            className={activeTab === "tab1" ? "active" : ""}
            onClick={handleTab1}
          >
            <AiOutlineUnorderedList className="list-box-icon" />
          </div>
          <div
            className={activeTab === "tab2" ? "active" : ""}
            onClick={handleTab2}
          >
            <BsGrid className="list-box-icon" />
          </div>
        </div>
        <div className="outlet">
          {activeTab === "tab1" ? (
            <>
              <Row xs={1} md={1} lg={2}>
                {filterProduct.map((item) => (
                  <Col key={item.product_id}>
                    <Card className="card-list">
                      <Card.Img
                        // variant="top"
                        src={item.primary_image.thumbnail}
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <div>
                          <Card.Text>{item.price.text_idr}</Card.Text>
                          <div className="card-rate">
                            <AiFillStar className="card-icon-rate" />
                            <Card.Text className="card-stats">
                              {item.stats.averageRating === ""
                                ? "0"
                                : item.stats.averageRating}
                            </Card.Text>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {isCompleted ? (
                <div></div>
              ) : (
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-loadMore"
                >
                  Load More...
                </button>
              )}
            </>
          ) : (
            <>
              <Row xs={1} md={2} lg={4}>
                {filterProduct.map((item) => (
                  <Col key={item.product_id}>
                    <Card className="card-box">
                      <Card.Img
                        variant="letf"
                        src={item.primary_image.thumbnail}
                      />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <div>
                          <Card.Text>{item.price.text_idr}</Card.Text>
                          <div className="card-rate">
                            <AiFillStar className="card-icon-rate" />
                            <Card.Text className="card-stats">
                              {item.stats.averageRating === ""
                                ? "0"
                                : item.stats.averageRating}
                            </Card.Text>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {isCompleted ? (
                <div></div>
              ) : (
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-loadMore"
                >
                  Load More...
                </button>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CardProduct;
