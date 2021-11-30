const { Schema } = require("mongoose");

const mongoose = require('mongoose');
const Metadata = new mongoose.Schema({
    WikiID: String,
    Category: String,
    SubCategory: String,
    DateCreated: Date,
    CreatedBy: String,
    Modified: {}
})
const WikiPage = new mongoose.Schema({
    Metadata: [Metadata],
    Title: String,
    Content: String,
    IsDeleted: Boolean
})

module.exports = mongoose.model('WikiPage',WikiPage)