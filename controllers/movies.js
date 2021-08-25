const Movie = require("../models/movie");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const ForbiddenError = require("../errors/forbidden");
const { Status } = require("../utils/err-status");

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate("user")
    .then((m) => res.send({ data: m }))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  Movie.create({})
    .then((m) => res.send({ data: m }))
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("user")
    .then((m) => {
      if (!m) {
        throw new NotFoundError("Фильм с указанным _id не найден.");
      }
      if (String(m.owner) !== req.user._id) {
        throw new ForbiddenError("Запрещено удалять чужие фильмы.");
      }
    })
    .then(() =>
      Movie.deleteOne({ _id: movieId })
        .populate("user")
        .then(() =>
          res.status(Status.SUCCESS).send({ message: "Фильм удалён." })
        )
    )
    .catch((err) => {
      if (err.name === "CastError") {
        next(
          new BadRequestError("При удалении фильма передан некорректный _id.")
        );
      }
      next(err);
    });
};
