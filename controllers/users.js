const User = require('../models/user');

const BadRequestError = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');

const handleUpdateProfileError = (res, next) => (err) => {
  switch (err.name) {
    case 'ValidationError': {
      next(
        new BadRequestError(
          'При обновлении профиля переданы некорректные данные.',
        ),
      );
      break;
    }
    case 'CastError': {
      next(
        new BadRequestError('При обновления профиля передан некорректный _id.'),
      );
      break;
    }
    case 'MongoError': {
      if (err.code === 11000) {
        next(
          new ConflictError('Пользователь с таким email уже зарегистрирован.'),
        );
      }
      break;
    }

    default:
      next(err);
  }
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((u) => {
      if (!u) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.send({ data: u });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'При получении данных о пользователе передан некорректный _id',
          ),
        );
      }
      next(err);
    });
};
module.exports.patchUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((profile) => {
      if (!profile) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.send({ data: profile });
    })
    .catch(handleUpdateProfileError(res, next));
};
