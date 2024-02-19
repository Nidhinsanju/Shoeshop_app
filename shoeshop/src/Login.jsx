import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import { SERVER_URL } from "./Constents/api";
import axios from "axios";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div>
      <div
        style={{
          paddingTop: "250px",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography>Welcome Back Log-in</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center " }}>
        <Card variant="outlined" style={{ width: "400px", padding: "20px" }}>
          <TextField
            onChange={(e) => {
              setusername(e.target.value);
            }}
            size="medium"
            id="outlined-basic1"
            label="Username"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            id="outlined-basic2"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                if (!username || !password) {
                  alert("No Username or Password Found ");
                } else {
                  const response = await axios.post(SERVER_URL + "user/login", {
                    username: username,
                    password: password,
                  });
                  const data = response.data;
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("CustomerID", data.CustomerID);
                  window.location = "/";
                }
                //logged in successfully
              } catch (error) {
                if (error.request) {
                  // The request was made but no response was received
                  console.log(error.request);
                  alert("error");
                  console.log(error);
                  return <div>Unexpected Server Error</div>;
                }
              }
            }}
          >
            Log In
          </Button>
          <div>
            <div className="flex flex-wrap text-blue-700 pt-3">
              New User..?
              <a
                href="/shophub/Signup"
                className="underline pl-2 hover:text-yellow-700"
              >
                Signup
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Login;
