const express = require("express")
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );

router.get("/search", wrapAsync(listingController.searchListings));


//new route
router.get("/new", isLoggedIn, listingController.renderNewForm)

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));


router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;


//index route(waaha"/listings" define kr diya isliye yaha se hata raha hu /listings sab mein)
// router.get("/", wrapAsync(listingController.index))

//show route
// router.get("/:id", wrapAsync(listingController.showListing));

//create route
// router.post("/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing)
// );

//edit route


// //update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateListing));

// //delete route
// router.delete("/:id",
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing));

