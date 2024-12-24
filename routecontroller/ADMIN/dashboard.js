const User = require("../../db_modals/ICAISchema");

// Dashboard details like total Users, icai, non icai users
exports.dashboardData = async (req, res) => {
    try {
        const user_count = await User.countDocuments();
        console.log("total", user_count);

        const icai_users = await User.countDocuments({ user_type: "ICAI" });
        console.log("ICAI user", icai_users);

        const non_icai_users = await User.countDocuments({ user_type: "Non-ICAI"})
        console.log("non_ICAI", non_icai_users);

        // Send response with the counts
        res.status(200).json({ user_count, icai_users, non_icai_users });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
