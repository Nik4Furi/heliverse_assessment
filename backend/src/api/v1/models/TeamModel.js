const mongoose = require('mongoose');


//------------------ Team schema to create the teams ---------
const TeamSchema = new mongoose.Schema({

    title: { type: String, required: true },

    description: { type: String, required: true },

    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

}, { timestamps: true })


//Modal to which collection form we save the data
const TeamModel = mongoose.model('Team', TeamSchema)

module.exports = TeamModel