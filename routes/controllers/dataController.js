'use strict';

var cacheService = require("../controllers/cacheController.js"); 

function postData(device, value){

    return true;
}
function addDataToCache(device, value){
    var cacheSize = cacheService.addData(device, value);
    console.log("Entry with id " + device + " and value " + value + " successfully added to cache. Cache size is " + cacheSize + ".");

    return true;
}
exports.handleUpdate = function(req, res){
    var deviceId = req.params.deviceId;
    var value = req.params.value;
    var bypassCache = req.params.pushthru && req.params.pushthru == "true";
    if(!bypassCache){
        var status = addDataToCache(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error adding data to cache"});
        }else{
            res.json({message:"OK"});
        }
    }else{
        var status = postData(deviceId, value);
        if(!status){
            res.status(500).json({message:"Error posting to IoT Hub"});
        }else{
            res.json({message:"OK"});
        }
    }
}
