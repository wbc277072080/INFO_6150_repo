'use strict'
const mongoose=require('mongoose');
const Videos=mongoose.model('Videos');
const userServices=require('./Userservices');
/**
 *list all videos
 *
 * @param {*} params
 * @returns
 */
exports.search=(params)=>{
    const promise=Videos.find(params).exec();
    return promise;
}
/**
 * find the specific video
 *
 * @param {*} id
 * @returns
 */
exports.getVideo=(id)=>{
    
    const promise=Videos.findById(id).exec();
    return promise;
}
/**
 * remove video
 *
 * @param {*} id
 * @returns
 */
exports.deleteVideo=(id)=>{
    
    const promise=Videos.remove({_id:id});
    return promise;
}
/**
 *upload video
 *
 * @param {*} authorId
 * @param {*} newVideo
 * @returns
 */
exports.uploadVideo=(authorId,newVideo)=>{
    
    const promise=Videos.create(newVideo).then((newVideo)=>{
        userServices.uploadVideo(newVideo,authorId);
    });

    return promise;
}
/**
 * update the video
 *
 * @param {*} videoId
 * @param {*} update
 * @returns
 */
exports.updateVideo=(videoId,update)=>{
    const promise=Videos.findByIdAndUpdate(videoId,update).exec();
    return promise;
}