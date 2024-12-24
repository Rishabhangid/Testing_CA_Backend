const User = require("../../db_modals/ICAISchema")

exports.IcaiInfo = async (req, res) => {

    const user_id = req.params.id

    // If empty
    if (!user_id) {
        res.status(400).json({ error: "Empty Feild." })
    }
    // If exists
    else {
        console.log(user_id)
        const find_user = await User.find({ _id: user_id })
        console.log(find_user)
        res.status(200).json({ message: "user found", find_user })
    }
}