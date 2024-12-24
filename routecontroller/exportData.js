const User = require('../db_modals/ICAISchema');
const { Parser } = require('json2csv'); // TO CONVERT JSON TO CSV

exports.exportData = async(req, res)=>{
    try {
        // GETIING KEYWORD TO FILTER AND SEARCH
        const { search, filter } = req.query;

        // WILL STORE THE RESULT
        const query = {};

        // SEARCHINH WITH "search" INPUT ( CASE INSENSETIVE )
        if (search) {
            query.$or = [
                { member_name: { $regex: search, $options: 'i' } },
                { username: { $regex: search, $options: 'i' } },
                { member_id: { $regex: search, $options: 'i' } },
                { company_name: { $regex: search, $options: 'i' } }
            ];
        }

        // IF FILTER EXISTS THEN
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
}