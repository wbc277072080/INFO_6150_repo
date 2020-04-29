'use strict';
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
/**
 * Mongoose schema for Users object.
 */
const VideoSchema=new Schema({
    tag:{
        type:String
    },
    title:{
        type:String
    },
    url:{
        type:String
    },
    description:{
        type:String
    },
    createDate:{
        type:Date,
        default:new Date()
    },
    auth:{
        type:String
    },
    like:{
        type:Array
    },
    unLike:{
        type:Array
    },
    comments:{
        type:Schema.Types.Mixed
    },
    // url:{
    //     type:String
    // }
});
 // Duplicate the id field as mongoose returns _id field instead of id.
 VideoSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  // Ensure virtual fields are serialised.
  VideoSchema.set('toJSON', {
    virtuals: true
  });
  module.exports=mongoose.model('Videos',VideoSchema);
