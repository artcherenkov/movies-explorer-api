const { celebrate, Joi } = require("celebrate");

module.exports.validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});
