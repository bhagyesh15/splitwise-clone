const mongoose = require("mongoose");

//not using createAt, updateAt in the schema as it is supported by default - https://mongoosejs.com/docs/7.x/docs/timestamps.html

const ConnectionSchema = new mongoose.Schema({
    user1Id:{
        type:mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    user2Id:{
        type:mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    connectionType:{
        type:String,
        enum: ['group','single'],
        required: true
    },
    balance:{
        type:Number,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.models['Connections'] || mongoose.model('Connections',ConnectionSchema);