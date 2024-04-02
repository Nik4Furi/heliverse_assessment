
const TeamModel = require('../models/TeamModel');
const UsersModel = require('../models/UsersModel'); //users models

const getDataUri = require('../utils/DataUri'); //Get data uri to upload images

//------------ Packages Specific Stuff
const cloudinary = require('cloudinary');

//-------------- Create the users specific controllers stuffs
function UsersControllers() {
    return {

        //----------- fetch all the users with pagination, using '/api/users'
        async FetchUsers(req, res) {

            try {
                const page = parseInt(req.query.page) || 1;
                const limit = 20;
                const skip = (page - 1) * limit;
                const { name, domain, gender, availability } = req.query;

                let query = UsersModel.find();

                if (name) {
                    query = query.or([
                        { first_name: { $regex: new RegExp(name, 'i') } },
                        { last_name: { $regex: new RegExp(name, 'i') } },
                    ]);
                }

                if (domain)
                    query = query.where('domain').equals(domain);

                if (gender)
                    query = query.where('gender').equals(gender);

                if (availability !== undefined)
                    query = query.where('available').equals(availability === 'true');

                const users = await query.limit(limit).skip(skip).exec();

                return res.status(200).json({ success: true, msg: 'fetch all the users', length: users.length, users })

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //--------- Fetch the user, using GET '/api/users/Fetch/:id'
        async FetchUser(req, res) {

            try {

                const users = await UsersModel.findById(req.params._id).select('-password')

                return res.status(200).json({ success: true, msg: 'Fetch the user', users });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //--------- Create the user, using GET '/api/users/create'
        async CreateUser(req, res) {

            try {
                //--------- Req.body content
                const { first_name, last_name, email, gender, domain, available } = req.body;

                //Requring all the specific fields
                if (!first_name || !last_name || !email || !gender || !domain || !available) { return res.status(404).json({ success: false, msg: "All fields are required" }) };


                // Check the user is already register
                let user = await UsersModel.findOne({ email })
                if (user) { return res.status(401).json({ success: false, msg: "this crenditentals's user is already exist" }) };

                //Upload profile pictures
                const file = req.file;
                if (!file) return res.status(404).json({ success: false, msg: "File not found" });

                const fileUri = await getDataUri(file);

                const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);


                //Register the users
                user = await UsersModel({
                    first_name,
                    last_name,
                    email,
                    avatar: myCloud.secure_url,
                    gender, available, domain
                })
                await user.save();


                return res.status(200).json({ success: true, msg: 'Created the users successfully', user });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        //--------- Update the user's details, using PUT '/api/users/update'
        async UpdateUser(req, res) {

            try {
                //--------- Req.body content
                const { first_name, last_name, gender, domain, available } = req.body;

                if (first_name) req.user.first_name = first_name;
                if (last_name) req.user.last_name = last_name;
                // if (email) req.user.email = email;
                if (gender) req.user.gender = gender;
                if (domain) req.user.domain = domain;
                if (available) req.user.available = available

                // Check the user is already register
                let user = await UsersModel.findOne({ email: req.user.email })
                if (!user) { return res.status(401).json({ success: false, msg: "this crenditentals's user is not exist" }) };

                //Upload profile pictures
                const file = req.file;
                if (file) {

                    const fileUri = await getDataUri(file);

                    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

                    req.user.avatar = myCloud?.secure_url;
                }

                await req.user.save();

                return res.status(200).json({ success: true, msg: 'Update your profile successfully', user: req.user });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        //--------- Delete the user, using GET '/api/users/delete/:id'
        async DeleteUser(req, res) {

            try {

                const user = await UsersModel.findOneAndDelete({ _id: req.params._id });
                if (!user) return res.status(404).json({ success: false, msg: "User not found" });

                return res.status(200).json({ success: true, msg: 'Delete the user successfully', user });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }) }
        },

        //------------- Search the user, using GET '/api/users/search?name'
        async CreateTeam(req, res) {
            try {
                const { title, description, memberIds } = req.body;

                if (!title || !description || !memberIds.length) return res.status(404).json({ success: false, msg: "All fields are required" })

                const team = await TeamModel.create({
                    title, description, members: memberIds, created_by: req.user._id
                })

                res.status(200).json({ success: true, msg: "Created the new team successfully", team });


            } catch (error) {
                res.status(500).json({ success: false, msg: error.message });
            }
        },

        //------------- Fetch the user's team details, using GET '/api/users/search?name'
        async FetchTeam(req, res) {
            try {

                const teams = await TeamModel.find({ created_by: req.user._id }).populate('members')

                res.status(200).json({ success: true, msg: "Fetch all the team members", teams });


            } catch (error) {
                res.status(500).json({ success: false, msg: error.message });
            }
        },

        //------------- Fetch one team of the user's team details, using GET '/api/users/fetchATeam/:_id'
        async FetchATeam(req, res) {
            try {

                const team = await TeamModel.findOne({ created_by: req.user._id, _id: req.params._id }).populate('members')

                res.status(200).json({ success: true, msg: "Fetch a the team detail", team });


            } catch (error) {
                res.status(500).json({ success: false, msg: error.message });
            }
        }
    }
}

module.exports = UsersControllers;