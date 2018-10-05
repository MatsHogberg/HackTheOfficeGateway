'use strict';
var iotService = require("../controllers/iotClientController.js");

var maxNumberOfItemsInList = 10;
var c = [];
function createJson(d,v){
    return {Id:d,Value:v,TimeStamp: new Date().toString()};
}
exports.addData =  function(d,v){
    if(c.length < maxNumberOfItemsInList){
        var data=createJson(d,v);
        c.push(data);
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
