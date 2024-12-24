const User = require('../db_modals/ICAISchema');
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log("Empty fields.");
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        console.log(username, password);
        
        // FIND USER
        const find_user = await User.findOne({ username: username });

        // Check if the user exists
        if (!find_user) {
            console.log("User not found.");
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User found.");
        
        // Compare the password with the stored hashed password
        const compare_password = await bcrypt.compare(password, find_user.password);
        if (!compare_password) {
            console.log("Wrong Password.");
            return res.status(400).json({ message: "Wrong password" });
        }

        console.log("Correct Password.");
        
        // Generate a token for the user (assuming generateAuthToken method exists on your schema)
        const token = await find_user.generateAuthToken();
        console.log(token);

        // Send the response with the token
        res.status(200).json({ message: "User Verified", token,find_user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
