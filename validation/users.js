const { celebrate, Joi } = require("celebrate");

module.exports.validateProfileData = celebrate({
  body: Joi.object()
    .min(1)
    .keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
});
