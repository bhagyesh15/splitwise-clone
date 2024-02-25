const mongoose = require("mongoose");

const UserExpenseSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    share:{
        type:Number,
        default:0
    }
}, { _id: false } );
// { _id: false } added to prevent adding objct id to nested subobjects

const ExpenseSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    // currency:{
    //     type:String,
    //     required: true
    // },
    paidBy:{
        type:[UserExpenseSchema],
        required: true
    },
    sharedBy:{
        type:[UserExpenseSchema],
        required: true
    },
    finalShare:{
        type:[UserExpenseSchema],
        required: true
    },
    oweList:{
        type:[{
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
            owes:{
                type:Number,
                default:0
            }
        }],
        required: true,
        _id : false
    },
    groupId:{
        type:mongoose.Schema.ObjectId,
        default:null
    },
},{ timestamps: true });

//not using createAt, updateAt in the schema as it is supported by default - https://mongoosejs.com/docs/7.x/docs/timestamps.html

module.exports = mongoose.models['Expenses'] || mongoose.model('Expenses',ExpenseSchema);