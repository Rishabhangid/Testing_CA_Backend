const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser"); // FOR PASSING COOKIE
const multer = require("multer"); // FOR FILE UPLOADING 
const auth = require("../middlewares/Authenticate.js")

// FOLDER TO STORE THE UPLOADED FILE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = file.fieldname === "csvfile" ? "uploads/csv/" : "uploads/images/";
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const upload = multer({ storage: storage });




// IMPORTING CONTROLLERS
const { createUser } = require("../routecontroller/createUser");
const { testingRoute } = require("../routecontroller/routefunction");
const { create_nonICAI_user } = require("../routecontroller/create_nonICAI_user");
const { getUsers } = require("../routecontroller/getUsers");
const { getUniqueUser } = require("../routecontroller/getUniqueUser");
const { updateUser } = require("../routecontroller/updateUser");
const { deleteUser } = require("../routecontroller/deleteUser");
const { updateStatus } = require("../routecontroller/updateStatus");
const { importCSVData } = require("../routecontroller/importCSVData");
const { exportData } = require("../routecontroller/exportDATA");
const { generateOTP } = require("../routecontroller/generateOTP");
const { loginUser } = require("../routecontroller/loginUser");
const { geticaiUsers } = require("../routecontroller/geticaiUsers"); 
const { adminLogin } = require("../routecontroller/ADMIN/adminlogin.js");
const { adminregister } = require("../routecontroller/ADMIN/adminregister.js");
const { verifyAdmin } = require("../routecontroller/ADMIN/verifyAdmin.js");
const { dashboardData } = require("../routecontroller/ADMIN/dashboard.js");
const { fetchIcaiUsers } = require("../routecontroller/ICAI/fetchIcaiUsers.js");
const { createNewIcai } = require("../routecontroller/ICAI/createNewIcai.js");
const { nonIcaiUser } = require("../routecontroller/NONICAI/nonIcaiUser.js");
const { IcaiInfo } = require("../routecontroller/ICAI/IcaiInfo.js");
const { fetchnonicaiuser } = require("../routecontroller/NONICAI/fetchnonicaiuser.js");
const { deleteMultiUsers } = require("../routecontroller/deleteMultiUsers.js");
const { toggleStatus } = require("../routecontroller/toggleStatus.js");


// MIDDLEWARES
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//  ADMIN ROUTES

// *** TESTING ROUTE 
router.get("/test", testingRoute);

// *** ADMIN REGISTER : Registering Admin
// I/p: email, password
router.post("/adminregister",adminregister)

// *** ADMIN ROUTE : Login Admin
// I/p: email, password
router.post("/adminlogin",adminLogin)

// *** VERIFING OTP : Verifing OTP for Login
// I/p:email, otp
router.post('/verifyadmin', verifyAdmin); 

// *** DASHBOARD ROUTE [Authentication Required: "Authorization" header]
// O/p: Sending user count, icai users, non icai users
router.get("/dashboard",auth, dashboardData)

// *** GETTING ALL USERS [Authentication Required: "Authorization" header
// I/p: page no, limit no, sort= default by created_at, order="asc/dsc", search keyword, filter keyword
// O/p: All users
router.get("/getusers",auth, getUsers)    

// *** SENDING ONLY ICAI USER [Authentication Required: "Authorization" header
// O/p: only icai users
router.get("/icaiusers",auth, fetchIcaiUsers)

// *** SENDING ONLY NON ICAI USERS [Authentication Required: "Authorization" header
// O/p: Only Non Icai Users
router.get("/nonicaiuser",auth, nonIcaiUser)

// *** CREATING NEW ICAI/NONICAI USER
// I/p: User data....
router.post("/createnewicai",upload.fields([{ name: 'profile_image', maxCount: 1 },   { name: 'cover_image', maxCount: 1 }]),createNewIcai)

// *** VIEW ICAI USER DETAIL
// I/p: user id  O/p: User Data
router.get("/geticaiuser/:id",IcaiInfo)

// *** VIEW NON ICAI USER DETAIL
// I/p: user id O/p: User data
router.get("/getnonicaiuser/:id", fetchnonicaiuser)

// *** UPDATED ICAI / NON ICAI  USER USING USER 
// I/p : user id , new data
router.put("/updateuser/:id", upload.fields([{ name: 'profile_image', maxCount: 1 },   { name: 'cover_image', maxCount: 1 }]),auth, updateUser)

// *** IMORTING USERS IN BULK FROM CSV FILE
// I/p : CSV File
router.post("/uploadcsv",upload.single("csvfile"), importCSVData)

// *** EXPORTING DATA FROM DB TO CVS FILE
// I/p :  search, filter
router.get("/exportdata", exportData)

// *** DELETE SINGLE USER
// I/p: user id
router.delete("/deleteuser/:id", deleteUser)

// *** DELETE MULTIPLE USERS
// I/p : multiple user id array
router.delete("/deleteusers",deleteMultiUsers)

// ** TOGGLE STATUS OF USER
// I/p : User id updated status
router.post("/togglestatus",toggleStatus)

// EXPORTING ALL ROUTES
module.exports = router;