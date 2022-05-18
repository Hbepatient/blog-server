const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 创建User集合模板
const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

// 创建User集合
const User = mongoose.model('user', UserSchema);

module.exports = User;