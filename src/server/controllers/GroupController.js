const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const GroupModel = require("../models/GroupModel");


module.exports.getGroups = async (req,res) => {
    const groups = await GroupModel.find().populate('userList',['name','email','phone']);
    res.send(groups);
};


module.exports.getGroupById = async (req,res) => {
    const {id } = req.params;
    const group = await GroupModel.findById(id).populate('userList',['name','email','phone']);
    res.send(group);
};


module.exports.getGroupByUserId = async (req,res) => {
    const {id } = req.params;
    console.log("Initiating method getGroupByUserId for id: ",id);
    try{
        const group = await GroupModel.find({
            userList:new ObjectId(id)
        }).populate('userList',['name','email','phone']);
        res.send(group);
        console.log("-----getGroupByUserId succesful");
    }catch(error){
        console.log("Exception in getGroupByUserId: "+error);
        res.status(500).send(error);
    }
};

module.exports.saveGroup = async(req,res) => {
    console.log("Body:");
    console.log({...req.body});
    //TODO: add userList _id validation
    await GroupModel.create(req.body).then((result) => {
        console.log("Saved succesfully to the db:");
        // console.log(result);
        res.send(result);
    })
    .catch((err)=>{
        console.log("Exception in saveUserConnection:");
        console.log(err);
        res.status(500).send(err.message);
    })
};


module.exports.updateGroup = async(req,res) => {
    const {id }= req.params;
    const data = req.body;

    console.log("id", id);
    console.log("body", data);
    
    GroupModel
        .findByIdAndUpdate(id,data, {new: true})
        .then((result) => {
            console.log("Updated succesfully to the db: "+id);
            console.log(result);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in updateGroup: "+err);
            res.status(500).send(err);
        })
};


module.exports.deleteGroup = async (req,res) => {
    const {id} = req.params;

    GroupModel
        .findByIdAndDelete(id)
        .then((result) => {
            console.log("Deleted succesfully from the db: "+id);
            console.log(result);
            res.send({"deleted object":result});
        })
        .catch((err)=>{
            console.log("Exception in deleteGroup:"+err);
            res.status(500).send(err);
        })
};