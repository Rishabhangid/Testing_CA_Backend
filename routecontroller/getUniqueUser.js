const User = require('../db_modals/ICAISchema');

// FETCHING USER INFORMATION BY ITS UNIQUE ID
exports.getUniqueUser = async (req, res) => {
    try {

        // FINDING USER BY ITS ID
        const user = await User.findById(req.params.id);

        // IF USER NOT EXSISTS THEN
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // IF USER EXISTS
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}