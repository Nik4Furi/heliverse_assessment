//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash
const jwt = require('jsonwebtoken'); // Tokenized our users
const cloudinary = require('cloudinary'); //To upload files--

//-------------- Model Specific Stuff
const UserModel = require('../models/UsersModel'); //User modal

//------------ Utils Specific Stuff
const getDataUri = require('../utils/DataUri');


//------------------ Creating the AuthControllerss to authenticate the users -----------X
function AuthControllers() {

    return {

        // Register the users, using POST '/api/user/register'
        async Register(req, res) {

            try {
                //--------- Req.body content
                const { first_name, last_name, email, password, cpassword, gender, domain, available } = req.body;

                //Requring all the specific fields
                if (!first_name || !last_name || !email || !password || !cpassword || !gender || !domain || !available) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

                if (password.length < 8 || cpassword.length < 8)
                    return res.status(404).json({ success: false, msg: "Password & Confirm password must be 8 char long" })

                //check password and confirm password match
                if (password !== cpassword) { return res.status(404).json({ success: false, msg: "Password and ConfrimPassword did not match" }) };

                // Check the user is already register
                let users = await UserModel.findOne({ email })
                if (users) { return res.status(401).json({ success: false, msg: "this crenditentals's user is already exist" }) };

                //Upload profile pictures
                const file = req.file;
                if (!file) return res.status(404).json({ success: false, msg: "File not found" });

                const fileUri = await getDataUri(file);

                const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

                //Converting the password into hash
                let hashPassword = await bcrypt.hash(password, 10);

                //Register the users
                users = await UserModel({
                    first_name,
                    last_name,
                    email,
                    password: hashPassword,
                    avatar: myCloud.secure_url,
                    gender, available, domain
                })
                await users.save();

                const payloads = {
                    user: { id: users._id }
                }
                const Secret_Key = process.env.JWT_SECRET_KEY;

                const token = await jwt.sign(payloads, Secret_Key, { expiresIn: '10d' })

                return res.status(200).json({ success: true, msg: 'You are successfully register', users, token });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        // Login the users, using POST '/api/user/login'
        async Login(req, res) {
            try {
                //--------- Req.body content
                const { email, password } = req.body;

                //Requring all the specific fields
                if (!email || !password) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

                // Check the user is not already register
                let users = await UserModel.findOne({ email })
                if (!users) { return res.status(401).json({ success: false, msg: "Your crenditentals is not correct" }) };

                //Comparing the password of register and login user
                let hashPassword = await bcrypt.compare(password, users.password)
                if (!hashPassword) { return res.status(404).json({ success: false, msg: "Your credentials not correct" }) }

                // Now create the token to authorizing the users
                const payloads = {
                    user: { id: users._id }
                }
                const Secret_Key = process.env.JWT_SECRET_KEY;

                const token = await jwt.sign(payloads, Secret_Key, { expiresIn: '10d' })

                return res.status(200).json({ success: true, msg: 'You are successfully login', token, users });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        // Get the info of login user, using GET '/api/user/getUser'
        async getUser(req, res) {
            try {
                const user = req.user;

                return res.status(200).json({ success: true, msg: `Welcome back ${req.user.first_name}`, user });

            } catch (error) { return res.status(500).json({ success: true, msg: error.message }); }
        },

    }
}

module.exports = AuthControllers;