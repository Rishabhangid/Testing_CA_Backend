const mongoose = require('mongoose');
const User = require('../db_modals/ICAISchema');

// FETCHING ALL USERS
exports.getUsers =async(req, res)=>{
     try {
            // const { page = 1, limit = 10, sort = 'created_at', order = 'asc', search, filter } = req.query;
            const { page, limit, sort= 'created_at', order, search, filter } = req.query;

            const query = {};
    
            // SEARCH QUERY
            if (search) {
                query.$or = [
                    { member_name: { $regex: search, $options: 'i' } },
                    { username: { $regex: search, $options: 'i' } },
                    { member_id: { $regex: search, $options: 'i' } },
                    { company_name: { $regex: search, $options: 'i' } }
                ];
            } 
    
            // FILTER QUERY
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
}