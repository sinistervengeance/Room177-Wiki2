const { Schema } = require("mongoose");

const mongoose = require('mongoose');
const Modified = new mongoose.Schema({
    User: String,
    DateMod: Date,

})
const WikiPage = new mongoose.Schema({
    DateCreated: Date,
    CreatedBy: String,
    Modified: [Modified],
    Title: String,
    Content: String,
    IsDeleted: Boolean
})
const Category = new mongoose.Schema({
    name: String,
    Wikis: [WikiPage]
})



module.exports = mongoose.model('Wiki',Category)