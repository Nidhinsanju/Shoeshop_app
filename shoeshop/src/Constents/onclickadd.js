// GlobalFunction.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Declare the function globally
window.sharedFunction = (ID) => {
  const SERVER_URL = process.env.SERVER_URL;
  console.log(SERVER_URL);

  const navigate = useNavigate;
  const CustomerID = localStorage.getItem("CustomerID");
  const token = localStorage.getItem("token");
  try {
    fetch(SERVER_URL + "user/addproduct/" + ID, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        CustomerId: CustomerID,
      }),
    }).then((res) => {
      if (res.status === 200) {
        //   console.log("product added successfully to cart");
      } else {
        useEffect(() => {
          navigate("/shophub/error/");
        });
      }
    });
  } catch (error) {
    console.log("Internal server error", error);
  }
};

export default sharedFunction;
