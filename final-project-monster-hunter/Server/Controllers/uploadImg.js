'use strict'
const mongoose = require('mongoose');
const fs = require('fs');
exports.uploadPic=(req,res)=>{
    const formidable = require("formidable")
    const form = new formidable.IncomingForm()
    form.uploadDir =  './img';
    form.keepExtensions = true; 
    form.parse(req,function(err,fields,file){
        var filePath = '';
        if(file.tmpFile){
            filePath = file.tmpFile.path;
        } else {
            for(var key in file){
                if( file[key].path && filePath==='' ){
                    filePath = file[key].path;
                    break;
                }
            }
        }
        try{         
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));
            const targetPath="./img/"+req._id+fileExt
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                res.status(400);
                res.json("");
                return
            }
            // console.log(targetPath)
            fs.rename(filePath,targetPath,function(err){
                if(err){
                    res.status("400")
                    res.json()
                    return
                }
            })
            res.status("200")
            res.json()
            return
            
        }
        catch(err){
            // console.error(err)
            res.status(500)
            res.json("intern error")
        }
    })
}

