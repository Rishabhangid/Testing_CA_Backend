const User = require("../../db_modals/ICAISchema");

// Fetching oly Non- ICAI  Users
exports.nonIcaiUser = async(req , res )=>{
    const non_icai_users = await User.find({ user_type: "Non-ICAI"});
    console.log("Non ICAI user", non_icai_users);
    res.status(200).json({messege:"User Found", non_icai_users})
}