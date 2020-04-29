'use strict';
const userRoute=require('./Users-route');
const videoRoute=require('./Videos-route');
module.exports=(app)=>{
    userRoute(app);
    videoRoute(app);
}