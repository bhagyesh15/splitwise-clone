const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    groupName:{
        type:String,
        required: true
    },
    groupDescription:{
        type:String
    },
    // startDate:{
    //     type:String,
    //     required: true
    // },
    userList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
},{ timestamps: true });

module.exports = mongoose.models['Groups'] || mongoose.model('Groups',GroupSchema);