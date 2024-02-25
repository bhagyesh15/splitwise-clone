const mongoose = require("mongoose");

const SplitwiseSchema = new mongoose.Schema({
    text:{
        type: String,
        require: true
    }
})



const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phone:{
        type:Number,
        required: true
    }
});


const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    amount:{
        type:String,
        required: true
    },
    // currency:{
    //     type:String,
    //     required: true
    // },
    paidBy:{
        type:[],
        required: true
    },
    sharedBy:{
        type:[],
        required: true
    },
    isGroupExpense:{
        type:Boolean,
        required:true
    }
});

//not using createAt, updateAt in the schema as it is supported by default - https://mongoosejs.com/docs/7.x/docs/timestamps.html

const ConnectionSchema = new mongoose.Schema({
    user1Id:{
        type:mongoose.ObjectId,
        required: true
    },
    user2Id:{
        type:mongoose.ObjectId,
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
});

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
    usersList:{
        type:[mongoose.ObjectId],
        required: true
    }
});

module.exports = mongoose.model('Splitwise',SplitwiseSchema);
// module.exports = mongoose.model('Users',UserSchema);
// module.exports = mongoose.model('Expenses',ExpenseSchema);
// module.exports = mongoose.model('Connections',ConnectionSchema);
// module.exports = mongoose.model('Groups',GroupSchema);