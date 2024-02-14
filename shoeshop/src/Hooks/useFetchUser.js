import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../Constents/api";
export default function useFetchUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const CustomerID = localStorage.getItem("CustomerID");
        const value = { CustomerId: CustomerID };

        if (!token) {
          console.log(token);
        } else {
          const res = await axios.post(
            SERVER_URL + "user/me",
            JSON.stringify(value),
            {
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            }
          );
          if (res.status === 200) {
            const newData = res.data.user;
            setUser(newData);
          } else {
            navigate("/login/");
            console.log(res.status);
          }
        }
      } catch (error) {
        navigate("/shophub/error");
        console.log(error);
      }
    };
    fetchUser();
  }, [navigate]);

  return [user, setUser];
}
