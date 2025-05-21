const express = require("express")
const router = express.Router({mergeParams: true});    // mergeparams ture gave the access of the id in /listings/:id/reviews(parent route) goes to review.js roues(child routes which are /,/review/:id) too.
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")

// Reviews (no need to create seperate show and index route for it coz we will not see it seperately by searching it. we will see it on the listing only)
// Post rev route

router.post(
    "/" ,
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));

//delete rev route

router.delete(
    "/:reviewId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports = router;