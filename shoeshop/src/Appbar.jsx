import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { pages } from "./Constents/naviitems";

function Appbar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "grey",
        justifyContent: "space-between",
        alignContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "grey",
          alignItems: "center",
        }}
      >
        <div style={{ paddingLeft: "10px" }}>
          <button
            style={{ borderRadius: "50%", marginRight: "15px" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{
                maxWidth: "20px",
                maxHeight: "20px",
                borderRadius: "50%",
              }}
              src="https://www.svgrepo.com/show/524957/shop.svg"
              alt="image"
            />
          </button>
        </div>
        <div>
          <button
            style={{
              borderRadius: "50%",
              marginRight: "15px",
            }}
            onClick={() => {
              navigate("/shophub/cart");
            }}
          >
            <img
              style={{ maxWidth: "20px", maxHeight: "20px" }}
              src="https://cdn-icons-png.flaticon.com/512/1174/1174408.png"
              alt="image"
            />
          </button>
        </div>
      </div>
      <div>
        <ul style={{ display: "flex" }}>
          {pages.map((data) => (
            <li style={{ display: "flex" }} key={data.link}>
              <a
                style={{
                  padding: "10px",
                  marginRight: "60px",
                  textDecoration: "none",
                }}
                href={data.link}
              >
                {data.title}
              </a>
            </li>
          ))}
        </ul>
        <Check />
      </div>
    </div>
  );

  function Check() {
    const token = localStorage.getItem("token");
    if (token != "null") {
      return (
        <div className="flex flex-wrap">
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              localStorage.setItem("CustomerID", null);
              navigate("/shophub/Login");
            }}
          >
            Logout
          </Button>
        </div>
      );
    }
  }
}

export default Appbar;
