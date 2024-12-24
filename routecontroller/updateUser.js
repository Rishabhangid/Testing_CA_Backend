const User = require('../db_modals/ICAISchema');

// Updating user with user id
exports.updateUser = async (req, res) => {
    const { id } = req.params
    // console.log("id from front",id)

    // If Empty
    const { member_id,
        member_name,
        username,
        business_card_url,
        user_type,
        mobile,
        template_id,
        industry,
        company_name,
        whatsapp_number,
        designation,
        website,
        linkedin_link,
        youtube,
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

    console.log(req.body)
    // Validate each field for non-empty input
    if (!member_id || !member_name || !username || !business_card_url || !user_type || !mobile ||
        !template_id || !industry || !company_name || !whatsapp_number || !designation || !website ||
        !linkedin_link || !youtube || !instagram_link || !facebook_link || !twitter_link || !snapchat_link ||
        !skype_id || !google_address || !telegram_link || !whatsapp_business_number || !password) {

        return res.status(400).json({ message: "All fields are required!" });
    }

    // IF not Empty
    else {
        try {
            const profileImage = req.files['profile_image'] ? req.files['profile_image'][0].path : null;
            const coverImage = req.files['cover_image'] ? req.files['cover_image'][0].path : null;

            // FINDING USER BY ITS ID AND UPDATING THE USER
            const user = await User.findByIdAndUpdate({_id:id},
                { member_id, member_name, username, business_card_url, user_type, mobile, template_id, profile_image: profileImage, cover_image: coverImage, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube, instagram_link, facebook_link, twitter_link, snapchat_link, skype_id, google_address, telegram_link, whatsapp_business_number, password, status },
                { new: true, runValidators: true });

            // IF USER NOT UDATED THEN
            if (!user) {
                return res.status(404).json({ error: 'User not found DB' });
            }

            // IF USER UPDATED THEN
            res.status(200).json(user);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }




}