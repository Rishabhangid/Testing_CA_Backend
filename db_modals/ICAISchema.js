const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const ICAISchema = new Schema({
    member_id: { type: String, required: true },
    member_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    business_card_url: { type: String },
    user_type: { type: String, enum: ['ICAI', 'Non-ICAI'], required: true },
    mobile: { type: String, required: true },
    template_id: { type: String },
    profile_image: { type: String },
    cover_image: { type: String },
    industry: { type: String },
    company_name: { type: String },
    whatsapp_number: { type: String },
    designation: { type: String },
    website: { type: String },
    linkedin_link: { type: String },
    youtube: { type: String },
    instagram_link: { type: String },
    facebook_link: { type: String },
    twitter_link: { type: String },
    snapchat_link: { type: String },
    skype_id: { type: String },
    google_address: { type: String },
    telegram_link: { type: String },
    whatsapp_business_number: { type: String },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


// Hasing Password
ICAISchema.pre("save", async function (next) {
    if (this.isModified("password")) { // it mean jb pass chnge ho tb hi ecrypt krna he.
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Toekn Generation
ICAISchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.KEY);
        return token;

    }
    catch (err) { console.log(err); }
}


// MIDDLEWARE UPDATING THE DATA ON ANY UPDATES
ICAISchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const User = mongoose.model("ICAI",ICAISchema)
module.exports = User


