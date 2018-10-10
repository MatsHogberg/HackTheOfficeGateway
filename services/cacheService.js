'use strict';
var iotService = require("./iotClientService.js");

var maxNumberOfItemsInList = 10;
var c = [];

/**
 * Creates a Json object and adds time stamp
 * @param {*} d 
 * @param {*} v 
 */
function createJson(d,v){
    return {Id:d,Value:v,TimeStamp: new Date().toString()};
}
/**
 * Adds data to the cache and sends it away if full.
 * @param {*} d 
 * @param {*} v 
 */
exports.addData =  function(d,v){
    if(c.length < maxNumberOfItemsInList){
        var data=createJson(d,v);
        c.push(data);
        if(c.length == maxNumberOfItemsInList){
            var result = iotService.send(c);
            c.length = 0;
        }
        return c.length;
    }
    else{
        return false;
    }
}

/**
 * Sends data directly to the IoT hub,
 * bypassing the caching
 * @param {*} d 
 * @param {*} v 
 */
exports.pushData = function(d,v){
    var tempArray = [];
    tempArray.push(createJson(d,v));
    var result = iotService.send(tempArray);
    console.log("Data sent to hub");
    return true;
}
exports.l = function(){
    return c.length;
}
exports.allData = c;

exports.clear = function(){
    c.length = 0;
}
exports.isFull = c.length == maxNumberOfItemsInList;
