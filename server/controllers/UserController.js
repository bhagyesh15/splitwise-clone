var UserModel = require('../models/UserModel')

//doLogin
//doRegister

//getUsers
//getuser
//createUser
//updateUser
//deleteUser

module.exports.doLogin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const users = await UserModel.find({
            email: email,
        })

        if (users == null || users.length == 0) {
            res.status(404).send({
                message: 'No such user available',
            })
            return
        }
        const user = users[0]
        if (user.password === password) {
            console.log('doLogin succesful')
            res.send(user)
            return
        } else {
            res.status(404).send({
                message: 'Please enter correct credentials',
            })
            return
        }
    } catch (error) {
        console.log('Exception in getUser: ' + error)
        res.status(500).send(error)
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
        console.log('-----getUser succesful')
        res.send(users)
    } catch (error) {
        console.log('Exception in getUsers: ' + error)
        res.status(500).send(error)
    }
}

module.exports.getUser = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
        const user = await UserModel.findById(id)
        console.log('-----getUser succesful')
        res.send(user)
    } catch (error) {
        console.log('Exception in getUser: ' + error)
        res.status(500).send(error)
    }
}

//register
module.exports.createUser = async (req, res) => {
    const { name, password, email, phone } = req.body
    console.log(req.body)
    try {
        const userCheck = await UserModel.find({
            email: email,
        })
        if (userCheck.length > 0) {
            res.status(400).send({
                message: 'User already exists',
            })
            return
        }
        const users = await UserModel.create({ name, password, email, phone })
        console.log('-----createUser succesful')
        res.send(users)
    } catch (error) {
        console.log('Exception in createUser: ' + error)
        res.status(500).send(error)
    }
}

module.exports.updateUser = async (req, res) => {
    const { id } = req.params
    const { name, password, email, phone } = req.body
    console.log(req.params)
    console.log(req.body)
    try {
        const user = await UserModel.findByIdAndUpdate(id, {
            name,
            password,
            email,
            phone,
        })
        console.log('-----updateUser succesful')
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log('Exception in updateUser: ' + error)
        res.status(500).send(error)
    }
}
//returns before update object

module.exports.deleteUser = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
        const user = await UserModel.findByIdAndDelete(id)
        console.log('-----deleteUser succesful')
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log('Exception in deleteUser: ' + error)
        res.status(500).send(error)
    }
}
