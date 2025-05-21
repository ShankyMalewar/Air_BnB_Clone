const Listing = require("./models/listing")
const Review = require("./models/review")

const { listingSchema,reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.path,"..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be logged in to create Listings!")
        return res.redirect("/login")
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next()
};// locals me redirect url ko save isiliye kiya coz passport sessions ko clean kr deta h login k baad. isiliye usse access nhi kr skte the.


module.exports.isOwner = async (req,res,next)=>{
    let { id } = req.params;
        let listing = await Listing.findById(id) //Abb authoriztion krnne k liye (koi hopscotch se req bhej diya toh del,edit update ki?) hum pehle check krenge ki woh owner h ki nhi
        if(!listing.owner.equals(res.locals.currUser._id)){
            req.flash("error","You are not the owner of this listing!")
            return res.redirect(`/listings/${id}`) // return kiya toh yaha pe terminate nhi toh aage k operations hote rahenge
        }
        next();
};

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
};// joi(yaha ekk middleware bna diya use) hame result ka error send krga and experror se ham styling de denge usse and print karaenge
//and new and update mein validateLISTING PASS KR DIYA.DEKH

module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req,res,next)=>{
    let { id,reviewId } = req.params;
        let review = await Review.findById(reviewId) //Abb authoriztion krnne k liye (koi hopscotch se req bhej diya toh del,edit update ki?) hum pehle check krenge ki woh owner h ki nhi
        if(!review.author.equals(res.locals.currUser._id)){
            req.flash("error","You are not the author of this review!")
            return res.redirect(`/listings/${id}`) // return kiya toh yaha pe terminate nhi toh aage k operations hote rahenge
        }
        next();
};