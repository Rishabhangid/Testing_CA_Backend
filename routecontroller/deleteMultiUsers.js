const User = require("../db_modals/ICAISchema")

// deleting multiple user
exports.deleteMultiUsers = async (req, res) =>{
    const {users_to_delete} = req.body
    console.log(users_to_delete)

    if(!users_to_delete){
        console.log("empty feild.")
    }
    else{
        const delete_users = await User.deleteMany({ _id:{$in:users_to_delete}})
        if(!delete_users){
            console.log("Users not deleted.")
        }
        else{
            console.log("Uses Deleted.")
            res.status(200).json({mesage:"Users deleted." , delete_users})
        }
    }
}