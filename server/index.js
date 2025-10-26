const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

//mongoDB Connection====
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log(`DB Connection Successfull`))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());

//Server Initialization====
const port = process.env.PORT || 4000;
app.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});
