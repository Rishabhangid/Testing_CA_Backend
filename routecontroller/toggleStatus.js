const User = require("../db_modals/ICAISchema")


exports.toggleStatus = async (req, res) => {
    const { id, user_status } = req.body
    if (!id) {
        console.log("empty feilds.")
    }
   
    else {
        console.log(id, user_status)
        const update_status = await User.findByIdAndUpdate({ _id: id }, { $set: { status: user_status } }, { new: true })
        if (!update_status) {
            console.log("Unable to update.")
        }
        else {
            console.log("Updated.")
            res.status(200).json({ message: "Status Updated", update_status })
        }
    }
}