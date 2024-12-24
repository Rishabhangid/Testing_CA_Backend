const mongoose = require('mongoose');
const User = require('../db_modals/ICAISchema');
// const bcrypt = require("bcryp")
const bcrypt = require("bcryptjs");


exports.createUser = async (req, res) => {
    const { member_id, member_name, username, business_card_url,user_type, mobile, template_id, profile_image, cover_image, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube,
        instagram_link,
        facebook_link,
        twitter_link,
        snapchat_link,
        skype_id,
        google_address,
        telegram_link,
        whatsapp_business_number,
        password,
        status
    } = req.body;

    const profileImage = req.files['profile_image'] ? req.files['profile_image'][0].path : null;
    const coverImage = req.files['cover_image'] ? req.files['cover_image'][0].path : null;


    try {
        // REGISTERING NEW USER
        
        const user = new User({ member_id, member_name, username, business_card_url,user_type, mobile, template_id, profile_image: profileImage, cover_image: coverImage, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube, instagram_link, facebook_link, twitter_link, snapchat_link, skype_id, google_address, telegram_link, whatsapp_business_number, password, status });
        await user.save();
        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};