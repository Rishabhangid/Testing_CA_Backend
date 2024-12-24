const mongoose = require('mongoose');
const User = require('../db_modals/ICAISchema');

// sKy97cECT0MWWXai
// rishabhjangid33


exports.create_nonICAI_user = async (req, res) => {
// exports.createUser = async (req, res) => {
    const { member_id, member_name, username, business_card_url, mobile, template_id, profile_image, cover_image, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube,
        instagram_link,
        facebook_link,
        twitter_link,
        snapchat_link,
        skype_id,
        google_address,
        telegram_link,
        whatsapp_business_number,
        password,
        status,
        created_at,
        updated_at } = req.body;

    // if (!member_id || !member_name || !username || !business_card_url || !mobile, !template_id || !profile_image || !cover_image || !industry || !company_name || !whatsapp_number || !designation || !website || linkedin_link || youtube ||
    //     !instagram_link ||
    //     !facebook_link ||
    //     !twitter_link ||
    //     !snapchat_link ||
    //     !skype_id ||
    //     !google_address ||
    //     !telegram_link ||
    //     !whatsapp_business_number ||
    //     !password ||
    //     !status ||
    //     !created_at ||
    //     !updated_at) {
    //     res.status(404).json({ error: "Empty Feilds." })
    // }
    // else {

        try {
            const user = new User({ member_id, member_name, username, business_card_url, mobile, template_id, profile_image, cover_image, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube,      instagram_link,        facebook_link,       twitter_link,       snapchat_link,       skype_id,       google_address,       telegram_link,        whatsapp_business_number,       password,       status,       created_at,       updated_at} );
            await user.save();
            res.status(201).json(user);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }


;