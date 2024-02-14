import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { SERVER_URL } from "./Constents/api";
function Cart() {
  const navigate = useNavigate("");
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const CustomerId = localStorage.getItem("CustomerID");

  useEffect(() => {
    if (token === "null") {
      alert("User not logged in");
      navigate("/shophub/login");
    } else {
      const value = JSON.stringify({ CustomerId: CustomerId });
      fetch(SERVER_URL + "user/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: value,
      }).then((res) => {
        res.json().then((data) => {
          setProducts(data.cart.products);
        });
      });
    }
  });

  return (
    <div>
      {products.length > 0 ? (
        products.map((data) => (
          <Card style={{ margin: "20px" }} key={data.Description}>
            <h1>{data.Title}</h1>
            <h2>{data.price}</h2>
            <img
              style={{ maxHeight: "8%", maxWidth: "10%" }}
              src={data.imageLink}
              alt="image"
            />
            <Button
              style={{ maxWidth: "10px", maxHeight: "45px" }}
              variant="outlined"
              onClick={() => {
                navigate("/shophub/error");
              }}
            >
              Buy now
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                const value = JSON.stringify({ CustomerId: CustomerId });
                fetch(BACKEND_URL + "user/deleteproduct/" + data.ProductID, {
                  method: "Post",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                  body: value,
                }).then((res) => {
                  if (res.status === 200) {
                    //working good
                  } else {
                    useEffect(() => {
                      navigate("/shophub/error/");
                    });
                  }
                });

                navigate("/shophub/cart");
              }}
            >
              Delete
            </Button>
          </Card>
        ))
      ) : (
        <div>No items in cart to display</div>
      )}
    </div>
  );
}

export default Cart;
