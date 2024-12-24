const mongoose = require('mongoose');
const { Schema } = mongoose;
const csv = require('csv-parser');
const fs = require('fs');
const { Parser } = require('json2csv');

// Define the schema for the Users collection
const userSchema = new Schema({
    member_id: { type: String, required: true },
    member_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    business_card_url: { type: String },
    // user_type: { type: String, enum: ['ICAI', 'Non-ICAI'], required: true },
    mobile: { type: String, required: true },
    template_id: { type: String },
    profile_image: { type: String },
    cover_image: { type: String },
    industry: { type: String },
    company_name: { type: String },
    whatsapp_number: { type: String },
    designation: { type: String },
    website: { type: String },
    linkedin_link: { type: String },
    youtube: { type: String },
    instagram_link: { type: String },
    facebook_link: { type: String },
    twitter_link: { type: String },
    snapchat_link: { type: String },
    skype_id: { type: String },
    google_address: { type: String },
    telegram_link: { type: String },
    whatsapp_business_number: { type: String },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Middleware to update `updated_at` on save
userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Create the model for the Users collection
const User = mongoose.model('User', userSchema);

// CRUD API Handlers
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'created_at', order = 'asc', search, filter } = req.query;
        const query = {};

        // Search query
        if (search) {
            query.$or = [
                { member_name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { member_id: { $regex: search, $options: 'i' } },
                { company_name: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter query
        if (filter) {
            Object.assign(query, JSON.parse(filter));
        }

        const users = await User.find(query)
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.status(200).json({ data: users, total, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Bulk Import Users
const bulkImportUsers = async (req, res) => {
    try {
        const users = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                users.push(row);
            })
            .on('end', async () => {
                await User.insertMany(users);
                res.status(201).json({ message: 'Users imported successfully', users });
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export Users
const exportUsers = async (req, res) => {
    try {
        const { search, filter } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { member_name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { member_id: { $regex: search, $options: 'i' } },
                { company_name: { $regex: search, $options: 'i' } }
            ];
        }

        if (filter) {
            Object.assign(query, JSON.parse(filter));
        }

        const users = await User.find(query);
        const fields = Object.keys(User.schema.paths).filter(field => field !== '__v');
        const parser = new Parser({ fields });
        const csvData = parser.parse(users);

        res.header('Content-Type', 'text/csv');
        res.attachment('users.csv');
        res.status(200).send(csvData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    User,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateUserStatus,
    bulkImportUsers,
    exportUsers
};



