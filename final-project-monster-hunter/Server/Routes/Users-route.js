'use strict'
const userController=require('../Controllers/UserController'),
    // videoController=require('../Controllers/VideoController'),
    upload=require('../Controllers/uploadImg'),
    jwt=require('../Configuration/jwt');

module.exports=(app)=>{
    app.route('/auth/sign-up')
    .post(userController.signUp);
    app.route('/auth/login')
    .post(userController.login);
    app.route('/auth/sign-out')
    .post(userController.signOut);

    app.route('/users/:id')
    .get(userController.getUser);
    app.route('/users/update')
    .put(jwt.verifyJwtToken,userController.userUpdate);
    app.route('/users/like')
    .post(jwt.verifyJwtToken,userController.like);
    app.route('/users/cancelLike')
    .post(jwt.verifyJwtToken,userController.cancelLike);
    app.route('/users/unlike')
    .post(jwt.verifyJwtToken,userController.unLike);
    app.route('/users/cancelUnlike')
    .post(jwt.verifyJwtToken,userController.cancelUnLike);
    app.route('/users/setFavorite')
    .post(jwt.verifyJwtToken,userController.favorite);
    app.route('/users/unFavorite')
    .post(jwt.verifyJwtToken,userController.unFavorite);
    app.route('/users/subscribe')
    .post(jwt.verifyJwtToken,userController.subscribe);
    app.route('/users/unSubscribe')
    .post(jwt.verifyJwtToken,userController.unSubscribe);
    app.route('/users/updateHistory')
    .post(jwt.verifyJwtToken,userController.updateHistory);
    app.route('/users/uploadImg')
    .post(jwt.verifyJwtToken,upload.uploadPic);
}