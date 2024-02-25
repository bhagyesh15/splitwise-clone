const SplitwiseModel = require('../models/SplitwiseModel');

module.exports.getSplitwise = async (req,res) => {
    const split = await SplitwiseModel.find();
    res.send(split);
};

module.exports.saveSplitwise = async (req,res) => {
    const {text} = req.body

    SplitwiseModel
        .create({text})
        .then((result) => {
            console.log("Saved succesfully to the db:"+ result.body.toString());
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in saveSplitwise:"+err);
            res.send(err);
        })

    // const split = await SplitwiseModel.create({
    //     text:"test_11:56PM"
    // });
    // res.send(split); as we do not have any response?
};


module.exports.updateSplitwise = async (req,res) => {
    const {_id,text} = req.body

    SplitwiseModel
        .findByIdAndUpdate(_id,{text})
        .then((result) => {
            console.log("Updated succesfully to the db: "+_id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in updateSplitwise: "+err);
            res.send(err);
        })
};


module.exports.deleteSplitwise = async (req,res) => {
    const {_id} = req.body

    SplitwiseModel
        .findByIdAndDelete(_id)
        .then((result) => {
            console.log("Deleted succesfully from the db: "+_id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in deleteSplitwise:"+err);
            res.send(err);
        })
};

//////////////////////////////////////////////////////////////////////////////////

//UserSchema

module.exports.getUser = async (req,res) => {
    const user = await SplitwiseModel.find();
    res.send(user);
};

module.exports.saveSplitwise = async (req,res) => {
    const {text} = req.body

    SplitwiseModel
        .create({text})
        .then((result) => {
            console.log("Saved succesfully to the db:"+ result.body.toString());
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in saveSplitwise:"+err);
            res.send(err);
        })

    // const split = await SplitwiseModel.create({
    //     text:"test_11:56PM"
    // });
    // res.send(split); as we do not have any response?
};


module.exports.updateSplitwise = async (req,res) => {
    const {_id,text} = req.body

    SplitwiseModel
        .findByIdAndUpdate(_id,{text})
        .then((result) => {
            console.log("Updated succesfully to the db: "+_id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in updateSplitwise: "+err);
            res.send(err);
        })
};


module.exports.deleteSplitwise = async (req,res) => {
    const {_id} = req.body

    SplitwiseModel
        .findByIdAndDelete(_id)
        .then((result) => {
            console.log("Deleted succesfully from the db: "+_id);
            res.send(result);
        })
        .catch((err)=>{
            console.log("Exception in deleteSplitwise:"+err);
            res.send(err);
        })
};