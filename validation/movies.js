const { celebrate, Joi } = require('celebrate');
const { isUrl } = require('../utils/validation');

const movieSchema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl, 'link'),
    trailer: Joi.string().required().custom(isUrl, 'link'),
    thumbnail: Joi.string().required().custom(isUrl, 'link'),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.validateMovie = celebrate(movieSchema);
module.exports.validateParameter = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
