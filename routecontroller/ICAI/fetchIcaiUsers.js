const User = require("../../db_modals/ICAISchema");

// Fetching Only ICAI Users
exports.fetchIcaiUsers = async (req, res) => {
    const icai_users = await User.find({ user_type: "ICAI" });
    console.log("ICAI user", icai_users);
    res.status(200).json({messege:"User Found", icai_users})

}