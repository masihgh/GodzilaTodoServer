const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    github: {
        type: String,
        required: true,
        unique: true,
    },
    linkedin: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: 'en',
    },
    avatar: {
        type: String,
        required: true,
    },
    skills: {
        type: Array,
        required: true,
        default: [],
    },
    is_admin: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model("Member", MemberSchema);
