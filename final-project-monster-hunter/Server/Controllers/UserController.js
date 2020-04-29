'use strict'
require('../Configuration/passportConfig');
const userServices=require('../Services/userServices'),
    bcrypt=require('bcrypt'),
    HashMap=require('hashmap'),
    passport=require('passport');
    // mongoose=require('mongoose');
    // let User=mongoose.model('Users');
    // passport.use(new LocalStrategy(
    //   function(username, password, done) {
    //     User.findOne({ email: username }, function(err, user) {
    //       if (err) { return done(err); }
    //       if (!user) {
    //         return done(null, false, { message: 'Incorrect username.' });
    //       }
    //       if (!user.verifyPassword(password)) {
    //         return done(null, false, { message: 'Incorrect password.' });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // ));

let map=new HashMap();
let arr={};
// arr=map.values();

// get a single user by id
exports.getUser=function(request,response){
        const resolve=(list)=>{
            response.status(200);
            response.json(list);
        }
        // console.log(request.params.id);
        userServices.getUser(request.params.id).then(resolve).catch(renderErrorResponse(response));
    };

/**
 *signUp function 
 *if signUp success return token to client
 * @param {*} request
 * @param {*} response
 * 
 */
exports.signUp=function(request,response){
    let newUser={};
    newUser.email=request.body.email;
    newUser.username=request.body.fullName;
    // newUser.password=request.body.password;
    newUser.firstName=request.body.firstName;
    newUser.lastName=request.body.lastName;
    // check if the password equals confirmPassword
    let password=request.body.password,
        confirmPassword=request.body.confirmPassword;
    if(password!==confirmPassword){
        response.status(422).json({message:'the two password must be the same!'});
        return;
    }
    
    // encode the password
    newUser.password=bcrypt.hashSync(password, 10);
    // return token to user

    const resolve=(user)=>{
        response.status(201);
        response.json({'token': user.generateJwt()});
    }
    let errorHandle=(response)=>{
        const errorCallback=(error)=>{
            if(error===11000){
                response.status(400);
                response.send(error.message);
            }else{
                response.status(500);
                response.json({
                    message: error.message
                });
            }
        }
        return errorCallback;
    };
    userServices.signUp(newUser)
    .then(resolve)
    .catch(errorHandle(response));
}
/**
 *use login
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.login=function(request,response,next){

    // console.log(request.body);

    passport.authenticate('local',function(err, user, info) {
        // 如果这个函数被调用了，说明认证成功。
        // `req.user` 包含已认证的用户
        if(err)return response.status(400).json(err);
        else if(user){
            // response.redirect()
            return response.status(200).json({"token":user.generateJwt()});
            
        }
        else return response.status(404).json(info);
        
    })(request, response, next);
}

exports.signOut = (req, res) => {
    res.json({
      message:'Sign out successful!'
    })
  }
      /**
       * 
       * @param {*} req,res
       */
exports.userInfo=(req,res)=>{

      const resolve=(user)=>{
          res.status(200);
          res.json(user);
      }
      userServices.getUser(req.params.id)
      .then(resolve)
      .catch(renderErrorResponse(res));
  }
/**
 *
 *update user info
 * @param {*} req
 * @param {*} res
 */
exports.userUpdate=(req,res)=>{
    let updateUser=req.body;
    let id=req._id;
    const resolve=(user)=>{
        res.status(200);
        res.json({"token":user.generateJwt(),"msg":'ok'});
    }

    userServices.updateProfile(id,updateUser)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *
 * Thumb up this video
 * @param {*} req
 * @param {*} res
 */
exports.like=(req,res)=>{
    // let videoId=req.body;
    let userId=req._id;
    const resolver=(user)=>{
        res.status(200);
        res.json({"msg":'successful'});
    }

    userServices.addLike(userId,req.body)
    .then(resolver)
    .catch(renderErrorResponse(res));
}
/**
 * Thumb down this video
 *
 * @param {*} req
 * @param {*} res
 */
exports.unLike=(req,res)=>{
    let videoId=req.body;
    let userId=req._id;
    const resolve=(user)=>{
        res.status(200);
        res.json({"msg":'successful'});
    }
    userServices.unLike(userId,videoId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * cancel thumb up 
 *
 * @param {*} req
 * @param {*} res
 */
exports.cancelLike=(req,res)=>{
    
    // let videoId=req.body;
    let userId=req._id;
    const resolve=()=>{
        res.status(200).json({"msg":'successful'});
    }
    userServices.cancelLike(userId,req.body)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *cancel Thumb down
 *
 * @param {*} req
 * @param {*} res
 */
exports.cancelUnLike=(req,res)=>{
    
    let videoId=req.body;
    let userId=req._id;
    const resolve=()=>{
        res.status(200).json({"msg":'successful'});
    }
    userServices.cancelUnLike(userId,videoId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * add this video to your favorite folder
 *
 * @param {*} req
 * @param {*} res
 */
exports.favorite=(req,res)=>{
    let videoId=req.body;
    let userId=req._id;
    const resolve=()=>{
        res.status(200);
        res.json({"msg":'successful'});
    }
    userServices.addFavorite(userId,videoId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * remove the video from your favorite folder
 *
 * @param {*} req
 * @param {*} res
 */
exports.unFavorite=(req,res)=>{
    let videoId=req.body;
    let userId=req._id;
    const resolve=()=>{
        res.status(200).json({"msg":'successful'});
    }
    userServices.unFavorite(userId,videoId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *subscribe a user
 *
 * @param {*} req
 * @param {*} res
 */
exports.subscribe=(req,res)=>{
    let authorId=req.body;
    let userId=req._id;
    const resolve=()=>{
        res.status(200).json({"msg":'successful'});
    }
    userServices.subscribe(userId,authorId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * 
 * unsubscribe a user
 * @param {*} req
 * @param {*} res
 */
exports.unSubscribe=(req,res)=>{
    let authorId=req.body;
    let userId=req._id;
    // console.log(req.body);
    // console.log('userId ' + userId);
    const resolve=()=>{
        res.status(200).json({"msg":'successful'});
    }
    userServices.unSubscribe(userId,authorId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
// /**
//  *get the watch history of this user
//  *
//  * @param {*} req
//  * @param {*} res
//  */
// exports.getHistory=(req,res)=>{
//     let userId=req.param.id;
//     const resolve=(list)=>{
//         res.status(200).json(list);
//     }
//     userServices.getHistory(req.param.id)
//     .then(resolve)
//     .catch(renderErrorResponse(response));
//     // let map=
// }

/**
 * update the watch history of this user
 *
 * @param {*} req
 * @param {*} res
 */
exports.updateHistory=(req,res)=>{
    let userId=req._id;
    let videoId=req.body;
    const resolve=(video)=>{
        res.status(200).json(video);
    }
    userServices.updateHistory(userId,videoId)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
   let renderErrorResponse = (response) => {
       const errorCallback = (error) => {
           if (error) {
               response.status(500);
               response.json({
                   message: error.message
               });
           }
       };
       return errorCallback;
   };
