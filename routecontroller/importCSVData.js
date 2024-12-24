const fs = require("fs");
const csv = require("csv-parser");
const User = require('../db_modals/ICAISchema');

// Importing CSV File
exports.importCSVData = async (req, res) => {

    //  GEETING CVS FILE
    const csvfile = req.file;
    console.log(csvfile.path);

    try {

        // TO STORE THE CSV FILE DATA
        const users = [];

        // READING FILE
        fs.createReadStream(csvfile.path)
            .pipe(csv()) // CSV PARING EACH ROW

            .on('data', (row) => { // EXRTRCTING EACH ROW AND COLUMN

                // WILL HOLDS THE NEW OBJECT
                const sanitizedRow = {};

                // LOOPING THE KEY VALUE PAIR
                Object.keys(row).forEach((key) => {

                    // REMOVING SPACES
                    const sanitizedKey = key.replace(/"/g, '').trim();  
                    sanitizedRow[sanitizedKey] = row[key];
                });

                // ADDING THE NEW CSV DATA TO USERS
                users.push(sanitizedRow);
                console.log(sanitizedRow);

            })
            // RUN WHEN ALL DATA IS ADDED IN USERS FROM CSV
            .on('end', async () => {
                // IF NO DATA THEN
                if (users.length === 0) {
                    return res.status(400).json({ error: 'No data parsed from CSV.' });
                }

                // IF DATA EXISTS THEN ADDING TO DATABSE
                try {
                    await User.insertMany(users);
                    res.status(201).json({ message: 'Users imported successfully', users });
                } catch (error) {
                    console.error('Error inserting into database:', error);
                    res.status(500).json({ error: error.message });
                }
            });
            
    } catch (error) {
        console.error('Error during file processing:', error);
        res.status(500).json({ error: error.message });
    }
};
