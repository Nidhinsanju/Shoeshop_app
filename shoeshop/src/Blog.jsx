import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import useFetchProduct from "./Hooks/usefetchproduct";

function Blog() {
  const navigate = useNavigate();
  const [product, setProducts] = useFetchProduct();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        rowGap: "10x px",
      }}
    >
      {product.map((data) => {
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
