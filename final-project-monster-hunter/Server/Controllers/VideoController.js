'use strict'
const videoServices=require('../Services/Videoservices');

/**
 * list all the videos of this database
 *
 * @param {*} req
 * @param {*} res
 */
exports.list=(req,res)=>{
    
    const resolve=(list)=>{
        res.status(200).json(list);
    }
    videoServices.search({})
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *get the specific video
 *
 * @param {*} req
 * @param {*} res
 */
exports.getVideo=(req,res)=>{
    let id=req.params.id;
    const resolve=(video)=>{
        res.status(200).json(video);
    }
    videoServices.getVideo(id)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 * delete a video 
 *
 * @param {*} req
 * @param {*} res
 */
exports.deleteVideo=(req,res)=>{
    
    let id=req.params.id;
    const resolve=()=>{
        res.status(200).json({"msg":'delete successfully'});
    }
    videoServices.deleteVideo(id)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *upload a new video
 *
 * @param {*} req
 * @param {*} res
 */
exports.uploadVideo=(req,res)=>{
    let authorId=req._id;
    let newVideo=Object.assign({},req.body);

    const resolve=(video)=>{
        res.status(200).json(video);
    }

    videoServices.uploadVideo(authorId,newVideo)
    .then(resolve)
    .catch(renderErrorResponse(res));
}
/**
 *update a video
 *
 * @param {*} req
 * @param {*} res
 */
exports.updateVideo=(req,res)=>{
    
    let update=Object.assign({},req.body);

    const resolve=(video)=>{
        res.status(200).json(video);
    }
    videoServices.updateVideo(req.params.id,update)
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
  /**
 *
 *
 * @param {*} request
 * @param {*} response
 */
exports.findbyauth=(request,response)=>{
    console.log(`{"auth":"${request.params.id}"}`)
    const resolve = (list) => {        
        response.status(200);
        response.json(list);
    };
    videoServices.search({auth:request.params.id})
        .then(resolve)
        .catch(renderErrorResponse(response));

}
/**
 * list all the video which have the specific tag name
 *
 * @param {*} req
 * @param {*} res
 */
exports.findByTag=(req,res)=>{
    
    const resolve=(list)=>{
        res.status(200);
        res.json(list);
    }
    videoServices.search({tag:req.params.id})
    .then(resolve)
    .catch(renderErrorResponse(res));
}
