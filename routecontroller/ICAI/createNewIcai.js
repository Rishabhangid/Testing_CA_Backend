const User = require("../../db_modals/ICAISchema");

//  Creating New User
exports.createNewIcai = async (req, res) => {


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

    // Validate each field for non-empty input
    if (!member_id || !member_name || !username || !business_card_url || !user_type || !mobile ||
        !template_id || !industry || !company_name || !whatsapp_number || !designation || !website ||
        !linkedin_link || !youtube || !instagram_link || !facebook_link || !twitter_link || !snapchat_link ||
        !skype_id || !google_address || !telegram_link || !whatsapp_business_number || !password ) {

        return res.status(400).json({ message: "All fields are required!" });
    }

    else {
        const profileImage = req.files['profile_image'] ? req.files['profile_image'][0].path : null;
        const coverImage = req.files['cover_image'] ? req.files['cover_image'][0].path : null;


        try {

            const user = new User({ member_id, member_name, username, business_card_url, user_type, mobile, template_id, profile_image: profileImage, cover_image: coverImage, industry, company_name, whatsapp_number, designation, website, linkedin_link, youtube, instagram_link, facebook_link, twitter_link, snapchat_link, skype_id, google_address, telegram_link, whatsapp_business_number, password, status });
            await user.save();
            res.status(200).json({message:"User created" ,user});

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}