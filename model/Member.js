const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name not provided"],
        unique: [true, "another user have this name, name is unique"]
    },
    github: {
        type: String,
        required: [true, "github url not provided"],
        unique: [true, "another user have this github, github is unique"]
    },
    linkedin: {
        type: String,
        required: [true, "linkedin url not provided"],
        unique: [true, "another user have this linkedin, linkedin is unique"]
    },
    age: {
        type: Number,
        required: [true, "age not provided"],
    },
    language: {
        type: String,
        required: [true, "lang not provided"],
        default: 'en',
    },
    avatar: {
        type: String,
        required: [true, "avatar not provided"],
    },
    skills: {
        type: Array,
        required: [true, "skills not provided"],
        default: [],
    },
    is_admin: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model("Member", MemberSchema);
