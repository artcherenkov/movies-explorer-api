const router = require("express").Router();

const {
  getMovies,
  postMovie,
  deleteMovieById,
} = require("../controllers/movies");

// GET /movies
router.get("/", getMovies);

// POST /movies
router.post("/", postMovie);

// DELETE /movies/movieId
router.delete("/:movieId", deleteMovieById);

module.exports = router;
