const router = require("express").Router();
const { validateMovie, validateParameter } = require("../validation/movies");
const {
  getMovies,
  postMovie,
  deleteMovieById,
} = require("../controllers/movies");

// GET /movies
router.get("/", getMovies);

// POST /movies
router.post("/", validateMovie, postMovie);

// DELETE /movies/movieId
router.delete("/:movieId", validateParameter, deleteMovieById);

module.exports = router;
