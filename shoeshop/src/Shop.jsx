import Card from "@mui/material/Card";
import useFetchProduct from "./Hooks/usefetchproduct";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import LoadingStyle from "./loading";

function Shop() {
  const [product, setProducts] = useFetchProduct();
  const [ID, setID] = useState();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (product != undefined) {
      setID(product?.[0]?.ProductID);
    }
  }, [product]);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setProducts();
  }, []);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div>
        <LoadingStyle />
      </div>
    );
  }
  return (
    <div>
      <Card style={{ backgroundColor: "white" }}>
        <h2
          style={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            fontFamily: "fantasy",
          }}
        >
          Product Details
        </h2>
        <br />
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {ID && (
            <img
              src={
                ID
                  ? product?.filter((p) => p.ProductID === ID)[0].imageLink
                  : null
              }
              alt="product Image"
              style={{
                height: "20px",
                width: "auto",
                maxwidth: "250px",
                display: "flex",
                minHeight: "250px",
                margin: "50px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            />
          )}
          <h1
            style={{
              color: "black",
              fontFamily: "fantasy",
              size: "10px",
              fontSize: "25px",
            }}
          >
            {ID ? product?.filter((p) => p.ProductID === ID)[0].Title : null}
          </h1>
          <Button
            variant="contained"
            size="medium"
            style={{
              padding: "13px",
              maxHeight: "15px",
              maxWidth: "auto",
            }}
            type="disabled"
            onClick={() => {
              ID
                ? product?.filter((p) => p.ProductID === ID)[0].ProductID
                : null;
              setID(product.ProductID);
              window.sharedFunction(ID);
              navigate("/shophub/cart/");
            }}
          >
            Add to cart
          </Button>
        </div>

        <div
          className=" hover:shadow-red-400	"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {product?.map((data) => {
            return (
              <div key={data.ProductID}>
                <button
                  onClick={() => {
                    setID(data.ProductID);
                  }}
                >
                  <Card
                    style={{
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    <img
                      style={{
                        justifyItems: "center",
                        width: "100px",
                        height: "120px",
                        maxheight: "150px",
                        maxwidth: "200px",
                      }}
                      src={data.imageLink}
                      alt="image"
                    />
                  </Card>
                </button>
              </div>
            );
          })}
        </div>
      </Card>
      <RelatedProducts product={product} />
    </div>
  );

  function RelatedProducts(props) {
    const products = props.product;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          backgroundColor: "white",
          border: "2px solid red",
        }}
      >
        {products?.map((data) => {
          return (
            <Card
              style={{
                padding: "10px",
                margin: "10px",
              }}
              key={data.ProductID}
            >
              <button
                style={{
                  maxHeight: "50px",
                  maxWidth: "60px",
                  borderRadius: "20px",
                  marginLeft: "10px",
                  marginRight: "85px",
                }}
                onClick={() => {
                  const orderID = Math.floor(Math.random() * 10000);
                  setID(data.ProductID);
                  alert("Order Number: " + orderID);
                }}
              >
                <img
                  src="https://www.svgrepo.com/show/470814/expand.svg"
                  style={{ maxHeight: "20px" }}
                />
              </button>
              <img
                style={{
                  width: "100px",
                  height: "120px",
                  maxheight: "150px",
                  maxwidth: "200px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                src={data.imageLink}
                alt="image"
              />

              <h3
                style={{
                  fontFamily: "cursive",
                  fontSize: "20px",
                }}
              >
                {data.Title}
              </h3>
              <h6
                style={{
                  fontFamily: "serif",
                  fontStyle: "normal",
                }}
              >
                {data.Description}
              </h6>
            </Card>
          );
        })}
      </div>
    );
  }
}
export default Shop;
