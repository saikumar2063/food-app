const express = require("express");
let cors = require("cors");

const app = express();
const port = 4000;
const mongoDB = require("./db");
mongoDB();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://foodmunchapp.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-with,Content-Type,Accept"
  );
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
