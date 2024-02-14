import Appbar from "./Appbar";
import "./App.css";
import Cart from "./Cart";
import Dashboard from "./DashBoard";
import Login from "./Login";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import MyAccount from "./MyAccount";
import Blog from "./Blog";
import Shop from "./Shop";
import PageError from "./PageError";
import "../index.css";

function App() {
  return (
    <>
      <div>
        <RecoilRoot>
          <Router>
            <Appbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/shophub/login" element={<Login />}></Route>
              <Route path="/shophub/signup" element={<Signup />}></Route>
              <Route path="/shophub/cart" element={<Cart />}></Route>
              <Route path="/shophub/myaccount/" element={<MyAccount />}></Route>
              <Route path="/shophub/blog/" element={<Blog />}></Route>
              <Route path="/shophub/shop/" element={<Shop />}></Route>
              <Route path="/shophub/error" element={<PageError />}></Route>
            </Routes>
          </Router>
        </RecoilRoot>
      </div>
    </>
  );
}

export default App;
