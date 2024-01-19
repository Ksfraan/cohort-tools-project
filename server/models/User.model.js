const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
});

module.exports = model('User', userSchema);
