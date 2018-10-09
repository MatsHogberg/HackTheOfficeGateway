'use strict';

var cacheService = require("../controllers/cacheController.js"); 

function postData(device, value){

    return cacheService.pushData(device, value);
}
function addDataToCache(device, value){
    var cacheSize = cacheService.addData(device, value);
    if(!cacheSize){
        console.log("Cache is full. Send it away.");
        return false;
    }else{
        var full = cacheService.isFull;
        console.log("Entry with id " + device + " and value " + value + " successfully added to cache. Cache size is " + cacheSize + " and is full = " + full +".");
        return true;
    }
}
function errorResponse(missingParameterName, res){
    res.status(500).json({message:"Parameter " + missingParameterName + " is missing."});
}
exports.handleUpdateQuery = function(req, res){
    if(!req.query.deviceId && !req.params.value){
        errorResponse("deviceId and value", res);
        return;
    }
    if(!req.query.deviceId){
        errorResponse("deviceId", res);
        return;
    }
    if(!req.query.value){
        errorResponse("value", res);
        return;
    }
    var deviceId = req.query.deviceId;
    var value = req.query.value;

    var bypassCache = req.query.pushthru && req.query.pushthru == "true";
    if(!bypassCache){
        var status = addDataToCache(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error adding data to cache"});
        }else{
            res.json({message:"OK - Add to cache"});
        }
    }else{
        var status = postData(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error posting to IoT Hub"});
        }else{
            res.json({message:"OK - Pushthru"});
        }
    }
}
exports.handleUpdate = function(req, res){
    if(!req.params.deviceId && !req.params.value){
        errorResponse("deviceId and value", res);
        return;
    }
    if(!req.params.deviceId){
        errorResponse("deviceId", res);
        return;
    }
    if(!req.params.value){
        errorResponse("value", res);
        return;
    }
    var deviceId = req.params.deviceId;
    var value = req.params.value;
    var bypassCache = req.params.pushthru && req.params.pushthru == "true";
    if(!bypassCache){
        var status = addDataToCache(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error adding data to cache"});
        }else{
            res.json({message:"OK - Add to cache"});
        }
    }else{
        var status = postData(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error posting to IoT Hub"});
        }else{
            res.json({message:"OK - Pushthru"});
        }
    }
}
