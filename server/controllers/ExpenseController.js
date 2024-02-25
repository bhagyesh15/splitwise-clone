const ConnectionModel = require("../models/ConnectionModel");
const ExpenseModel = require("../models/ExpenseModel");
const { expenseShareUtil } = require("../utils/expenseUtil");

//getExpenses
//getExpennseById
//getAllUserExpenses

module.exports.getExpenses = async (req,res) => {
    const expenses = await ExpenseModel.find();
    res.send(expenses);
};


module.exports.getExpenseById = async (req,res) => {
    const {id } = req.params;
    console.log("getExpenseById: ", id);
    const expense = await ExpenseModel.findById(id);
    res.send(expense);
};


module.exports.getAllUserExpenses = async (req,res) => {
    const {id} = req.params;
    const userExpenses = await ExpenseModel.find(
        {
            "finalShare.userId" : id
        },
        {},
        {
            sort: {'createdAt':-1}
        }
    );
    res.send(userExpenses);
};

/*
saveUserExpense - calculates finalShare with the help of paidBy and sharedBy list, then calculates the owedby list
*/
module.exports.saveUserExpense = async(req,res) => {
    const {paidBy,sharedBy} = req.body;

    //TEMP
    // console.log("saveUserExpense: ");
    // console.log(req.body);
    
    const {oweList,finalShare} = expenseShareUtil(paidBy,sharedBy);
    
    const users = finalShare.map(({userId})=>userId)
    // console.log("users: ",users);
    // console.table(oweList);
    console.table(users);

    for(const userPair of oweList){
        console.log("Initial for ");
        const userResult = await ConnectionModel.findOne({
            $or:[
                {
                    user1Id: userPair.user1Id,
                    user2Id: userPair.user2Id
                },
                {
                    user1Id: userPair.user2Id,
                    user2Id: userPair.user1Id
                }
            ],
            connectionType:'single'
        }).catch((err)=>{
            console.log("Exception in saveUserExpense ConnectionModel.findOne : ");
            console.log(err);
            res.status(500).send(err);
            return;
        });
        
        console.log('userPair',userPair);
        console.log('userResult',userResult);

        if(userResult != null){  //connection exists
            if(userPair.user1Id == userResult.user1Id){  //user1 in connection is same as userpair
                console.log(userResult.balance,userPair.owes,userResult.balance + userPair.owes);
                await ConnectionModel.findByIdAndUpdate(userResult._id,{
                    balance: userResult.balance + userPair.owes
                }).catch((err)=>{
                    console.log("Exception in saveUserExpense ConnectionModel.findByIdAndUpdate-1 : ");
                    console.log(err);
                    res.status(500).send(err);
                    return;
                });
            }
            else{  //if not same
                console.log('else : ',userResult.balance,userPair.owes,userResult.balance - userPair.owes);
                await ConnectionModel.findByIdAndUpdate(userResult._id,{
                    balance: userResult.balance - userPair.owes
                }).catch((err)=>{
                    console.log("Exception in saveUserExpense ConnectionModel.findByIdAndUpdate-2 : ");
                    console.log(err);
                    res.status(500).send(err);
                    return;
                });
            }
        }
        else{ //connection does not exist, create connection
            console.log('--userResult null');
            await ConnectionModel.create(
                {
                    user1Id:userPair.user1Id,
                    user2Id:userPair.user2Id,
                    connectionType:"single",
                    balance:userPair.owes
                }
            ).catch((err)=>{
                console.log("Exception in saveUserExpense ConnectionModel.create : ");
                console.log(err);
                res.status(500).send(err);
                return;
            });
        }
        console.log('End for ');
    }

    await ExpenseModel.create({...req.body,finalShare,oweList}).then((result) => {
        console.log("-----Saved succesfully to the db:");
        console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        console.log("Exception in saveUserExpense:");
        console.log(err)
        res.status(500).send(err);
    });
    // res.send({finalShare,oweList});
};

module.exports.updateUserExpense = async(req,res) => {
    const {id} = req.params;
    const body = req.body;

    //title amount paidBy sharedBy  --- finalShare, oweList
    const result = await this.getExpenseById(id);
    const keys = Object.keys(body);
    // let updatedValues = {};

    if(keys.length == 1 && body?.title){
        ExpenseModel
        .findByIdAndUpdate(id,{...body})
        .then((result) => {
            console.log("Updated succesfully to the db: "+id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in updateUserExpense: "+err);
            res.status(500).send(err);
        });
    }
    else{
        res.send("Not yet working");
    }
};


module.exports.deleteUserExpense = async (req,res) => {
    const {id} = req.params;

    ExpenseModel
        .findByIdAndDelete(id)
        .then((result) => {
            console.log("Deleted succesfully from the db: "+id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in deleteUserExpense:"+err);
            res.status(500).send(err);
        })
};