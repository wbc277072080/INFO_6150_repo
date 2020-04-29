'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
                jwt = require('jsonwebtoken'),
                bcrypt = require('bcrypt');

/**
 * Mongoose schema for Users object.
 */

 let UserSchema=new Schema({
     username:{
         type:String,
         required:"username is required",
         unique:true
     },
     email:{
         type:String,
         required:"email is required",
         unique: true
     },
     password:{
         type:String,
         required:"password is required",
         minLength:[6,'Password length is not permitted to less than 6']
     },
     bio:{
         type:String
     },
     location:{
         type:String
     },
     sex:{
         type:String,
         enum:['male','female','secrete']
     },
     profileImage:{
        type:String,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    history:[
        {
            type:Schema.Types.ObjectId
        }
    ],
    //The videos this user have
    videos:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    // The videos this user like
    liked:[
        {
        type:Schema.Types.ObjectId,
        ref:'Video'
        }
    ],
    unlike:[
        {
        type:Schema.Types.ObjectId,
        ref:'Video'           
        }
    ],
    // The users this user subscribe
    subscribe:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    // The video this user added to favorite
    favorite:[
        {
            type:Schema.Types.ObjectId,
            ref:'Video'
        }
    ],
    // The fans of this user
    subscribed:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ]
 },{
    versionKey: false
  }
 );
 // Duplicate the id field as mongoose returns _id field instead of id.
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  // Ensure virtual fields are serialised.
  UserSchema.set('toJSON', {
    virtuals: true
  });
// decode the password in database and compare to the input password

  UserSchema.methods.verifyPassword=function(input_password){
    return bcrypt.compareSync(input_password, this.password);
  }
/**
 * this jwt is going to help user no need to login again
 *
 * @returns a token file used to verify the identity 
 */
UserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
      "SECRET#123",
    {
        expiresIn: "1day",
    }
    );
  }

  module.exports=mongoose.model('Users',UserSchema);
