const express = require("express");
const { DBCONNECTION } = require("./config/db");
const { success, error, info } = require("consola");
const { PORT, NODE_ENV } = require("./config");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const AuthRoutes = require("./routes/auth");
const colors = require("colors");
const MovieRouter = require("./routes/movieRoute");
const app = express();

let startServer = () => {
  /*database connection start      here */
  DBCONNECTION();
  /*database connection end here*/

  /*middleware starts here*/
  if (NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use(express.static(path.join(__dirname,"public")))
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  /*middleware ends here*/

  /*listen port*/

  /*Load all routes*/
  app.use("/api/auth", AuthRoutes);
  app.use("/movie", MovieRouter);

  app.listen(PORT, err => {
    if (err) throw err;
    info(`server is running on port number ${PORT}`.red.bold);
  });

  /*listen port end here*/
};

startServer();
