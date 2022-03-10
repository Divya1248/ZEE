const { Router } = require("express");
const multer = require("multer");
const MovieSchema = require("../models/movies");
const router = Router();

let { storage } = require("../middlewares/multer");
let upload = multer({ storage: storage });
router.post("/movieData", upload.single("file"), async (req, res) => {
  console.log(req.body);
  try {
    let movie_poster = req.file;
    let { movie_name, movie_language, movie_genre } = req.body;
    let payload = {
      movie_poster,
      movie_name,
      movie_language,
      movie_genre,
    };
    console.log(payload);
    let Movies = await MovieSchema.create(payload);
    res.status(201).json({ message: "successfully stored", Movies });
  } catch (err) {
    res.status(501).json({ message: "server error" });
  }
});

module.exports = router;
