const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const ConnectionModel = require('../models/ConnectionModel')

//getExpenses
//getExpennseById
//getAllUserExpenses

module.exports.getConnections = async (req, res) => {
    try {
        const connections = await ConnectionModel.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user1Id',
                    foreignField: '_id',
                    as: 'user1',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2Id',
                    foreignField: '_id',
                    as: 'user2',
                },
            },
            {
                $unwind: '$user1',
            },
            {
                $unwind: '$user2',
            },
            {
                $project: {
                    user1: { password: 0 },
                    user2: { password: 0 },
                },
            },
        ])
        console.log('-----getConnections succesful')
        res.send(connections)
    } catch (error) {
        console.log('Exception in getConnections: ' + error)
        res.status(500).send(error)
    }
}

module.exports.getConnectionById = async (req, res) => {
    const { id } = req.params
    console.log(req.params, id)
    try {
        const connection = await ConnectionModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user1Id',
                    foreignField: '_id',
                    as: 'user1',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2Id',
                    foreignField: '_id',
                    as: 'user2',
                },
            },
            {
                $unwind: '$user1',
            },
            {
                $unwind: '$user2',
            },
            {
                $project: {
                    user1: { password: 0 },
                    user2: { password: 0 },
                },
            },
        ])
        console.log(connection)
        res.send(connection)
    } catch (error) {
        console.log('Exception in getConnectionById: ' + error)
        res.status(500).send(error)
    }
}

module.exports.getAllUserConnections = async (req, res) => {
    const id = req.params.id
    console.log(req.params)
    try {
        const userConnections = await ConnectionModel.aggregate([
            {
                $match: {
                    $or: [
                        { user1Id: new ObjectId(id) },
                        { user2Id: new ObjectId(id) },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user1Id',
                    foreignField: '_id',
                    as: 'user1',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2Id',
                    foreignField: '_id',
                    as: 'user2',
                },
            },
            {
                $unwind: '$user1',
            },
            {
                $unwind: '$user2',
            },
            {
                $project: {
                    user1: { password: 0 },
                    user2: { password: 0 },
                },
            },
        ])
        res.send(userConnections)
    } catch (error) {
        console.log('Exception in getAllUserConnections: ' + error)
        res.status(500).send(error)
    }
}

module.exports.getAllUserIndividualConnections = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
        const userConnections = await ConnectionModel.aggregate([
            {
                $match: {
                    $and: [
                        {
                            $or: [
                                { user1Id: new ObjectId(id) },
                                { user2Id: new ObjectId(id) },
                            ],
                        },
                        {
                            connectionType: 'single',
                        },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user1Id',
                    foreignField: '_id',
                    as: 'user1',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2Id',
                    foreignField: '_id',
                    as: 'user2',
                },
            },
            {
                $unwind: '$user1',
            },
            {
                $unwind: '$user2',
            },
            {
                $project: {
                    user1: { password: 0 },
                    user2: { password: 0 },
                },
            },
        ])
        res.send(userConnections)
    } catch (error) {
        console.log('Exception in getAllUserIndividualConnections: ' + error)
        res.status(500).send(error)
    }
}

//TESTING
module.exports.getAllUserGroupConnections = async (req, res) => {
    try {
        const { id } = req.params
        // const {_id, ...body} = req.body;
        const userConnections = await ConnectionModel.aggregate([
            {
                $match: {
                    user1Id: new ObjectId(id),
                    connectionType: 'group',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user1Id',
                    foreignField: '_id',
                    as: 'user1',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user2Id',
                    foreignField: '_id',
                    as: 'user2',
                },
            },
            {
                $unwind: '$user1',
            },
            {
                $unwind: '$user2',
            },
            {
                $project: {
                    user1: { password: 0 },
                    user2: { password: 0 },
                },
            },
        ])
        res.send(userConnections)
    } catch (error) {
        console.log('Exception in getAllUserIndividualConnections: ' + error)
        res.status(500).send(error)
    }
}

module.exports.saveUserConnection = async (req, res) => {
    console.log(req.body)
    await ConnectionModel.create({ ...req.body })
        .then((result) => {
            console.log('Saved succesfully to the db:')
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.log('Exception in saveUserConnection:' + err)
            res.send(err)
        })
}

module.exports.updateUserConnection = async (req, res) => {
    const { id } = req.params
    const data = req.body

    ConnectionModel.findByIdAndUpdate(id, { ...data })
        .then((result) => {
            console.log('Updated succesfully to the db: ' + result)
            res.send(result)
        })
        .catch((err) => {
            console.log('Exception in updateUserExpense: ' + err)
            res.send(err)
        })
}

module.exports.deleteUserConnection = async (req, res) => {
    const { id } = req.params

    ConnectionModel.findByIdAndDelete(id)
        .then((result) => {
            console.log('Deleted succesfully from the db: ' + result)
            res.send(result)
        })
        .catch((err) => {
            console.log('Exception in deleteUserConnection:' + err)
            res.send(err)
        })
}
