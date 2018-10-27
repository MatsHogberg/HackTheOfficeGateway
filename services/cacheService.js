'use strict';
var iotService = require("./iotClientService.js");
var dateFormat = require("dateformat");
var config = require("./configService.js");
var maxNumberOfItemsInList = config.cacheSize;

var interval = setInterval(function(){
    sendCache();
   },config.timeDelay);

var c = [];
function createJson(d,v){
    var timeStamp = formatDateTime(new Date());
    return {Id:d,Value:v,TimeStamp: timeStamp};
}

function sendCache(){
    if(c.length == 0){
        console.log("Cache is empty");
        return;
    }
    var t = c;
    c.length = 0;
    iotService.send(t);
}

function formatDateTime(dt){
    return dateFormat(dt, "yyyy-mm-dd HH:MM:ss");
}
exports.setCacheSize = function(size){
    maxNumberOfItemsInList = size;
    var currentcacheSize = c.length;
    if(currentcacheSize >= size){
        sendCache();
    }

    config.setCacheSize(size);
    console.log("New cache size = " + size);
}

exports.setInterval = function(delay){
    config.setTimeDelay(delay);
    clearInterval(interval);
    interval = setInterval(function(){
        sendCache();
       },delay);
}

exports.flushCache = function(){
    sendCache();
    console.log("Cache flushed");
}

exports.addData =  function(d,v){
    if(c.length < maxNumberOfItemsInList){
        var data=createJson(d,v);
        c.push(data);
        if(c.length == maxNumberOfItemsInList){
            sendCache();
        }
        return c.length;
    }
    else{
        return false;
    }
}
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
