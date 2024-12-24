const User = require("../../db_modals/ICAISchema")

// Fetching only Non ICAI Users
exports.fetchnonicaiuser = async (req, res) => {

    const user_id = req.params.id
    // If Empty
    if (!user_id) {
        res.status(400).json({ error: "Empty Feilds." })
    }
    // If Exists
    else {
        console.log(user_id)
        const find_user = await User.find({ _id: user_id })
        console.log(find_user)
        res.status(200).json({ message: "user found", find_user })
    }
}