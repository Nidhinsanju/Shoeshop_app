import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./Constents/api";

function Signup() {
  const navigate = useNavigate;
  const [email, setmail] = useState("");
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
        <Typography>welcome to Shoeshop,Sign-up to continue</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center " }}>
        <Card variant="outlined" style={{ width: "400px", padding: "20px" }}>
          <TextField
            onChange={(e) => {
              setmail(e.target.value);
            }}
            size="medium"
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
            label="Password"
            variant="outlined"
            fullWidth={true}
            type={"password"}
          />
          <br />
          <br />
          <Button
            variant="outlined"
            onClick={async () => {
              try {
                if (!email || !password) {
                  alert("No Username or Password Found ");
                } else {
                  const response = await axios.post(
                    SERVER_URL + "user/signup",
                    {
                      username: email,
                      password: password,
                    }
                  );
                  if (response.status === 200) {
                    alert("Signed in Successfully");
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("CustomerID", data.CustomerId);
                    window.location = "/";
                    navigate("/");
                  }
                }
              } catch (error) {
                if (error.response.status === 403) {
                  alert("User already existss");
                  return <div>Unexpected Server Error!!</div>;
                } else {
                  alert("Internal Server Error");
                }
              }
            }}
          >
            SignUp
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
