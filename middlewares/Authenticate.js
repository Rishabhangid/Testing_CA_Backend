const jwt = require('jsonwebtoken');
const User = require('../db_modals/ICAISchema');
const Admin = require('../db_modals/adminSchema');



// Authentication for user
const auth = async (req, res, next) => {
    try {

        const authHeader = req.header("Authorization"); // getting toekn from header

        // If not token
        if (!authHeader) {
            console.log('No token provided in the Authorization header');
            return res.status(401).send('No token provided');
        }

        const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
        console.log("Auth token:", token);

        if (!token) {
            console.log('No token provided in cookies');
            return res.status(401).send('No token provided');
        }

        console.log('Token received:', token); // Log the received token

        const verifyToken = jwt.verify(token, process.env.KEY); // verifing token
        console.log('Token verified:', verifyToken); // Log the verified token

        // const rootUser = await User.findOne({ _id: verifyToken._id });
        const rootUser = await Admin.findById(verifyToken._id);

        if (!rootUser) {
            console.log('User not found');
            throw new Error('User not found');
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        console.error('Authentication error:', err); // Improved error logging
        res.status(401).send('Unauthorized: No token provided');
    }
};

module.exports = auth;