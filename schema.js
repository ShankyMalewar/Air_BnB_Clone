const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.array().items(
      Joi.string().valid(
        "Trending",
        "Cottage",
        "Iconic Cities",
        "Mountains",
        "Castles",
        "Pools",
        "Camping",
        "Farms",
        "Arctic",
        "Forests",
        "Beaches"
      )
    ).required(),
    image: Joi.string().allow("", null)
  }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})