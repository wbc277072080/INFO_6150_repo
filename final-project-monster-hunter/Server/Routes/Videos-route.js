'use strict'
const videoController=require('../Controllers/VideoController'),
    jwt=require('../Configuration/jwt'),
    userController=require('../Controllers/UserController');
module.exports=(app)=>{
    app.route('/videos')
    .get(videoController.list);
    app.route('/videos/findByTag/:id')
    .get(videoController.findByTag);
    app.route('/videos/:id')
    .get(videoController.getVideo)
    .delete(videoController.deleteVideo)
    .put(videoController.updateVideo);
    app.route('/videos/auth/:id')
    .get(userController.getUser);
    app.route('/videos/find/:id')
    .get(videoController.findbyauth);
    app.route('/videos/upload')
    .post(jwt.verifyJwtToken,videoController.uploadVideo);
}