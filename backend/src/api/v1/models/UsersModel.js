const mongoose = require('mongoose');

const { UserGenderTypes } = require('../types/UsersTypes'); //To define the types of the genders

//------------------ User schema to store the users ---------
const UserSchema = new mongoose.Schema({

    first_name: { type: String, required: true, minlength: [2, "first name must be 2 char long "], maxlength: [80, "first name mustn't 80 char long"] },

    last_name: { type: String, required: true, minlength: [2, "last name must be 2 char long "], maxlength: [80, "last name mustn't 80 char long"] },

    email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },

    password: { type: String, minlength: [8, "Password must be 8 char long "], maxlength: [120, "Password mustn't 120 char long"] },

    avatar: String,

    gender: { type: String, required: true, enum: UserGenderTypes },

    domain: { type: String, required: true },

    available: { type: Boolean, required: true, default: false },

}, { timestamps: true })


//Modal to which collection form we save the data
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel