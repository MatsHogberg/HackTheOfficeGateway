'use strict';

var cacheService = require("../services/cacheService.js"); 

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

function handleNewData(device,value,pushthru,res){
    if(!device && !value){
        errorResponse("deviceId and value", res);
        return;
    }
    if(!device){
        errorResponse("deviceId", res);
        return;
    }
    if(!value){
        errorResponse("value", res);
        return;
    }
    if(!pushthru){
        var status = addDataToCache(device, value);
        if(!status){
            res.status(500).json({message:"Error adding data to cache"});
        }else{
            res.json({message:"OK - Add to cache"});
        }
    }else{
        var status = postData(device, value);
        if(!status){
            res.status(500).json({message:"Error posting to IoT Hub"});
        }else{
            res.json({message:"OK - Pushthru"});
        }
    }
}

exports.handleUpdateQuery = function(req, res){
    var deviceId = req.query.deviceId;
    var value = req.query.value;
    var bypassCache = req.query.pushthru && req.query.pushthru=="true";
    handleNewData(deviceId,value,bypassCache,res);
}

exports.handleUpdate = function(req, res){
    var deviceId = req.params.deviceId;
    var value = req.params.value;
    var bypassCache = req.params.pushthru &&  req.params.pushthru == "true";
    handleNewData(deviceId,value,bypassCache,res);
}
