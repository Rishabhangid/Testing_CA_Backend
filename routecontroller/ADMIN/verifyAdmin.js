const Admin = require("../../db_modals/adminSchema");

// Verifying the Otp 
exports.verifyAdmin = async (req, res) => {
    const { email, otp } = req.body;

    // If empty
    if (!email || !otp) {
        console.log("Email and OTP are required.");
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    // It not empty
    try {
        // Find the admin by email
        const find_admin = await Admin.findOne({ email: email });

        if (!find_admin) {
            console.log("Admin not found.");
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if the OTP matches
        if (find_admin.otp !== otp) {
            console.log("Invalid OTP.");
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Check if OTP has expired
        if (Date.now() > find_admin.otpExpiration) {
            console.log("OTP has expired.");
            return res.status(400).json({ message: "OTP has expired. Please request a new one" });
        }

        // OTP verified successfully, generate an auth token
        const token = await find_admin.generateAuthToken();
        console.log("OTP Verified. Token:", token);

        // Optionally, clear OTP after successful verification
        find_admin.otp = null;  // Clear OTP after successful verification
        find_admin.otpExpiration = null;  // Clear OTP expiration time
        await find_admin.save();

        // Respond back with token and success message
        return res.status(200).json({ message: "OTP verified successfully. Admin logged in.", token, admin: { admin_email:find_admin.email,  admin_id:find_admin._id } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};