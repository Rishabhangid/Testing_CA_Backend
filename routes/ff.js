// *** REGISTERING ICAI USER
router.post("/createuser",upload.fields([{ name: 'profile_image', maxCount: 1 },   { name: 'cover_image', maxCount: 1 }]) , createUser)

// *** LOGIN USER WITH OTP SENDING
router.post("/login", loginUser)



// *** ICAI USERS
router.get("/geticaiusers",geticaiUsers)

// *** REGISTERING ICAI USER
router.post("/nonicai_reigter", create_nonICAI_user)


// *** GET UNIQUE USER FROM USER ID
router.get("/getuser/:id", getUniqueUser)



// *** UPDATE USER STATUS USING USER ID
router.put("/updatestatus/:id", updateStatus)



// *** EXPORTING DATA FROM DB TO CVS FILE
router.get("/exportdata", exportData)

// *** OTP ROUTE
router.post("/generateotp", generateOTP)