'use strict';

var cacheService = require("../services/cacheService.js"); 

function postData(sensor, value){

    return cacheService.pushData(sensor, value);
}

function setCacheSize(value){
    cacheService.setCacheSize(value);
}

function addDataToCache(sensor, value){
    var cacheSize = cacheService.addData(sensor, value);
    if(!cacheSize){
        console.log("Cache is full. Send it away.");
        return false;
    }else{
        var full = cacheService.isFull;
        console.log("Entry with sensor id " + sensor + " and value " + value + " successfully added to cache. Cache size is " + cacheSize + " and is full = " + full +".");
        return true;
    }
}
function errorResponse(missingParameterName, res){
    res.status(500).json({message:"Parameter " + missingParameterName + " is missing."});
}

function handleNewData(sensor,value,pushthru,res){
    if(!sensor && !value){
        errorResponse("sensorId and value", res);
        return;
    }
    if(!sensor){
        errorResponse("sensorId", res);
        return;
    }
    if(!value){
        errorResponse("value", res);
        return;
    }
    if(!pushthru){
        var status = addDataToCache(sensor, value);
        if(!status){
            res.status(500).json({message:"Error adding data to cache"});
        }else{
            res.json({message:"OK - Add to cache"});
        }
    }else{
        var status = postData(sensor, value);
        if(!status){
            res.status(500).json({message:"Error posting to IoT Hub"});
        }else{
            res.json({message:"OK - Pushthru"});
        }
    }
}

/**
 * Flush the cache
 */
exports.flushCache = function(){
    cacheService.flushCache();
}

/**
 * Handles change cache size requests
 */
 exports.handleCacheSize = function(req, res){
     var newCacheSize = req.params.size;
     if(isNaN(newCacheSize)){
        errorResponse("size", res);
        return;
     }
     cacheService.setCacheSize(parseInt(newCacheSize));
 }
/**
 * Handles data posted as x-www-form-urlencoded
 * @param {*} req 
 * @param {*} res 
 */
exports.handleUpdatePost = function(req,res){
    var sensorId = req.body.sensorid;
    var value = req.body.value;
    var bypassCache = req.body.pushthru && req.body.pushthru=="true";
    handleNewData(sensorId,value,bypassCache,res);
}

/**
 * Handle get requests with parameters, like
 * http://url:port?sensorid=1&value=2&pushthru=true
 * @param {*} req 
 * @param {*} res 
 */
exports.handleUpdateQuery = function(req, res){
    var sensorId = req.query.sensorid;
    var value = req.query.value;
    var bypassCache = req.query.pushthru && req.query.pushthru=="true";
    handleNewData(sensorId,value,bypassCache,res);
}

/**
 * Handles get requests like
 * http://url:port/1/2/true
 * @param {*} req 
 * @param {*} res 
 */
exports.handleUpdate = function(req, res){
    var sensorId = req.params.sensorid;
    var value = req.params.value;
    var bypassCache = req.params.pushthru &&  req.params.pushthru == "true";
    handleNewData(sensorId,value,bypassCache,res);
}
