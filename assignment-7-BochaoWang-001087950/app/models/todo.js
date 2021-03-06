'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for todo object.
 */
let TodoSchema = new Schema({
    indexId: {
        type: Number,
        required: "indexId is missing"
    },
    title: {
        type: String,
        required: "title is missing"
    },
    description: {
        type: String,
        required: "description is missing"
    },
    createdDate: {
        type: Date,
        default: function(){
            return Date.now();
        }
    },
    modifiedDate: {
        type: Date,
        default: function(){
            return Date.now();
        }
    }
},
{
    versionKey: false
});
// Duplicate the id field as mongoose returns _id field instead of id.
TodoSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TodoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('todo', TodoSchema);