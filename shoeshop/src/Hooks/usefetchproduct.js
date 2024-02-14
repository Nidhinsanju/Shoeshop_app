import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../Constents/api";
export default function useFetchProduct() {
  const navigate = useNavigate;
  const [product, setProducts] = useState([]);
  useEffect(() => {
    try {
      fetch(SERVER_URL + "user/products", {
        method: "Get",
      }).then((res) => {
        res.json().then((data) => {
          setProducts(data.products);
        });
      });
    } catch (error) {
      useEffect(() => {
        alert("Failed to fetch");
        navigate("/shophub/error");
        console.log(error);
      });
    }
  }, []);

  return [product, setProducts];
}
