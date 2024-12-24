// ** IMPORTING USER SCHEMA
const User = require('../db_modals/ICAISchema');

exports.updateStatus = async (req, res) => {

    // GETTING STATUS FROM FRONTEND
    const { status } = req.body;

    // IF STATUS "EMPTY" THEN
    if (status === "") {
        res.status(402).json({ error: "Empty Feild" });
    }

    // IF STATUS "NOT EMPTY" THEN
    else {
        try {
            // FINDING USER BY ITS "ID" AND UPDATING STATUS
            const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
            
            // IF USER "NOT FOUND AND NOT UPDATED" THEN
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            // IF USER "FOUND AND UPDATED" THEN
            res.status(200).json({message:"Status Updated", user})

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}