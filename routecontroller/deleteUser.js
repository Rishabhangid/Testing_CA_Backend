const User = require('../db_modals/ICAISchema');

// DELETING USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        // IF USER NOT FOUND THEN
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // IF USER EXISTS THEN
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}