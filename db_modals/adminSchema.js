const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Admin Schema
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String, required: false },
    otpExpiration: {
        type: Date,
        required: false, // OTP expiration is not mandatory
    },
})

// To hash the passwword before saving
adminSchema.pre("save", async function (next) {
    if (this.isModified("password")) { // it mean jb pass chnge ho tb hi ecrypt krna he.
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// To generate toekn on login
adminSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.KEY);
        return token;
    }
    catch (err) { console.log(err); }
}

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin
