import Card from "@mui/material/Card";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import useFetchProduct from "./Hooks/usefetchproduct";
import LoadingStyle from "./loading";
import { useEffect, useState } from "react";

function Blog() {
  const navigate = useNavigate();
  const [product, setProducts] = useFetchProduct();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setProducts();
  }, []);
  if (loading) {
    return (
      <div>
        <LoadingStyle />
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        rowGap: "10x px",
      }}
    >
      {product?.map((data) => {
        return (
          <Card style={{ margin: "70px" }} key={data.Description}>
            <button
              style={{
                maxHeight: "50px",
                maxWidth: "60px",
                borderRadius: "20px",
                marginLeft: "8px",
              }}
              onClick={() => {
                navigate("/shophub/shop/");
              }}
            >
              <img
                style={{ maxHeight: "20px" }}
                src="https://www.svgrepo.com/show/470814/expand.svg"
                alt="shoping bag"
              />
            </button>
            <div>
              <h3
                style={{
                  fontFamily: "cursive",
                }}
              >
                {data.Title}
              </h3>
              <h4
                style={{
                  fontFamily: "initial",
                  display: "flex",
                  flex: "wrap",
                }}
              >
                {data.Description}
              </h4>
              <img
                style={{
                  width: "220px",
                  height: "225px",
                  maxheight: "250px",
                  maxwidth: "300px",
                }}
                src={data.imageLink}
                alt="image"
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default Blog;
