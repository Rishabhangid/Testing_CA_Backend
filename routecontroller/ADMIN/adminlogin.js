const Admin = require("../../db_modals/adminSchema");
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const bcrypt = require("bcryptjs");

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Empty fields");
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        console.log(email, password);

        // Await the result of Admin.findOne
        const find_admin = await Admin.findOne({ email: email });
        if (!find_admin) {
            console.log("No admin found.");
            return res.status(404).json({ message: "User not found" });
        } else {
            console.log("User found.");

            // Compare the password with the stored hashed password
            const compare_password = await bcrypt.compare(password, find_admin.password);
            if (!compare_password) {
                console.log("Wrong Password.");
                return res.status(400).json({ message: "Wrong password" });
            }

            console.log("Correct Password.");

            // GENERATE OTP
            const OTP = otpGenerator.generate(6, {
                digits: true,            // Allow digits (numbers only)
                upperCaseAlphabets: false,  // Disable uppercase alphabets
                specialChars: false      // Disable special characters
            });

            // Set OTP expiration time (e.g., 5 minutes)
            const expirationTime = Date.now() + 5 * 60 * 1000;

            // Store OTP and expiration in the user's document
            find_admin.otp = OTP;
            find_admin.otpExpiration = expirationTime;
            await find_admin.save();

            // SENDING OTP VIA EMAIL
            const transporter = nodemailer.createTransport({
                service: "gmail",
                // port: 587,
                // secure: true, // true for port 465, false for other ports
                // logger: true,
                // debug: true,
                // secureConnection: false,
                auth: {
                    user: process.env.EMAIL,  // Your email address from .env file
                    pass: process.env.PASSWORD
                },
                tls: {
                    rejectUnauthorized: true
                }
            });

            // Send OTP Email
            const mailOptions = {
                from: '"Admin Login Verification" <rishabhjangid33@gmail.com>', // sender address
                to: email, // recipient address
                subject: "Your OTP for Login", // subject line
                text: `Your OTP is: ${OTP}`, // text body
                html: `<b>Your OTP is: ${OTP}</b>`, // HTML body
            };

            // Send email using the transporter
            const info = await transporter.sendMail(mailOptions);
            console.log("Message sent: %s", info.messageId);

            // Respond back with OTP confirmation
            return res.status(200).json({ message: "OTP sent successfully", OTP });
        }
    } catch (error) {
        console.log("Error in catch block.", error);
        res.status(500).json({ message: "Server error" });
    }
}



