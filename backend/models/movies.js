const { Schema, model } = require("mongoose");
const MovieSchema = new Schema(
  {
    movie_name: {
      type: String,
      required: true,
    },
    movie_language: {
      type: String,
      required: true,
    },
    movie_genre: {
      type: String,
      required: true,
    },
    movie_poster: {
      type: [""],
      required: true,
    },
  },
  { timeStamp: true }
);

module.exports = model("movies", MovieSchema);
