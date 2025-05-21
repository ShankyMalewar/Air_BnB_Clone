const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
        // username and password passport-local-mongoose khud hi define kar deta hai.
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema)