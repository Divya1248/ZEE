const { connect } = require("mongoose");
const { success, error, info } = require("consola");
const { MONGODB_URL_LOCAL, MONGODB_URL_CLOUD, NODE_ENV } = require("./index");
const { bgMagenta } = require("colors");

exports.DBCONNECTION = async () => {
  try {
    if (NODE_ENV === "development") {
      await connect(MONGODB_URL_LOCAL);
      success(`Local Mongodb Database connected ${NODE_ENV} mode`.bgMagenta.bold);
    } else {
      await connect(MONGODB_URL_CLOUD);
      success("Cloud Mongodb Database connected");
    }
  } catch (err) {
    error(err);
  }
};
