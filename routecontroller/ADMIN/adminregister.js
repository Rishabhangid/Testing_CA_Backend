const Admin = require("../../db_modals/adminSchema");

// Registering THe Admin
exports.adminregister = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "EMpty Feilds." })
    }
    else {
        try {
            const existing_admin = await Admin.findOne({ email });
            if (existing_admin) {
                return res.status(400).json({ error: "Admin with this email already exists." });
            }
            else {
                const new_admin = new Admin({ email, password });
                await new_admin.save();
                res.status(201).json({ message: "Admin Registered.", admin: { new_admin: new_admin.email, id: new_admin._id } })
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


}