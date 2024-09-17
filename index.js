const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
var morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { notFound, errorHandler } = require("./middlewares/errorHandler");
const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/dbConnect");
const routers = require("./routes");

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

routers(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});

morgan("tiny");
