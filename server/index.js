const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./Routes/admin");
const userRouter = require("./Routes/user");
dotenv.config();
const app = express();
const DATABASE_URL1 = process.env.dataBaseUrl;
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(DATABASE_URL1, {
  dbName: "shoeShopDB",
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
