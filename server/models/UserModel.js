const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        totalOwes: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.models['Users'] || mongoose.model('Users', UserSchema)
