var UserModel = require("../models/UserModel");


//getUsers
//getuser
//createUser
//updateUser
//deleteUser

module.exports.getUsers = async (req,res) => {
    try{
        const users = await UserModel.find();
        console.log("-----getUser succesful");
        res.send(users);
    } catch(error){
        console.log("Exception in getUsers: "+error);
        res.status(500).send(error);
    }
};

module.exports.getUser = async (req,res) => {
    const {id} = req.params;
    console.log(req.params);
    try{
        const user = await UserModel.findById(id);
        console.log("-----getUser succesful");
        res.send(user);
     }catch(error){
        console.log("Exception in getUser: "+error);
        res.status(500).send(error);
    }
};

module.exports.createUser = async (req,res) => {
    const {name, password, email, phone} = req.body;
    console.log(req.body);
    try{
        const users = await UserModel.create({ name, password, email, phone});
        console.log("-----createUser succesful");
        res.send(users);
    } catch(error){
        console.log("Exception in createUser: "+error);
        res.status(500).send(error);
    }
};

module.exports.updateUser = async (req,res) => {
    const {id} = req.params;
    const {name, password, email, phone} = req.body;
    console.log(req.params);
    console.log(req.body);
    try {
        const user = await UserModel.findByIdAndUpdate(id, { name, password, email, phone});
        console.log("-----updateUser succesful");
        console.log(user);
        res.send(user);
    } catch (error) {
        console.log("Exception in updateUser: "+error);
        res.status(500).send(error);
    }
};
//returns before update object

module.exports.deleteUser = async (req,res) => {
    const {id} = req.params;
    console.log(req.params);
    try {
        const user = await UserModel.findByIdAndDelete(id);
        console.log("-----deleteUser succesful");
        console.log(user);
        res.send(user);
    } catch (error) {
        console.log("Exception in deleteUser: "+error);
        res.status(500).send(error);
    }
};
