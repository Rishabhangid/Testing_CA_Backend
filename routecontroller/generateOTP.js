const nodemailer = require("nodemailer")
const otpGenerator = require('otp-generator')

// GENERATING OTP
exports.generateOTP = async (req, res) => {
    const { email } = req.body
    // IF EMAIL NOT FOUND
    if (!email) {
        return res.status(404).json({ error: "Empty Feild" })
    }
    // IF EMAIL FOUND
    else {
        try {
            console.log("Email found", email)
            // GENERATING OTP
            const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            console.log(OTP)

            // SENDING OTP 
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true, // true for port 465, false for other ports
                loger: true,
                debug:true,
                secureConnection: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.CODE,
                },
                tls:{
                    rejectUnauthorized : true
                }
            });

            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                // send mail with defined transport object
                const info = await transporter.sendMail({
                    from: '"OTP" <rishabhjangid33@gmail.com>', // sender address
                    //   to: "bar@example.com, baz@example.com", // list of receivers
                    to: email, // list of receivers
                    subject: "Hello ✔", // Subject line
                    text: "Hello world?", // plain text body
                    html: "<b>Hello world?</b>", // html body
                });

                console.log("Message sent: %s", info.messageId);

                // Respond back with OTP confirmation (you can also add the OTP in the response if needed)
                return res.status(200).json({ message: "OTP sent successfully", OTP })
            }

        }
        catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Failed to send OTP" })

        }
    }
}