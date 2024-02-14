import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchUser from "./Hooks/useFetchUser";
import { SERVER_URL } from "./Constents/api";
function MyAccount() {
  // dotenv.config();
  const navigate = useNavigate("");
  const [currentpassword, setcurrentpassword] = useState("");
  const [changedPassword, setChangedPassword] = useState("");
  const [conform, setConform] = useState("");
  const [user, setUser] = useFetchUser("");
  const token = localStorage.getItem("token");
  if (token !== "null") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15%",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: "400px",
            padding: "20px",
          }}
        >
          <TextField
            disabled
            id="outlined-disabled"
            style={{
              width: "355px",
            }}
            value={user ? user.username : ""}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setcurrentpassword(e.target.value);
            }}
            id="outlined-basic1"
            label="Current Password"
            type="password"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setChangedPassword(e.target.value);
            }}
            id="outlined-basic2"
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setConform(e.target.value);
            }}
            id="outlined-basic3"
            label="Conform Password"
            type="password"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              if (changedPassword === conform) {
                const response = await axios.post(SERVER_URL + "user/me", {
                  customerID: customerID,
                  currentPassword: currentpassword,
                  updatePassword: conform,
                });
                const data = response.data;
                localStorage.setItem("token", data.token);
                window.location = "/";
              } else {
                alert("Password Mismatch");
              }
            }}
          >
            Update Password
          </Button>
        </Card>
      </div>
    );
  } else {
    useEffect(() => {
      alert("Login to see Account details");
      navigate("/shophub/login/");
    });
  }
}
export default MyAccount;
